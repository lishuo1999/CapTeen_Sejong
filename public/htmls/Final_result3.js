var real=JSON.parse(localStorage.getItem("data1")); // 데이터 가져오기 추후 이름 바꿈
var result=Object.keys(real); //전송받은 데이터 result 변수에 저장~ 
var datas=[]
for(var i=0;i<5;i++){ 
    var key=result[i];
    datas[i]=real[key]; 
}
console.log(datas);
// 맨 위에 박스 5개 데이터 localstorage에서 가져오기 ~~ 


window.onload = function () {
    //box1~5까지 텍스트 설정 (datas) 로부터 ! 
    $("#perc1").text(datas[0]+"%");
    $("#perc2").text(datas[1]+"%");
    $("#perc3").text(datas[2]+"%");
    $("#perc4").text(datas[3]+"%");
    $("#perc5").text(datas[4]+"%");

    $("#box2").hide();
    $("#box3").hide();
}



//1등급 박스를 클릭하였을때 
$(function(){
    $('#box1-1').on('click',function(){ 

        jQuery.noConflict();
        //도넛차트 그리기
        $("#chart1-name").text("위험 1등급의 자산 등급 분포");
        $("#chart2-name").text("위험 1등급의 자산 분류 분포");
        //아래 4줄은 다시 클릭하면 다시 차트가 나오게끔 
        $("#pie-chart1").remove();
        $("#pie-chart2").remove();
        $('#chart1').append('<canvas id="pie-chart1" width="200" height="200"></canvas>');
        $('#chart2').append('<canvas id="pie-chart2" width="200" height="200"></canvas>');

////첫 번째 차트 그리기 
        var ctx1=$("#pie-chart1");
        var pieLabels=['1등급', '2등급', '3등급', '4등급', '5등급'];
        //data 등급별 받아오기 
        //몇등급인지 전송, 해당 등급별 "자산 등급 분포" 받아오기 , 숫자 배열로 주세욧
        $.ajax({
            url:"https://jsonplaceholder.typicode.com/posts",
            type:"get",
            data:{"grade_per_grade":"1등급의 자산 등급 분포"},
            dataType:"json",
            success:function(data){
               console.log(data);
               var pieData=data;
            }
        });
        var pieColors=["#FEEACB","#FFD696","#FFC566","#FFB136","#FF9C00"]; 

        pieData=[1,2,3,4,5];

        var mypieChart=new Chart(ctx1,{
            type:'doughnut',
            data:{
                labels:pieLabels,
                datasets:[
                    {
                        data:pieData,
                        backgroundColor:pieColors
                    }
                ]
            },
            options:{
                responsive:false
            }
        });
    
////// 두 번째 차트 그리기     
        var ctx2=$("#pie-chart2");
        var pieLabels=['하드웨어', '소프트웨어', '정보자산', '인력'];
        //data 등급별 받아오기 
       $.ajax({
            url:"https://jsonplaceholder.typicode.com/posts",
            type:"post",
            data:{"group_per_grade":"1등급의 자산 분류 분포"},
            dataType:"json",
            success:function(data){
               console.log(data);
               var pieData=data;
            }
        });
        var pieColors=["#FEEACB","#FFD696","#FFC566","#FFB136"]; 
        
        pieData=[5,4,3,2];

        var mypieChart=new Chart(ctx2,{
            type:'doughnut',
            data:{
                labels:pieLabels,
                datasets:[
                    {
                        data:pieData,
                        backgroundColor:pieColors
                    }
                ]
            },
            options:{
                responsive:false
            }
        });
    
/////////// 표 그리기



        $.ajax({
            url:"https://jsonplaceholder.typicode.com/posts",
            type:"get",
            data:{"level":"1등급"},
            dataType:"json",
            success:function(data){
                var html='';
                for(key in data){
                    html+='<tr>';
                    html+='<td>'+data[key].id+'</td>'; //위험도
                    html+='<td id="riskName" onclick="change(this)">'+data[key].title+'</td>'; //위험명
                    html+='<td>'+data[key].userId+'</td>';//위험 처리전략
                    html+='<td id="riskNum">'+data[key].id+'</td>'; //이게 위험 고유 번호, 숨겨짐 
                    html+='</tr>';
                }

                $("#dynamicTbody").empty();
                $("#dynamicTbody").append(html);
                sort();
            }
        });
        $("#box2").fadeIn(1000);
        $("#box3").fadeIn(1000);
    })
});


