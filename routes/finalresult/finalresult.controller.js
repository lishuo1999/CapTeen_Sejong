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
    lsy();

    var len=-1;
    var index=0;

    var rate1=0;
    var rate2=0;
    var rate3=0;
    var rate4=0;
    var rate5=0;

    function lsy(){

        if(index==len){ // finish -> 등급별로 !!! 
            console.log("hihi");
            var json='["1":'+rate1+',"2":'+rate2+',"3":'+rate3+',"4":'+rate4+',"5":'+rate5+']'
            console.log("PARSHING DATA:",json)
            //const obj=JSON.parse(json)
            //console.log("obj:",obj)
            res.send(json)
            return console.log("done");
        }else{
            db.query(select_sql,function(err,rows,fields){
                len=rows.length
                var risk_rate=rows[index].usr_risk_rate;
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