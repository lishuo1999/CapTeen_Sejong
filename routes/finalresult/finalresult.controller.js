const db = require('../serverConfig');
const session = require("express-session");
const md5=require('md5');
const { get } = require('express/lib/response');
const async=require('async');


// 등급별로 카운트해서 비율 뿌려주기 (Final_result1)
exports.count= (req, res, next) => {
    //'1', '2', '3', '4', '5'
    
    var usr_id=req.session.userName;
    const md5_id=md5(usr_id);

    //사용자 테이블에서 위험도 가져와서 카운트 후 , 뿌려주기 
    var select_sql="SELECT * from usr_db.table_"+md5_id+";"
    console.log(select_sql)

    let len=-1;
    let index=0;

    let rate1=0;
    let rate2=0;
    let rate3=0;
    let rate4=0;
    let rate5=0;
    lsy();

    function lsy(){

        if(index==len){ // finish -> 등급별로 !!! 
            console.log("hihi");
            var sum=rate1+rate2+rate3+rate4+rate5
            rate1=parseInt(rate1*100/sum)
            rate2=parseInt(rate2*100/sum)
            rate3=parseInt(rate3*100/sum)
            rate4=parseInt(rate4*100/sum)
            rate5=parseInt(rate5*100/sum)

            var json= ({"1":rate1,"2":rate2,"3":rate3,"4":rate4,"5":rate5});
            console.log("DATA:",json)
            //const obj=JSON.parse(json)
            //console.log("obj:",obj)
            res.send(json)
            return console.log("done");
        }else{
            db.query(select_sql,function(err,rows,fields){
                len=rows.length
                var risk_rate=rows[index].usr_risk_rate;
                console.log('risk rate is : ',risk_rate)
                lsy2(risk_rate).then(lsy);
                index++;
        })

    }
    }

    function lsy2(item){// item means risk_rate
        return new Promise(function(resolve,reject){ //여기서는 item이 몇등급인지 확인해서 해당 변수 ++만 해주면 됨 
            if(item==1) rate1++;
            else if(item==2) rate2++;
            else if(item==3) rate3++;
            else if(item==4) rate4++;
            else if(item==5) rate5++;
            resolve();
        })
    }


}

// draw chart1 : risk rate - asset rate 
exports.chart1=(req,res,next)=>{

    var usr_id=req.session.userName;
    const md5_id=md5(usr_id);

    var rate=req.query.grade_per_grade;
    console.log("rate:",rate);
    //select assets rate 
    var select_sql="SELECT usr_assets_rate FROM usr_db.table_"+md5_id+" WHERE usr_risk_rate=?;"
    console.log(select_sql)

    let index=0;
    let len=-1;
    let rate1=0;
    let rate2=0;
    let rate3=0;

    lsy();

    function lsy(){

        if(index==len){ // finish -> 등급별로 assets count!!! 
            console.log("hihi");
            var json= ({"1":rate1,"2":rate2,"3":rate3});
            console.log("DATA1:",json)
            //const obj=JSON.parse(json)
            //console.log("obj:",obj)
            res.send(json)
            return console.log("done");
        }else{
            db.query(select_sql,rate,function(err,rows,fields){
                len=rows.length
                if(len==0){
                    console.log("there's no assets")
                    var not=({"1":0,"2":0,"3":0})
                    res.send(not)
                    return;
                }
                else{
                    var assets_rate=rows[index].usr_assets_rate;
                    console.log('asset rate is : ',assets_rate)
                    lsy2(assets_rate).then(lsy);
                    index++;
                }
        })

    }
    }

    function lsy2(item){// item means risk_rate (위험 등급)
        return new Promise(function(resolve,reject){ //여기서는 item이 몇등급인지 확인해서 해당 변수 ++만 해주면 됨 
            if(item==1) rate1++;
            else if(item==2) rate2++;
            else rate3++;
            resolve();
        })
    }

}

//chart2: risk rate - asset category rate
exports.chart2=(req,res,next)=>{

    var usr_id=req.session.userName;
    const md5_id=md5(usr_id);

    var rate=req.query.group_per_grade;
    console.log("rate:",rate);
    //select assets rate 
    var select_sql="SELECT big_assets_id FROM usr_db.table_"+md5_id+" WHERE usr_risk_rate=?;"
    console.log(select_sql)

    let index=0;
    let len=-1;
    let rate1=0;
    let rate2=0;
    let rate3=0;
    let rate4=0;

    lsy();

    function lsy(){

        if(index==len){ // finish -> 등급별로 assets count!!! 
            console.log("hihi");
            var json= ({"1":rate1,"2":rate2,"3":rate3,"4":rate4});
            console.log("DATA2:",json)
            //const obj=JSON.parse(json)
            //console.log("obj:",obj)
            res.send(json)
            return console.log("done");
        }else{
            db.query(select_sql,rate,function(err,rows,fields){
                len=rows.length
                if(len==0){
                    console.log("there's no assets")
                    var not=({"1":0,"2":0,"3":0,"4":0})
                    res.send(not)
                    return;
                }
                else{
                    var assets_id=rows[index].big_assets_id;
                    console.log('asset id is : ',assets_id)
                    lsy2(assets_id).then(lsy);
                    index++;
                }
        })

    }
    }

    function lsy2(item){// item means 자산 대분류
        return new Promise(function(resolve,reject){ //여기서는 item이 몇등급인지 확인해서 해당 변수 ++만 해주면 됨 
            if(item==1) rate1++;
            else if(item==2) rate2++;
            else if(item==3) rate3++;
            else rate4++;
            resolve();
        })
    }

}