//2등급 박스를 클릭하였을때 
$(function(){
    $('#box1-2').on('click',function(){ 

        jQuery.noConflict();
        //도넛차트 그리기
        $("#chart1-name").text("위험 2등급의 자산 등급 분포");
        $("#chart2-name").text("위험 2등급의 자산 분류 분포");
        $("#pie-chart1").remove();
        $("#pie-chart2").remove();
        $('#chart1').append('<canvas id="pie-chart1" width="200" height="200"></canvas>');
        $('#chart2').append('<canvas id="pie-chart2" width="200" height="200"></canvas>');

////첫 번째 차트 그리기 
        var ctx1=$("#pie-chart1");
        var pieLabels=['1등급', '2등급', '3등급', '4등급', '5등급'];
        //data 등급별 받아오기 
        //몇등급인지 전송, 해당 등급별 "자산 등급 분포" 받아오기 , 숫자 배열로 주세욧
        $.ajax({
            url:"https://jsonplaceholder.typicode.com/posts",
            type:"get",
            data:{"grade_per_grade":"2등급의 자산 등급 분포"},
            dataType:"json",
            success:function(data){
               console.log(data);
               var pieData=data;
            }
        });
        var pieColors=["#FF9C00","#FFB136","#FFC566","#FFD696","#FEEACB"]; 

        pieData=[1,2,3,4,5]; 

        var mypieChart=new Chart(ctx1,{
            type:'doughnut',
            data:{
                labels:pieLabels,
                datasets:[
                    {
                        data:pieData,
                        backgroundColor:pieColors
                    }
                ]
            },
            options:{
                responsive:false
            }
        });
    
////// 두 번째 차트 그리기     
        var ctx2=$("#pie-chart2");
        var pieLabels=['하드웨어', '소프트웨어', '정보자산', '인력'];
        //data 등급별 받아오기 
       $.ajax({
            url:"https://jsonplaceholder.typicode.com/posts",
            type:"post",
            data:{"group_per_grade":"2등급의 자산 분류 분포"},
            dataType:"json",
            success:function(data){
               console.log(data);
               var pieData=data;
            }
        });
        var pieColors=["#FFB136","#FFC566","#FFD696","#FEEACB"]; 
        
        pieData=[5,4,3,2];

        var mypieChart=new Chart(ctx2,{
            type:'doughnut',
            data:{
                labels:pieLabels,
                datasets:[
                    {
                        data:pieData,
                        backgroundColor:pieColors
                    }
                ]
            },
            options:{
                responsive:false
            }
        });


        $.ajax({
            url:"https://jsonplaceholder.typicode.com/posts",
            type:"get",
            data:{"level":"2등급"},
            dataType:"json",
            success:function(data){
                var html='';
                for(key in data){
                    html+='<tr>';
                    html+='<td>'+data[key].id+'</td>'; //위험도
                    html+='<td id="riskName" onclick="change(this)">'+data[key].title+'</td>'; //위험
                    html+='<td>'+data[key].userId+'</td>';//위험 처리전략
                    html+='<td id="riskNum">'+data[key].id+'</td>'; //이게 위험 고유 번호, 숨겨짐 
                    html+='</tr>';
                }
                $("#dynamicTbody").empty();
                $("#dynamicTbody").append(html);
                sort();
            }
        });

        $("#box2").fadeIn(1000);
        $("#box3").fadeIn(1000);

    })
});


