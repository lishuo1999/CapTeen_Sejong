//비즈니스 선택 결과를 받아서 DB의 사용자 테이블에 저장
const db = require('../serverConfig');
const session = require("express-session");
const md5=require('md5');
const { get } = require('express/lib/response');
const async=require('async');


//body에 저장되어 들어오고, 해당 값을 텍스트로 받아오도록 해둠
exports.business=(req, res, next)=>{
    var business_value=req.body.value.replace("'", "");
    var business_id=0;
    var usr_id=req.session.userName;
    const usr_id_md5=md5(usr_id);
    var update_sql='UPDATE usr_db.users SET usr_business=? WHERE usr_id_md5=?';
    var getBsnsID_sql='SELECT id_business FROM data_db.business WHERE name_business = ?';

    new Promise((resolve)=>{
        db.query(getBsnsID_sql, business_value, function(err, rows, fields){
            business_id=rows[0].id_business;
            console.log(business_id);
            resolve(business_id);
        })
    })
    .then((result)=>db.query(update_sql, [result, usr_id_md5], function(err, rows, fields){
        if(err){
            console.log(err);

        }
        else{
            console.log('business value input successed!');
        }
    }));

}



//Anal_3 : show vulnerabilities 
exports.vuln=(req,res,next)=>{ //get method
    var category=req.query.category;
    console.log(category);
    var usr_id=req.session.userName;
    //console.log(usr_id);
    const md5_id=md5(usr_id);
    //console.log(md5_id);

    var select_threats_sql='SELECT threats_id FROM usr_db.table_'+md5_id+' WHERE big_assets_id=?' // bring vulnerability id 
    //console.log(select_threats_sql);


    var json="["
    let index=0
    let len=-1
    lsy();

    function lsy(){

        if(index==len){ // finish
            console.log("hihi");
            json=json.slice(0,-1)
            json+=']'
            console.log("PARSHING ARRAY:",json)
            const obj=JSON.parse(json)
            console.log("obj:",obj)
            res.send(obj)
            return console.log("done");
        }else{
            db.query(select_threats_sql,category,function(err,rows,fields){
                len=rows.length
                var id_threats=rows[index].threats_id;
                lsy2(id_threats).then(lsy);
                index++;
        })

    }
    }

    function lsy2(item){// item means vul_id
        return new Promise(function(resolve,reject){
            var select_vuln_name_sql="SELECT name_threats,id_threats FROM data_db.threats WHERE id_threats=?"
            db.query(select_vuln_name_sql,item,function(err,rows,fields){
                //let id_threats=array[i]
                let id_threats=rows[0].id_threats
                //console.log(id_threats)
                let name_threats=rows[0].name_threats
                //console.log(name_threats)
                json+='{"id_threats":'+id_threats+',"name_threats":"'+name_threats+'"},'
                console.log(json)
                resolve();
            })
        })
    }
}

 

//Anal_3 : saving data and making grade
exports.save_vuln=(req,res,next)=>{
    var id_threats=req.body.num;
    var serious_threats=req.body.money;
    var exposed_threats=req.body.frequency;
    console.log(id_threats,serious_threats,exposed_threats);

    //grading .. [exp,ser,grade]
    var saved1=[[1,1,1],[1,2,2],[1,3,3]]
    var saved2=[[2,1,2],[2,2,3],[2,3,4]]
    var saved3=[[3,1,3],[3,2,4],[3,3,5]]

    if(exposed_threats==1){
        var grade=saved1[serious_threats-1][2]
    }
    else if(exposed_threats==2){
        var grade=saved2[serious_threats-1][2]
    }
    else{
        var grade=saved3[serious_threats-1][2]
    }
    console.log("grade:",grade);


    var usr_id=req.session.userName;
    //console.log(usr_id);
    const md5_id=md5(usr_id);
    //console.log(md5_id);

    var update_threats_sql='UPDATE usr_db.table_'+md5_id+' SET usr_threats_rate=? WHERE threats_id=?' // update vulnerability rate
    console.log(update_threats_sql);

    db.query(update_threats_sql,[grade,id_threats],function(err,rows,fields){
        if(err) console.log(err)
        else{
            console.log("Vulnerability Rate updated!")
        }
    })
}

