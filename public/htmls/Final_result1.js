
var result;
var real=[];


$(document).ready(function(){
	$("#result").hide(); //일단 메시지 숨기기 
    $("#next").hide(); //일단 다음 버튼 숨기기 


    setTimeout(function() {
        //console.log('Works!');
        $("#loading").hide(); //5초 후에 로딩 숨기기 
        $("#result").fadeIn(1000);  //5초 후에 텍스트 출력 
      }, 5000);

      setTimeout(function() {
        //console.log('Works!');
        $("#next").fadeIn(1000); //6초후에 결과보기 버튼 출력 
      }, 6000);

      $.ajax({
        type:'get',
        url:'/finalresult/count', //위험 등급별 퍼센트 받아오기!!!
        dataType:'json',
        success:function(data){
          console.log("success");
          console.log(data);
          
          sessionStorage.clear();
          
          sessionStorage.setItem("data1",JSON.stringify(data)); // "data" 라는 저장소 이름은 변경될거임 ,,,,!!! 
        },
        error:function(){
          console.log(error);
        }
      })

});


/*$(function(){
  $('#next').on('click',function(){

  $.ajax({
    type:'get',
    url:'/finalresult/count', //위험 등급별 퍼센트 받아오기!!!
    dataType:'json',
    success:function(data){
      console.log("success");
      console.log(data);
      
      sessionStorage.clear();
      
      sessionStorage.setItem("data1",JSON.stringify(data)); // "data" 라는 저장소 이름은 변경될거임 ,,,,!!! 
    },
    error:function(){
      console.log(error);
    }
  })

  });
});

*/