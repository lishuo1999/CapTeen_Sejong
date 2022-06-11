const db=require('../serverConfig');
const session = require('express-session');
const md5 = require('md5');
const async = require('async');
const res = require('express/lib/response');

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
        console.log('here!');

        new Promise(function(resolve, reject){
            //get the user doa from usr_db.users
            let return_arr;
            db.query(doaGetSql, function(err, rows, fields){
                if(err){
                    console.log(err);
                }
                else{
                    doa=rows[0].usr_doa;
                    transferBudgetV=rows[0].usr_trnsf_bud;
                    secBudget=rows[0].usr_sec_bud;
                    transferBudgetR=rows[0].usr_trnsf_budR;
                    resolve([doa, transferBudgetV, secBudget, transferBudgetR]);
                }
            })
        })
        .then(function(result){
            let doa = result[0];
            let transferBudgetV=result[1];
            let secBudget=result[2];
            let transferBudgetR=result[3];

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
                    resolve([doa, transferBudgetV, secBudget, transferBudgetR, doaImp_arr, rows.length]); 
                    //result=[doa, transferBudgetV, sedBudget, transferBudgetR, doaImp_arr, maxIdx]
                }
            })
        });
    })
    .then(async function(result){
        let doa = result[0];
        let doaImp_arr =result[4]; // 1) usr_assets_rate 2) usr_risk_rate 3) usr_assets_imp 4) usr_threats_spend
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
                console.log("Phase"+i+': \n');
                if(doaImp_arr[i][1]>doa)
                {
                    if(doaImp_arr[i][2]==0/*the asset is important*/){

                        if(baseSecBudget*doaImp_arr[i][0]>transferBudgetV){

                            if(doaImp_arr[i][3]>transferBudgetV){
                                //risk transfer
                                riskStrategy.push(2);
                                if(i==maxIdx-1){
                                    whetherDoaChanged=false;
                                    return ([riskStrategy, doa]);
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
                                    return ([riskStrategy, doa]);
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
                            return ([riskStrategy, doa]);
                        }
                    }
                }
                else{
                    //risk accept
                    riskStrategy.push(1)
                    if(i==maxIdx-1){
                        whetherDoaChanged=false;
                        return ([riskStrategy, doa]);
                    }
                }
            }
        }
        return ([riskStrategy, doa]);
    })
    .then(async function (result){
        let strategyUpdateSql='UPDATE usr_db.table_'+id_md5+' SET usr_risk_mng_id = ? WHERE usr_risk_id =?';
        let doaUpdateSql='UPDATE usr_db.users SET usr_doa=? WHERE usr_id_md5=\''+id_md5+'\'';
        const mysql=require('mysql2/promise');
        let riskStrategy=result[0];
        let doa=result[1];
        console.log(riskStrategy);
        console.log(doa);
        try{
            const connection=await mysql.createConnection({
                host : "14.40.31.222",
                user : 'dev', //for now it is the root user, but gotta make a new user with limited privileged role 
                password:'1918password',
                port:3306,
                database:'data_db'
            });
            for(var idx =0 ; idx<maxIdx;idx++){
                let [rows, fields] = await connection.execute(strategyUpdateSql, [riskStrategy[idx], idx+1]); //function(err, rows, fields){
                console.log('Strategy Update: '+rows);
            }
            connection.execute(doaUpdateSql, [doa]);

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
            rows.forEach(function(k, value){
                riskRate_arr.push(k.usr_risk_rate);
            });
            resolve(riskRate_arr);
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

exports.bringDoA=(req, res, next)=>{
    let id_md5=md5(req.session.userName);
    let doaSql='SELECT usr_doa FROM usr_db.users WHERE usr_id_md5=\''+id_md5+'\'';
    db.query(doaSql, function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            const obj = {DoA: rows[0].usr_doa};
            res.send(obj);
        }
    })
}


//and check which manage strategy table user wants to see,
//then send the matched data set
exports.manage=async function(req, res, next){
    let strategy= Number(req.query.method);
    let id_md5=md5(req.session.userName);

    switch(strategy){
        case 1:
            let a = await showTables(req, res, next, strategy, id_md5);
            break;
        case 2:
            let b = await showTables(req, res, next, strategy, id_md5);
            break;
        case 3:
            let c = await showTables(req, res, next, strategy, id_md5);
            break;
        case 4:
            let d = await showTables(req, res, next, strategy, id_md5);
            break;
        default:
            console.log("getting strategy number failed: "+strategy);
    }
}


//send data according to the given strategy number
//send usr_risk id too
async function showTables(req, res, next, strategy, id_md5){
    // get data from DB -> make it [{}] form

    let getDataIDSql='SELECT usr_risk_id, assets_id, vulns_id, threats_id FROM usr_db.table_'+id_md5+' WHERE usr_risk_mng_id=?';
    let return_arr=[];
    let name_arr=[];

    new Promise(async function(resolve, reject){
        const mysql = require('mysql2/promise');
        try {
            const connection = await mysql.createConnection({
                host: "14.40.31.222",
                user: 'dev', //for now it is the root user, but gotta make a new user with limited privileged role 
                password: '1918password',
                port: 3306,
                database: 'data_db'
            });
            let [rows, fields] = await connection.execute(getDataIDSql, [strategy]);
                rows.forEach(function (k, value) {
                    return_arr.push([k.usr_risk_id, k.assets_id, k.vulns_id, k.threats_id])
                });
    
            resolve([return_arr, rows.length]);
        }
        catch (err) {
            console.log(err);
        }
    })
    .then(async function(result){
        let id_arr=result[0]; //0) usr_risk_id, 1) assets_id, 2)vulns_id, 3)threats_id
        let maxIdx=result[1];
        let makeRiskSql=`SELECT 
        data_db.assets.name_assets, data_db.assets.id_assets, 
        data_db.threats.name_threats, data_db.threats.id_threats, 
        data_db.vulns.name_vulns, data_db.vulns.id_vulns 
        FROM 
        data_db.threats 
        RIGHT JOIN data_db.assets 
        ON data_db.assets.id_assets=data_db.threats.id_assets 
        RIGHT JOIN data_db.vulns 
        ON data_db.vulns.id_assets=data_db.assets.id_assets 
        WHERE 
        data_db.assets.id_assets=? AND data_db.vulns.id_vulns=? AND data_db.threats.id_threats=?`;
        const mysql = require('mysql2/promise');
        try {
            const connection = await mysql.createConnection({
                host: "14.40.31.222",
                user: 'dev', //for now it is the root user, but gotta make a new user with limited privileged role 
                password: '1918password',
                port: 3306,
                database: 'data_db'
            });
            for (var i = 0; i < maxIdx; i++) {
                let [rows, fields] = await connection.execute(makeRiskSql, [id_arr[i][1]/*assets_id*/, id_arr[i][2]/*vulns_id*/, id_arr[i][3]/*threats_id*/]); //function(err, rows, fields){

                rows.forEach(function (k, value) {
                    let astname = k.name_assets;
                    let vulname = k.name_vulns;
                    let thrtname = k.name_threats;
                    let id=id_arr[i][0];
                    name_arr.push({ riskId: id, risk: '' + astname + '의 ' + thrtname + '으로 인해 ' + vulname + ' 발생 가능' });
                });
            }
            return (name_arr);
        }
        catch (err) {
            console.log(err);
        }
    })
    .then((result)=>{
        res.send(result);
    })

}

//if the request comes in, then change the strategy number in the DB to the selected number
exports.changeStrategy = (req, res, next)=>{
    let id_md5 = md5(req.session.userName);
    let strategyUpdateSql='UPDATE usr_db.table_'+id_md5+' SET usr_risk_mng_id =? WHERE usr_risk_id = ?'
    
    var data=req.body.data
    console.log("요청 데이터",data)
    var data=JSON.parse(data)
    console.log("크기",data.length)

    for(var i=0;i<data.length;i++){
        var selected=data[i].Selected
        var num=data[i].num
        console.log(selected,num)
        db.query(strategyUpdateSql, [selected,num], function(err, rows, fields){
            if(err){
                console.log(err);
            }
            else{
                console.log(rows)
                console.log("i:"+i+"/ user strategy update completed");
            }
        })
    }


}