//3등급 박스를 클릭하였을때 
$(function(){
    $('#box1-3').on('click',function(){ 
 
        jQuery.noConflict();
        //도넛차트 그리기
        $("#chart1-name").text("위험 3등급의 자산 등급 분포");
        $("#chart2-name").text("위험 3등급의 자산 분류 분포");
        $("#pie-chart1").remove();
        $("#pie-chart2").remove();
        $('#chart1').append('<canvas id="pie-chart1" width="200" height="200"></canvas>');
        $('#chart2').append('<canvas id="pie-chart2" width="200" height="200"></canvas>');

////첫 번째 차트 그리기 
        var ctx1=$("#pie-chart1");
        var pieLabels=['1등급', '2등급', '3등급', '4등급', '5등급'];
        //data 등급별 받아오기 
        //몇등급인지 전송, 해당 등급별 "자산 등급 분포" 받아오기 , 숫자 배열로 주세욧
        $.ajax({
            url:"https://jsonplaceholder.typicode.com/posts",
            type:"get",
            data:{"grade_per_grade":"3등급의 자산 등급 분포"},
            dataType:"json",
            success:function(data){
               console.log(data);
               var pieData=data;
            }
        });
        var pieColors=["#FF9C00","#FFB136","#FFC566","#FFD696","#FEEACB"]; 

        pieData=[1,2,3,4,5];

        var mypieChart=new Chart(ctx1,{
            type:'doughnut',
            data:{
                labels:pieLabels,
                datasets:[
                    {
                        data:pieData,
                        backgroundColor:pieColors
                    }
                ]
            },
            options:{
                responsive:false
            }
        });
    
////// 두 번째 차트 그리기     
        var ctx2=$("#pie-chart2");
        var pieLabels=['하드웨어', '소프트웨어', '정보자산', '인력'];
        //data 등급별 받아오기 
       $.ajax({
            url:"https://jsonplaceholder.typicode.com/posts",
            type:"post",
            data:{"group_per_grade":"3등급의 자산 분류 분포"},
            dataType:"json",
            success:function(data){
               console.log(data);
               var pieData=data;
            }
        });
        var pieColors=["#FFB136","#FFC566","#FFD696","#FEEACB"]; 
        
        pieData=[5,4,3,2];

        var mypieChart=new Chart(ctx2,{
            type:'doughnut',
            data:{
                labels:pieLabels,
                datasets:[
                    {
                        data:pieData,
                        backgroundColor:pieColors
                    }
                ]
            },
            options:{
                responsive:false
            }
        });

        //몇등급인지 전송, 해당 등급별 위험 받아오기 
     
        $.ajax({
            url:"https://jsonplaceholder.typicode.com/posts",
            type:"get",
            data:{"level":"3등급"},
            dataType:"json",
            success:function(data){
                var html='';
                for(key in data){
                    html+='<tr>';
                    html+='<td>'+data[key].id+'</td>'; //위험도
                    html+='<td id="riskName" onclick="change(this)">'+data[key].title+'</td>'; //위험명
                    html+='<td>'+data[key].userId+'</td>';//위험 처리전략
                    html+='<td id="riskNum">'+data[key].id+'</td>'; //이게 위험 고유 번호, 숨겨짐 
                    html+='</tr>';
                }
                $("#dynamicTbody").empty();
                $("#dynamicTbody").append(html);
                sort();
            }
        })

        $("#box2").fadeIn(1000);
        $("#box3").fadeIn(1000);

        //몇등급인지 전송, 해당 등급별 위험 받아오기 
      

    })
});


