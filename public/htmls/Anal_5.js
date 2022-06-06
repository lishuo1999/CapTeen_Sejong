
var result;
var real=[];

$(document).ready(function(){
    $("#next").hide(); //일단 다음 버튼 숨기기 
    $("#fin").hide();

    setTimeout(function() {
        //console.log('Works!');
      $(".loading").hide();
      $("#ing").hide();
      $("#fin").fadeIn(1000);
    }, 5000);
    
    setTimeout(function() {
      //console.log('Works!');
      $("#next").fadeIn(1000);//5초 후에 텍스트 출력 
    }, 6000);

    $.ajax({
        type: 'get',   //get방식으로 명시
        url : '/analysis/result',  //서버 주소를 /analysis/result
        dataType:'json',
        success: function(data){   //데이터 주고받기 성공했을 경우 실행할 결과
            console.log("success");
            console.log(data);
            sessionStorage.clear();
            sessionStorage.setItem("data",JSON.stringify(data));
        },
        error:function(){   //데이터 주고받기가 실패했을 경우 실행할 결과
            console.log(error);
        }
     })
    }); 


/*$(function(){
    $('#next').on('click',function(){            

    $.ajax({
        type: 'get',   //get방식으로 명시
        url : '/analysis/result',  //서버 주소를 /analysis/result
        dataType:'json',
        success: function(data){   //데이터 주고받기 성공했을 경우 실행할 결과
            console.log("success");
            console.log(data);
            localStorage.clear();
            localStorage.setItem("data",JSON.stringify(data));
        },
        error:function(){   //데이터 주고받기가 실패했을 경우 실행할 결과
            console.log(error);
        }
     })
    }); 


});


*/