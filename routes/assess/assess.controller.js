const db=require('../serverConfig');
const session = require('express-session');
const md5 = require('md5');
const async = require('async');

//DoA를 받아서 DB의 사용자 테이블에 저장
//body에 저장되어 들어오고, 해당 값을 텍스트로 받아오도록 해둠
exports.input=async function(req, res, next){
    let id_md5=md5(req.session.userName);
    //transfer budget rate 
    let transf_budR = req.body.transferRate;
    //보안예산
    let sec_bud = req.body.security;
    //외주비용
    let transf_bud = req.body.transferValue;

    const inputSql='UPDATE usr_db.users SET usr_trnsf_bud=?, usr_sec_bud=?, usr_trnsf_budR=? WHERE usr_id_md5=?'

        db.query(inputSql, [transf_bud, sec_bud, transf_budR, id_md5], async function(err, rows, field){
            if(err){
                console.log(err);
            }
            else{
                console.log(rows);
                console.log('Security Budget, Transfer Budget and Transfer Budget Rate update of a user is completed');
                let a = await selectStrategy(id_md5);
                console.log(a);
            }
        })
}

//select risk manage strategy and put it in table
selectStrategy=(id_md5)=>{
    // 1) 핵심 자산 여부(어제 컬럼 추가했음-유저 고유 테이블의 usr_assets_rate)
    // 2) 조직의 한 해 정보보호 예산(입력받음), 조직의 자산 그룹 수
    // 3) 위협발생손실액 rate 그리고 외주 비용 rate
    let whetherDoaChanged = true;
    let doaGetSql='SELECT usr_doa, usr_trnsf_budR, usr_sec_bud, usr_trnsf_bud FROM usr_db.users WHERE usr_id_md5= \''+id_md5+'\'';
    let impRateGetSql='SELECT usr_assets_rate, usr_risk_rate, usr_assets_imp, usr_threats_spend FROM usr_db.table_'+id_md5;
    let maxIdx=0;
    new Promise(async function(resolve, reject){
        let doaImp_arr=[];
        let doa=0;
        let transferBudgetV=0;
        let secBudget=0;
        let transferBudgetR=0;
        let return_arr=[];
        console.log('here!');

        new Promise(function(resolve, reject){
            //get the user doa from usr_db.users
            db.query(doaGetSql, function(err, rows, fields){
                if(err){
                    console.log(err);
                }
                else{
                    doa=rows[0].usr_doa;
                    transferBudgetV=rows[0].usr_transf_bud;
                    secBudget=rows[0].usr_sec_bud;
                    transferBudgetR=rows[0].usr_transf_budR;
                    resolve(doa, transferBudgetV, secBudget, transferBudgetR);
                }
            })
        })
        .then(function(result){
            
            doa = result[0];
            transferBudgetV=result[1];
            secBudget=result[2];
            transferBudgetR=result[3];

             //get the user risk rate lists from usr_db.table_{id_md5}
            db.query(impRateGetSql, function(err, rows, fields){
                if(err){
                    console.log(err);
                }
                else{
                    maxIdx=rows.length;
                    for(var idx=0;idx<maxIdx;idx++)
                    {
                        doaImp_arr.push([rows[idx].usr_assets_rate, rows[idx].usr_risk_rate, rows[idx].usr_assets_imp, rows[idx].usr_threats_spend]);
                    }
                    return(doa, transferBudgetV, secBudget, transferBudgetR, doaImp_arr, maxIdx); 
                    //result=[doa, transferBudgetV, sedBudget, transferBudgetR, doaImp_arr, maxIdx]
                }
            })
        })
    })
    .then(async function(result){
        console.log(result);
        let doa = result[0];
        let doaImp_arr=result[4]; // 1) usr_assets_rate 2) usr_risk_rate 3) usr_assets_imp 4) usr_threats_spend
        let maxIdx=result[5];
        let transferBudgetV=result[1]; //How much will you spend for the risk transfer
        let secBudget=result[2]; //How much will you allocate for the security
        let transferBudgetR=result[3]; // The rate of risk transfer budget

        let riskStrategy=[];

        let baseSecBudget=await howMuchSecBudget(id_md5, secBudget);

        // if DoA changes, then do the for clause from the very first phase
        while(whetherDoaChanged){
        // in the for clause, do the strategy selection process
            for(var i=0;i<maxIdx;i++){
                if(doaImp_arr[i][1]>doa)
                {
                    if(doaImp_arr[i][2]==0/*the asset is important*/){

                        if(baseSecBudget*doaImp_arr[i][0]>transferBudgetV){

                            if(doaImp_arr[i][3]>transferBudgetV){
                                //risk transfer
                                riskStrategy.push(2);
                                if(i==maxIdx-1){
                                    whetherDoaChanged=false;
                                    break;
                                }
                                else{}
                            }
                            else{
                                doa++;
                                break;
                            }
                            }
                        else{
                            if(doaImp_arr[i][3]>transferBudgetV){
                                //risk reduce
                                riskStrategy.push(4);
                                if(i==maxIdx-1){
                                    whetherDoaChanged=false;
                                    break;
                                }
                            }
                            else{
                                doa++
                                break;
                            }
                        }
                    }
                    else{
                        //risk avoid
                        riskStrategy.push(3)
                        if(i==maxIdx-1){
                            whetherDoaChanged=false;
                            break;
                        }
                    }
                }
                else{
                    //risk accept
                    riskStrategy.push(1)
                    if(i==maxIdx-1){
                        whetherDoaChanged=false;
                        break;
                    }
                }
            }
        }
        return (riskStrategy);
    })
    .then(async function (result){
        let strategyUpdateSql='UPDATE usr_db.table_'+id_md5+' SET usr_risk_mng_id = ? WHERE usr_risk_id =?';
        const mysql=require('mysql2/promise');
        try{
            const connection=await mysql.createConnection({
                host : "14.40.31.222",
                user : 'dev', //for now it is the root user, but gotta make a new user with limited privileged role 
                password:'1918password',
                port:3306,
                database:'data_db'
            });
            for(var idx =0 ; idx<maxIdx;idx++){
                let [rows, fields] = await connection.execute(strategyUpdateSql, [result[idx], idx+1]); //function(err, rows, fields){
                console.log('Strategy Update: '+rows);
            }
        }
        catch(err) {
            console.log(err);
        }
    });
}