//4등급 박스를 클릭하였을때 
$(function(){
    $('#box1-4').on('click',function(){ 

        jQuery.noConflict();
        //도넛차트 그리기

        $("#chart1-name").text("위험 4등급의 자산 등급 분포");
        $("#chart2-name").text("위험 4등급의 자산 분류 분포");        
        $("#pie-chart1").remove();
        $("#pie-chart2").remove();
        $('#chart1').append('<canvas id="pie-chart1" width="200" height="200"></canvas>');
        $('#chart2').append('<canvas id="pie-chart2" width="200" height="200"></canvas>');

////첫 번째 차트 그리기 
        var ctx1=$("#pie-chart1");
        var pieLabels=['1등급', '2등급', '3등급', '4등급', '5등급'];
        //data 등급별 받아오기 
        //몇등급인지 전송, 해당 등급별 "자산 등급 분포" 받아오기 , 숫자 배열로 주세욧
        $.ajax({
            url:"https://jsonplaceholder.typicode.com/posts",
            type:"get",
            data:{"grade_per_grade":"4등급의 자산 등급 분포"},
            dataType:"json",
            success:function(data){
               console.log(data);
               var pieData=data;
            }
        });
        var pieColors=["#FF9C00","#FFB136","#FFC566","#FFD696","#FEEACB"]; 

        pieData=[1,2,3,4,5];

        var mypieChart=new Chart(ctx1,{
            type:'doughnut',
            data:{
                labels:pieLabels,
                datasets:[
                    {
                        data:pieData,
                        backgroundColor:pieColors
                    }
                ]
            },
            options:{
                responsive:false
            }
        });
    
////// 두 번째 차트 그리기     
        var ctx2=$("#pie-chart2");
        var pieLabels=['하드웨어', '소프트웨어', '정보자산', '인력'];
        //data 등급별 받아오기 
       $.ajax({
            url:"https://jsonplaceholder.typicode.com/posts",
            type:"post",
            data:{"group_per_grade":"4등급의 자산 분류 분포"},
            dataType:"json",
            success:function(data){
               console.log(data);
               var pieData=data;
            }
        });
        var pieColors=["#FFB136","#FFC566","#FFD696","#FEEACB"]; 
        
        pieData=[5,4,3,2];

        var mypieChart=new Chart(ctx2,{
            type:'doughnut',
            data:{
                labels:pieLabels,
                datasets:[
                    {
                        data:pieData,
                        backgroundColor:pieColors
                    }
                ]
            },
            options:{
                responsive:false
            }
        });

        //몇등급인지 전송, 해당 등급별 위험 받아오기 

        $.ajax({
            url:"https://jsonplaceholder.typicode.com/posts",
            type:"get",
            data:{"level":"4등급"},
            dataType:"json",
            success:function(data){
                var html='';
                for(key in data){
                    html+='<tr>';
                    html+='<td>'+data[key].id+'</td>'; //위험도
                    html+='<td id="riskName" onclick="change(this)">'+data[key].title+'</td>'; //위험명
                    html+='<td>'+data[key].userId+'</td>';//위험 처리전략
                    html+='<td id="riskNum">'+data[key].id+'</td>'; //이게 위험 고유 번호, 숨겨짐 
                    html+='</tr>';
                }
                $("#dynamicTbody").empty();
                $("#dynamicTbody").append(html);
                sort();
            }
        })

        $("#box2").fadeIn(1000);
        $("#box3").fadeIn(1000);

        //몇등급인지 전송, 해당 등급별 위험 받아오기 
      

    })
});

///////////////////////////////////////// 5등급 박스를 클릭하였을때 

$(function(){
    $('#box1-5').on('click',function(){ 
        jQuery.noConflict();
        //도넛차트 그리기
        $("#chart1-name").text("위험 5등급의 자산 등급 분포");
        $("#chart2-name").text("위험 5등급의 자산 분류 분포");
        $("#pie-chart1").remove();
        $("#pie-chart2").remove();
        $('#chart1').append('<canvas id="pie-chart1" width="200" height="200"></canvas>');
        $('#chart2').append('<canvas id="pie-chart2" width="200" height="200"></canvas>');
        ////첫 번째 차트 그리기 
        var ctx1=$("#pie-chart1");
        var pieLabels=['1등급', '2등급', '3등급', '4등급', '5등급'];

        //data 등급별 받아오기 
        //몇등급인지 전송, 해당 등급별 "자산 등급 분포" 받아오기 , 숫자 배열로 주세욧
        $.ajax({
            url:"https://jsonplaceholder.typicode.com/posts",
            type:"get",
            data:{"grade_per_grade":"5등급의 자산 등급 분포"},
            dataType:"json",
            success:function(data){
               console.log(data);
               var pieData=data;
            }
        });
        var pieColors=["#FF9C00","#FFB136","#FFC566","#FFD696","#FEEACB"]; 

        pieData=[1,1,1,1,1];

        var mypieChart1=new Chart(ctx1,{
            type:'doughnut',
            data:{
                labels:pieLabels,
                datasets:[
                    {
                        data:pieData,
                        backgroundColor:pieColors
                    }
                ]
            },
            options:{
                responsive:false,
            },
            
        }
        );

////// 두 번째 차트 그리기     
        var ctx2=$("#pie-chart2");
        var pieLabels=['하드웨어', '소프트웨어', '정보자산', '인력'];
        //data 등급별 받아오기 
       $.ajax({
            url:"https://jsonplaceholder.typicode.com/posts",
            type:"post",
            data:{"group_per_grade":"5등급의 자산 분류 분포"},
            dataType:"json",
            success:function(data){
               console.log(data);
               var pieData=data;
            }
        });
        var pieColors=["#FFB136","#FFC566","#FFD696","#FEEACB"]; 
        
        pieData=[1,1,1,1];

        var mypieChart2=new Chart(ctx2,{
            type:'doughnut',
            data:{
                labels:pieLabels,
                datasets:[
                    {
                        data:pieData,
                        backgroundColor:pieColors
                    }
                ]
            },
            options:{
                responsive:false,
            },

        });


        $.ajax({
            url:"https://jsonplaceholder.typicode.com/posts",
            type:"get",
            data:{"level":"5등급"},
            dataType:"json",
            success:function(data){
                var html='';
                for(key in data){
                    html+='<tr>';
                    html+='<td>'+data[key].id+'</td>'; //위험도
                    html+='<td id="riskName" onclick="change(this)">'+data[key].title+'</td>'; //위험명
                    html+='<td>'+data[key].userId+'</td>';//위험 처리전략
                    html+='<td id="riskNum">'+data[key].id+'</td>'; //이게 위험 고유 번호, 숨겨짐 
                    html+='</tr>';
                }
                $("#dynamicTbody").empty();
                $("#dynamicTbody").append(html);
                sort();
             
            }
        })

        $("#box2").fadeIn(1000);
        $("#box3").fadeIn(1000);
        //몇등급인지 전송, 해당 등급별 위험 받아오기 


    })
});