//Anal_4.html => show threats 
exports.threat=(req,res,next)=>{ //get method
    var category=req.query.category;
    console.log(category);
    var usr_id=req.session.userName;
    //console.log(usr_id);
    const md5_id=md5(usr_id);
    //console.log(md5_id);

    var select_threats_sql='SELECT threats_id FROM usr_db.table_'+md5_id+' WHERE big_assets_id=?' // bring vulnerability id 
    //console.log(select_threats_sql);


    var json="["
    let index=0
    let len=-1
    lsy();

    function lsy(){

        if(index==len){ // finish
            console.log("hihi");
            json=json.slice(0,-1)
            json+=']'
            console.log("PARSHING ARRAY:",json)
            const obj=JSON.parse(json)
            console.log("obj:",obj)
            res.send(obj)
            return console.log("done");
        }else{
            db.query(select_threats_sql,category,function(err,rows,fields){
                len=rows.length
                var id_threats=rows[index].threats_id;
                lsy2(id_threats).then(lsy);
                index++;
        })

    }
    }

    function lsy2(item){// item means vul_id
        return new Promise(function(resolve,reject){
            var select_threats_name_sql="SELECT name_threats,id_threats FROM data_db.threats WHERE id_threats=?"
            db.query(select_threats_name_sql,item,function(err,rows,fields){
                //let id_threats=array[i]
                let id_threats=rows[0].id_threats
                //console.log(id_threats)
                let name_threats=rows[0].name_threats
                //console.log(name_threats)
                json+='{"id_threats":'+id_threats+',"name_threats":"'+name_threats+'"},'
                console.log(json)
                resolve();
            })
        })
    }
}

//Anal_4 : saving data and making grade
exports.save_threat=(req,res,next)=>{
    var id_threats=req.body.num;
    var serious_threats=req.body.money;
    var exposed_threats=req.body.frequency;
    console.log(id_threats,serious_threats,exposed_threats);

    //grading .. [exp,ser,grade]
    var saved1=[[1,1,1],[1,2,2],[1,3,3]]
    var saved2=[[2,1,2],[2,2,3],[2,3,4]]
    var saved3=[[3,1,3],[3,2,4],[3,3,5]]

    if(exposed_threats==1){
        var grade=saved1[serious_threats-1][2]
    }
    else if(exposed_threats==2){
        var grade=saved2[serious_threats-1][2]
    }
    else{
        var grade=saved3[serious_threats-1][2]
    }
    console.log("grade:",grade);


    var usr_id=req.session.userName;
    //console.log(usr_id);
    const md5_id=md5(usr_id);
    //console.log(md5_id);

    var update_threats_sql='UPDATE usr_db.table_'+md5_id+' SET usr_threats_rate=? WHERE threats_id=?' // update vulnerability rate
    console.log(update_threats_sql);

    db.query(update_threats_sql,[grade,id_threats],function(err,rows,fields){
        if(err) console.log(err)
        else{
            console.log("Threat Rate updated!")
        }
    })
}

