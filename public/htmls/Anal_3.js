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


});

var result;
var real=[];
$(function(){
    $('#next').on('click',function(){            

    $.ajax({
        type: 'get',   //get방식으로 명시
<<<<<<< HEAD
        url : 'https://jsonplaceholder.typicode.com/posts',  //서버 주소 
=======
        url : '/analysis/result',  //서버 주소를 /analysis/result
>>>>>>> cfbe0a9e64673ab015c42b3a32e4b84140017dcc
        dataType:'json',
        success: function(data){   //데이터 주고받기 성공했을 경우 실행할 결과
            console.log("success");
            console.log(data);
            localStorage.setItem("data",JSON.stringify(data));
        },
        error:function(){   //데이터 주고받기가 실패했을 경우 실행할 결과
            console.log(error);
        }
     })
    }); 


});