function change(obj){ //위험명 클릭시 !! 

    var index=obj.closest("tr").rowIndex;
    console.log(index); //클릭한 애의 rowindex 가져
    //var frequency=obj.closest("tr").childNodes[1].firstChild;
    //frequency=frequency.value;
    //var money=obj.closest("tr").childNodes[2].firstChild;
    //money=money.value;
    var num=obj.closest("tr").childNodes[3].innerText;  
    console.log(num); //얘가 고유 번호 !! 
   
// 해당 위험명에 해당하는 고유 번호를 보내서, 걔의 취약성과 처리 방법 가져오기 (get)

    $.ajax({
        type: 'get',
        url : 'https://jsonplaceholder.typicode.com/comments',  //위험 정보 보낼 서버 주소 
        dataType:'json',
        data:{"riskNum":num},
        success: function(data){   //데이터 주고받기 성공했을 경우 실행할 결과, data는 서버로부터 받은 데이터 
            // 취약성과 처리 방법이 넘어온다 

            console.log(data);
            $("#text1").text("취약성 내용이 들어갈 부분");
            $("#text2").text("취약성 조치 방법이 들어갈 부분");

        },
        error:function(){   //데이터 주고받기가 실패했을 경우 실행할 결과
            console.log(error);
        }
    })


    $(".modal").fadeIn(1000);
}
  
function sort(){ // 비용을 기준으로 내림차순 정렬

    var trs=document.getElementById("dynamicTbody").getElementsByTagName("tr");
    var rows = trs.length;
    console.log("행 수 : ",rows);

    //var c=trs[20].childNodes[0].innerText;
    //console.log(parseInt(c));

    for(var i=0;i<rows;i++){

        for(var j=0;j<i;j++){
            var c11=trs[i].childNodes[0].innerText;
            var c12=trs[i].childNodes[1].innerText;
            var c13=trs[i].childNodes[2].innerText;
            var c14=trs[i].childNodes[3].innerText;

            var c21=trs[j].childNodes[0].innerText;
            var c22=trs[j].childNodes[1].innerText;
            var c23=trs[j].childNodes[2].innerText;
            var c24=trs[j].childNodes[3].innerText;

            if(parseInt(c11)>parseInt(c21)){
            
                var tmp1=c11
                var tmp2=c12
                var tmp3=c13
                var tmp4=c14
            
                trs[i].childNodes[0].innerText=c21;
                trs[i].childNodes[1].innerText=c22; 
                trs[i].childNodes[2].innerText=c23; 
                trs[i].childNodes[3].innerText=c24;
            
                trs[j].childNodes[0].innerText=tmp1;
                trs[j].childNodes[1].innerText=tmp2;
                trs[j].childNodes[2].innerText=tmp3;
                trs[j].childNodes[3].innerText=tmp4;
            }

        }
    }

}