//위험도 계산해서 위험도 분류, DB와의 인터렉션 필요
//async sync check. if error occurs, then use Promise
exports.result = async(req, res, next) => {
    let asset=0;
    let vuln=0;
    let threat=0;
    let assetId=0;
    let maxIdx=0;
    let arr_rate=[];
    let risk_rate=[];
    let risk_rate_for_web=[];
    let riskRate=0;
    let usr_id_md5=md5(req.session.userName);
    let getRateSql='SELECT assets_id, usr_assets_rate, usr_vulns_rate, usr_threats_rate FROM usr_db.table_'+usr_id_md5;

    //get the rates of assets, threats, vulnerabilities in order and put them in the array: arr_rate
    new Promise(function(resolve, reject){
            db.query(getRateSql, function(err, rows, field){
                if(err){
                    console.log(err);
                }
                else{
                    maxIdx=rows.length;
                    for(var idx=0;idx<maxIdx;idx++){
                        cursor = rows[idx];
                        arr_rate.push([cursor.assets_id, cursor.usr_assets_rate, cursor.usr_vulns_rate, cursor.usr_threats_rate]);
                    }
                    resolve(arr_rate);
                }
            })
    })

    //give the array as a parameter of riskAssess()
    //store the risk rate into the array: risk_rate
    .then(async function(result){
            console.log(result);
            for(var idx=0;idx<maxIdx;idx++){
                assetId=result[idx][0];
                asset=result[idx][1];
                vuln=result[idx][2];
                threat=result[idx][3];
                riskRate= await riskAssess(asset, vuln, threat);
                risk_rate.push([assetId, riskRate]);
            }
            return(risk_rate);
    })
    .then(function(result){
        //all data is in order, so don't need to check whether the risk rate is the right risk rate for (asset, threat, vuln)
        const updateSql='UPDATE usr_db.table_'+usr_id_md5+' SET usr_risk_rate=? WHERE usr_risk_id=?';
        //send the risk rate to the database
            for(var idx=0;idx<maxIdx;idx++){
                //this will be executed at the very last moment, but never mind; the data dependency is over at here
                db.query(updateSql, [result[idx][1], idx+1], function(err, rows, field){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log('risk rate update trial['+idx+'] success');
                    }
                })
            }
            for(var idx=0;idx<maxIdx;idx++){
                risk_rate_for_web.push(result[idx][1]);
            }
            return(risk_rate_for_web);
    })
    .then(async function (result){
        //count the number of risks per each rate
        let risk_1=await result.filter(element=> 1 === element).length;
        let risk_2=await result.filter(element=> 2 === element).length;
        let risk_3=await result.filter(element=> 3 === element).length;
        let risk_4=await result.filter(element=> 4 === element).length;
        let risk_5=await result.filter(element=> 5 === element).length;
        console.log("the very last one: "+result);

        //차례대로 1등급, 2등급, 3등급, 4등급, 5등급 개수를 보내주면 됨
        const json = '{"1":'+risk_1+', "2":'+risk_2+', "3":'+risk_3+', "4":'+risk_4+', "5":'+risk_5+'}';
        const obj = JSON.parse(json);
        //GET /analysis/result?1=3&2=4&3=5&4=6&5=0 이런 식으로 response됨.
        console.log(obj);
        return(res.send(obj));
    });
}


//sends the list of user's risks whose level is 1
exports.risk1_list = (req, res, next) => {
    let usr_id=req.session.userName;
    let usr_id_md5=md5(usr_id);
    let id_arr=[];
    let astId=0;
    let vulId=0;
    let thrtId=0;
    let maxIdx=0;
    let astname=0;
    let vulname=0;
    let thrtname=0;
    let name_arr=[];
    const selectIdSql='SELECT assets_id, vulns_id, threats_id FROM usr_db.table_'+usr_id_md5+' WHERE usr_risk_rate=1';
    const selectNameSql='SELECT assets.name_assets, threats.name_threats, vulns.name_vulns FROM threats RIGHT JOIN assets ON assets.id_assets=threats.id_assets RIGHT JOIN vulns ON vulns.id_assets=assets.id_assets WHERE assets.id_assets=?';
    
    new Promise(function(resolve, reject){
        //getting asset id, vulnerability id and threat id from user's table.
        //the data will be stored in id_arr array.
        db.query(selectIdSql, function(err, rows, fields){
            if(err){
                console.log(err);
            }
            else{
                maxIdx=rows.length;
                for(var idx=0;idx<maxIdx;idx++){
                    astId=rows[idx].assets_id;
                    vulId=rows[idx].vulns_id;
                    thrtId=rows[idx].threats_id
                    id_arr.push([astId, vulId, thrtId]);
                }
                console.log(id_arr);
                resolve(id_arr)
            }
        })
    })
    //getting asset name, vulnerability name and threat name by asset id
    //store the dataset in the name_arr as a object type: {key}:{value}
    .then(function(result){
        for(var idx =0 ; idx<maxIdx;idx++){
            db.query(selectNameSql, result[idx][0], function(err, rows, fields){
                if(err){
                    console.log(err);
                }
                else{
                    //I guess a problem will be occur here
                    astname=rows[0].name_assets;
                    vulname=rows[0].name_vulns;
                    thrtname=rows[0].name_threats;
                    name_arr.push({riskRate: 1, risk: ''+astname+' can be exploited by '+thrtname+' using '+vulname});
                }
            })
        }
        console.log(name_arr);
        return(name_arr);
    })
    .then(function(result){
        const obj = JSON.parse(result);
        console.log(obj);
        res.send(obj);
    });


}

