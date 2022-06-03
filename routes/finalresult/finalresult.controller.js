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
            else rate5++;
            resolve();
        })
    }


}


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
    let rate4=0;
    let rate5=0;

    lsy();

    function lsy(){

        if(index==len){ // finish -> 등급별로 assets count!!! 
            console.log("hihi");
            var json= ({"1":rate1,"2":rate2,"3":rate3,"4":rate4,"5":rate5});
            console.log("DATA:",json)
            //const obj=JSON.parse(json)
            //console.log("obj:",obj)
            res.send(json)
            return console.log("done");
        }else{
            db.query(select_sql,rate,function(err,rows,fields){
                len=rows.length
                var assets_rate=rows[index].usr_assets_rate;
                console.log('asset rate is : ',assets_rate)
                lsy2(assets_rate).then(lsy);
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
            else rate5++;
            resolve();
        })
    }

}

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
            console.log("DATA:",json)
            //const obj=JSON.parse(json)
            //console.log("obj:",obj)
            res.send(json)
            return console.log("done");
        }else{
            db.query(select_sql,rate,function(err,rows,fields){
                len=rows.length
                var assets_id=rows[index].usr_assets_rate;
                console.log('asset id is : ',assets_id)
                lsy2(assets_id).then(lsy);
                index++;
        })

    }
    }

    function lsy2(item){// item means risk_rate
        return new Promise(function(resolve,reject){ //여기서는 item이 몇등급인지 확인해서 해당 변수 ++만 해주면 됨 
            if(item==1) rate1++;
            else if(item==2) rate2++;
            else if(item==3) rate3++;
            else rate4++;
            resolve();
        })
    }

}

