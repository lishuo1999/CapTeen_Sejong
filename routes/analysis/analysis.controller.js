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
    
    new Promise((resolve)=>{
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
            }
        })
    })
    //getting asset name, vulnerability name and threat name by asset id
    //store the dataset in the name_arr as a object type: {key}:{value}
    .then(()=>{
        for(var idx =0 ; idx<maxIdx;idx++){
            db.query(selectNameSql, id_arr[idx][0], function(err, rows, fields){
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
    });

    const obj = JSON.parse(name_arr);
    res.send(obj);
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

//대분류에 따른 중분류 리스트 보내기 (id_mid_assets, name_m_cat_ass)
exports.asset_big = (req, res, next) => {
    var index = req.query.id_big_assets; //대분류 id를 받음
    var Mid_assets_id = 'SELECT id_mid_assets FROM data_db.assets WHERE id_big_assets = ?'; //디비에서 해당 중분류 id들 조회
    var Mid_assets_name = 'SELECT id_m_cat_ass, name_m_cat_ass FROM data_db.mid_category_assets WHERE id_m_cat_ass = ?'; //중분류 id로 중분류 명 조회, ? 에 Mid_assets_id의 원소들 들어가야 함
    var data = '[';
    var Mid_list = [];

    db.query(Mid_assets_id, index, function (err, rows, fields) {
        for (var i = 0; i < rows.length; i++) {
            Mid_list.push(rows[i].id_mid_assets);
        }
        const set = new Set(Mid_list);
        const Mid_list_new = Array.from(set);
        let index = 0;
        test1();
        function test1() {
            if(Mid_list_new.length == index) {
                data = data.slice(0,-1);
                data += ']';
                console.log(data);
                const json = JSON.parse(data);
                res.send(json);
            }else{
                test2(Mid_list_new[index]).then(test1);
                index++;
            }
        }
        function test2(item) {
            return new Promise(function (resolve, reject) {
                db.query(Mid_assets_name, item, function (err, rows, fields) {
                    //비어있는 객체 생성
                    var obj;
                    //person1객체의 프로퍼티를 할당
                    obj = '{"id_mid_assets":' + rows[0].id_m_cat_ass + ',"name_m_cat_ass":"' + rows[0].name_m_cat_ass + '"}';
                    //data.push(obj);
                    data += obj;
                    data += ',';
                    console.log();
                    resolve();
                })
            });
        }
    })
}
//대분류, 중분류, 자산 고유번호, 자산명, C, I, A, 업무의존도, 가치등급 리스트 보내기 (name_b_cat_ass, name_m_cat_ass, id_assets, name_assets, c_assets, i_assets, a_assets, dpdcy_assets, value_assets)
// /*exports.asset_big_mid = (req, res, next) => 
//     var big_index = req.jquery.id_big_assets; //대분류 id 받아옴
//     var mid_index = req.jquery.id_mid_assets; //중분류 id 받아옴
//     var DB_big = 'SELECT name_b_cat_ass FROM data_db.assets WHERE id big_index = ?';//대분류 리스트 조회
//     var DB_mid = 'SELECT name_m_cat_ass FROM data_db.assets WHERE id_mid_index = ?';//중분류 리스트 조회
//     var DB_assets_id = 'SELECT id_assets FROM data_db.assets WHERE id_mid_index = ?';//자산 고유번호 리스트 조회
//     var DB_assets_name = 'SELECT name_assets FROM data_db.assets WHERE id_mid_index = ?';//자산 리스트 조회