//function that assesses risks
//returns the risk level in int form
riskAssess=(asset, vuln, threat)=>{
    return new Promise(async(resolve, reject)=>{
        //switch
        switch(threat){
            //When threat level is 1:
            case 1:
                switch(asset){
                    case 1:
                        switch(vuln){
                            case 1:
                                resolve(1);
                                break;
                            case 2:
                                resolve(1);
                                break;
                            case 3:
                                resolve(2);
                                break;
                            case 4:
                                resolve(2);
                                break;
                            case 5:
                                resolve(3);
                                break;
                            default:
                                console.log("valueError: vulnerability");
                                break;
                        }
                        break;
                    case 2:
                        switch(vuln){
                            case 1:
                                resolve(1);
                                break;
                            case 2:
                                resolve(2);
                                break;
                            case 3:
                                resolve(2);
                                break;
                            case 4:
                                resolve(3);
                                break;
                            case 5:
                                resolve(3);
                                break;
                            default:
                                console.log("valueError: vulnerability");
                                break;
                        }
                        break;
                    case 3:
                        switch(vuln){
                            case 1:
                                resolve(2);
                                break;
                            case 2:
                                resolve(2);
                                break;
                            case 3:
                                resolve(3);
                                break;
                            case 4:
                                resolve(3);
                                break;
                            case 5:
                                resolve(4);
                                break;
                            default:
                                console.log("valueError: vulnerability");
                                break;
                        }
                        break;
                    default:
                        console.log("valueError: assetValueError");
                }
                break;
            case 2: //when threat level is 2:
                switch(asset){
                    case 1:
                        switch(vuln){
                            case 1:
                                resolve(1);
                                break;
                            case 2:
                                resolve(2);
                                break;
                            case 3:
                                resolve(2);
                                break;
                            case 4:
                                resolve(3);
                                break;
                            case 5:
                                resolve(3);
                                break;
                            default:
                                console.log("valueError: vulnerability");
                                break;
                        }
                        break;
                    case 2:
                        switch(vuln){
                            case 1:
                                resolve(2);
                                break;
                            case 2:
                                resolve(2);
                                break;
                            case 3:
                                resolve(3);
                                break;
                            case 4:
                                resolve(3);
                                break;
                            case 5:
                                resolve(4);
                                break;
                            default:
                                console.log("valueError: vulnerability");
                                break;
                        }
                        break;
                    case 3:
                        switch(vuln){
                            case 1:
                                resolve(2);
                                break;
                            case 2:
                                resolve(3);
                                break;
                            case 3:
                                resolve(3);
                                break;
                            case 4:
                                resolve(4);
                                break;
                            case 5:
                                resolve(4);
                                break;
                            default:
                                console.log("valueError: vulnerability");
                                break;
                        }
                        break;
                    default:
                        console.log("valueError: assetValueError");
                }
                break;
            case 3: //When threat level is 3
                switch(asset){
                    case 1:
                        switch(vuln){
                            case 1:
                                resolve(2);
                                break;
                            case 2:
                                resolve(2);
                                break;
                            case 3:
                                resolve(3);
                                break;
                            case 4:
                                resolve(3);
                                break;
                            case 5:
                                resolve(4);
                                break;
                            default:
                                console.log("valueError: vulnerability");
                                break;
                        }
                        break;
                    case 2:
                        switch(vuln){
                            case 1:
                                resolve(2);
                                break;
                            case 2:
                                resolve(3);
                                break;
                            case 3:
                                resolve(3);
                                break;
                            case 4:
                                resolve(4);
                                break;
                            case 5:
                                resolve(4);
                                break;
                            default:
                                console.log("valueError: vulnerability");
                                break;
                        }
                        break;
                    case 3:
                        switch(vuln){
                            case 1:
                                resolve(3);
                                break;
                            case 2:
                                resolve(3);
                                break;
                            case 3:
                                resolve(4);
                                break;
                            case 4:
                                resolve(4);
                                break;
                            case 5:
                                resolve(5);
                                break;
                            default:
                                console.log("valueError: vulnerability");
                                break;
                        }
                        break;
                    default:
                        console.log("valueError: assetValueError");
                }
                break;
            case 4: //when threat level is 4
                switch(asset){
                    case 1:
                        switch(vuln){
                            case 1:
                                resolve(2);
                                break;
                            case 2:
                                resolve(3);
                                break;
                            case 3:
                                resolve(3);
                                break;
                            case 4:
                                resolve(4);
                                break;
                            case 5:
                                resolve(4);
                                break;
                            default:
                                console.log("valueError: vulnerability");
                                break;
                        }
                        break;
                    case 2:
                        switch(vuln){
                            case 1:
                                resolve(3);
                                break;
                            case 2:
                                resolve(3);
                                break;
                            case 3:
                                resolve(4);
                                break;
                            case 4:
                                resolve(4);
                                break;
                            case 5:
                                resolve(5);
                                break;
                            default:
                                console.log("valueError: vulnerability");
                                break;
                        }
                        break;
                    case 3:
                        switch(vuln){
                            case 1:
                                resolve(3);
                                break;
                            case 2:
                                resolve(4);
                                break;
                            case 3:
                                resolve(4);
                                break;
                            case 4:
                                resolve(5);
                                break;
                            case 5:
                                resolve(5);
                                break;
                            default:
                                console.log("valueError: vulnerability");
                                break;
                        }
                        break;
                    default:
                        console.log("valueError: assetValueError");
                }
                break;
            case 5: //when threat level is 5
                switch(asset){
                    case 1:
                        switch(vuln){
                            case 1:
                                resolve(3);
                                break;
                            case 2:
                                resolve(3);
                                break;
                            case 3:
                                resolve(4);
                                break;
                            case 4:
                                resolve(4);
                                break;
                            case 5:
                                resolve(5);
                                break;
                            default:
                                console.log("valueError: vulnerability");
                                break;
                        }
                        break;
                    case 2:
                        switch(vuln){
                            case 1:
                                resolve(3);
                                break;
                            case 2:
                                resolve(4);
                                break;
                            case 3:
                                resolve(4);
                                break;
                            case 4:
                                resolve(5);
                                break;
                            case 5:
                                resolve(5);
                                break;
                            default:
                                console.log("valueError: vulnerability");
                                break;
                        }
                        break;
                    case 3:
                        switch(vuln){
                            case 1:
                                resolve(4);
                                break;
                            case 2:
                                resolve(4);
                                break;
                            case 3:
                                resolve(5);
                                break;
                            case 4:
                                resolve(5);
                                break;
                            case 5:
                                resolve(5);
                                break;
                            default:
                                console.log("valueError: vulnerability");
                                break;
                        }
                        break;
                    default:
                        console.log("valueError: assetValueError");
                }
                break;
            default:
                console.log("valueError: threatValueError");
                break;
        }
    })
}