//table : risk rate - risk 
exports.table=(req,res,next)=>{
    var usr_id=req.session.userName;
    const md5_id=md5(usr_id);

    var rate=req.query.level;
    console.log("rate:",rate);
    //select all
    var select_sql="SELECT * FROM usr_db.table_"+md5_id+" WHERE usr_risk_rate=?;"
    console.log(select_sql)



    var json="["
    let index=0
    let len=-1
    let check=0
    lsy();

    function lsy(){

        if(index==len){ // finish
           // console.log("hihi");
            json=json.slice(0,-1)
            json+=']'
            console.log("PARSHING ARRAY:",json)
            const obj=JSON.parse(json)
           // console.log("obj:",obj)
            res.send(obj)
            return console.log("done");
        }
        else{
            db.query(select_sql,rate,function(err,rows,fields){
                len=rows.length
                if(len==0){
                    console.log("there's no risks")
                    var not='{"rate":0,"risk":"NO DATA"}'
                    //console.log(not)
                    not=JSON.parse(not)
                    //console.log("not:",not)
                    res.send(not)
                    return;
                }
                else{
                    var assets_id=rows[index].assets_id;
                    var vulns_id=rows[index].vulns_id;
                    var threats_id=rows[index].threats_id;
                    var usr_risk_mng_id=rows[index].usr_risk_mng_id;

                  //  console.log(assets_id,vulns_id,threats_id,usr_risk_mng_id);

                    var select_assets_sql="SELECT name_assets FROM data_db.assets WHERE id_assets=?"
                    db.query(select_assets_sql,assets_id,function(err,rows,fields){
                        var name_assets=rows[0].name_assets
                       // console.log("asset name: ",name_assets)
                        var select_vulns_sql="SELECT name_vulns FROM data_db.vulns WHERE id_vulns=?"
                        db.query(select_vulns_sql,vulns_id,function(err,rows,fields){
                            var name_vulns=rows[0].name_vulns
                           // console.log("vulns name: ",name_vulns)
                            var select_threats_sql="SELECT name_threats FROM data_db.threats WHERE id_threats=?"
                            db.query(select_threats_sql,threats_id,function(err,rows,fields){
                                var name_threats=rows[0].name_threats
                              //  console.log("threats name: ",name_threats)
                                lsy2(name_assets,name_vulns,name_threats,usr_risk_mng_id,vulns_id).then(lsy)
                            })
                        })
                    })

                
                    index++;
                }
        })

    }
    }
    function lsy2(item,item2,item3,item4,item5){// item means assets_id
        return new Promise(function(resolve,reject){
            var select_manage_sql="SELECT name_manage FROM data_db.risk_manage WHERE id_manage=?"
            db.query(select_manage_sql,item4,function(err,rows,fields){
                var name_manage=rows[0].name_manage;
                json+='{"rate":'+rate+',"risk":"'+item+'의 '+item2+'으로 인해 '+item3+' 발생 가능","manage":"'+name_manage+'","id_vulns":'+item5+'},'
               // console.log(json)
                resolve();
            })
        })
    }


}

// show modal
exports.modal=(req,res,next)=>{

    var select_sql="SELECT * FROM data_db.vulns WHERE id_vulns=?"
    var num=req.query.vulnNum;
    console.log("vul num: ",num)

    var select_asset_sql="SELECT * FROM data_db.assets WHERE id_assets=?"

    db.query(select_sql,num,function(err,rows,fields){
        var name_vulns=rows[0].name_vulns
        var manage_vulns=rows[0].manage_vulns
        var id_assets=rows[0].id_assets

        db.query(select_asset_sql,id_assets,function(err,rows,fields){
            var name_assets=rows[0].name_assets;
            name_vulns=name_assets+"의 "+name_vulns
            var json=({"name_vulns":name_vulns,"manage_vulns":manage_vulns})
            console.log("DATA: ",json)
            res.send(json)
            console.log("done!")
        })
    })


}