//calculate how much security budget will be allocated for an asset
//returns base budget that multiplied with the asset rate of a risk
async function howMuchSecBudget (id_md5, secBudget) {
    const mysql=require('mysql2/promise');
    let riskRate_arr=[]; // [risk rate]
    const getAssetRate='SELECT usr_risk_rate FROM usr_db.table_'+id_md5;
    let baseBudget=await new Promise(async function(resolve, reject){
        try{
            const connection=await mysql.createConnection({
                host : "14.40.31.222",
                user : 'dev', //for now it is the root user, but gotta make a new user with limited privileged role 
                password:'1918password',
                port:3306,
                database:'data_db'
            });
            let [rows, fields] = await connection.execute(getAssetRate);
            for(var idx =0 ; idx<rows.length;idx++){
                rows.forEach(function(k, value){
                    riskRate_arr.push(k.usr_risk_rate);
                });
            }
            resolve(riskRate);
        }
        catch(err) {
            console.log(err);
        }
    })
    .then(async function(result){
        //1x*(rate1 assets num)+2x*(rate2 assets num)+3x*(rate assets num)=secBudget
        //calculate x and return
        let rate1=await result.filter(element=>1 === element).length;
        let rate2=await result.filter(element=>2 === element).length;
        let rate3=await result.filter(element=>3 === element).length;
        console.log('howMuchSetBudget rate fetch: '+result);

        return (secBudget/(rate1+2*rate2+3*rate3));
    })
    console.log('howMuchSetBudge output: '+baseBudget);
    return baseBudget;
}


//and check which manage strategy table user wants to see,
//then send the matched data set
exports.manage=(req, res, next)=>{

}