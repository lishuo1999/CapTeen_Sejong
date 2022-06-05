var real=JSON.parse(localStorage.getItem("data1")); // 데이터 가져오기 추후 이름 바꿈
console.log(real)
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
        //아래 4줄은 다시 클릭하면 다시 차트가 나오게하는 부분
        $("#pie-chart1").remove();
        $("#pie-chart2").remove();
        $('#chart1').append('<canvas id="pie-chart1" width="200" height="200"></canvas>');
        $('#chart2').append('<canvas id="pie-chart2" width="200" height="200"></canvas>');

//// 차트 그리기 
        let ctx1 = document.getElementById('pie-chart1').getContext('2d');
        //var ctx1=$("#pie-chart1").getContext('2d');
        var pieLabels1=['1등급', '2등급', '3등급'];
        var pieData1=[];
        var pieColors1=["#FEEACB","#FFD696","#FFC566","#FFB136","#FF9C00"]; 

        var ctx2=document.getElementById('pie-chart2').getContext('2d');
        var pieLabels2=['정보자산','소프트웨어','인력','하드웨어'];
        var pieData2=[];
        var pieColors2=["#FEEACB","#FFD696","#FFC566","#FFB136"]; 


        //data 등급별 받아오기 
        //몇등급인지 전송, 해당 등급별 "자산 등급 분포" 받아오기 , 숫자 배열로 주세욧
        $.ajax({
            url:"/finalresult/chart1",
            type:"get",
            data:{"grade_per_grade":"1"},
            async:false,
            dataType:"json",
            success:function(data){
               console.log(data);
               for(var key in data){
                   pieData1.push(data[key])
               }
               console.log("pieData1:",pieData1);
                       //pieData=[1,2,3,4,5];
                window.pieChart=new Chart(ctx1,{
                    type:'doughnut',
                    data:{
                        labels:pieLabels1,
                        datasets:[
                            {
                                data:pieData1,
                                backgroundColor:pieColors1
                            }
                        ]
                    },
                    options:{
                        responsive:false
                    }
                })
            }
         });
                ////// 두 번째 차트 그리기     

                    //data 등급별 받아오기 
                $.ajax({
                        url:"/finalresult/chart2",
                        type:"get",
                        data:{"group_per_grade":"1"},
                        dataType:"json",
                        async:false,
                        success:function(data){
                            console.log(data);
                            for(var key in data){
                                pieData2.push(data[key])
                            }
                            console.log("pieData2:",pieData2);
                            window.pieChart=new Chart(ctx2,{
                                type:'doughnut',
                                data:{
                                    labels:pieLabels2,
                                    datasets:[
                                        {
                                            data:pieData2,
                                            backgroundColor:pieColors2
                                        }
                                    ]
                                },
                                options:{
                                    responsive:false
                                }
                            })
                        
                            }
                    });
                    
                    //pieData=[5,4,3,2];

                /////////// 표 그리기



                $.ajax({
                    url:"/finalresult/table",
                    type:"get",
                    data:{"level":"1"},
                    dataType:"json",
                    async:false,
                    success:function(data){
                        var html='';
                        console.log(data)
                        var check=data.risk
                        if(check=="NO DATA"){
                            html+='<tr>'
                            html+='<td>-</td>'
                            html+='<td>-</td>'
                            html+='<td>-</td>'
                            html+='<td>-</td>'
                            html+='</tr>'
                        }
                        else{
                            for(key in data){
                                html+='<tr>';
                                html+='<td>'+data[key].rate+'</td>'; //위험도
                                html+='<td id="riskName" onclick="change(this)">'+data[key].risk+'</td>'; //위험명
                                html+='<td>'+data[key].manage+'</td>';//위험 처리전략
                                html+='<td id="riskNum">'+data[key].id_vulns+'</td>'; //이게 vuln 고유 번호, 숨겨짐 
                                html+='</tr>';
                            }}
                        $("#dynamicTbody").empty();
                        $("#dynamicTbody").append(html);
                        //sort();
                    }
                });
                $("#box2").fadeIn(1000);
                $("#box3").fadeIn(1000);
            

            
        });

    })
    



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

        
        //// 차트 그리기 
        let ctx1 = document.getElementById('pie-chart1').getContext('2d');
        //var ctx1=$("#pie-chart1").getContext('2d');
        var pieLabels1=['1등급', '2등급', '3등급'];
        var pieData1=[];
        var pieColors1=["#FEEACB","#FFD696","#FFC566","#FFB136","#FF9C00"]; 

        var ctx2=document.getElementById('pie-chart2').getContext('2d');
        var pieLabels2=['정보자산','소프트웨어','인력','하드웨어'];
        var pieData2=[];
        var pieColors2=["#FEEACB","#FFD696","#FFC566","#FFB136"]; 


        //data 등급별 받아오기 
        //몇등급인지 전송, 해당 등급별 "자산 등급 분포" 받아오기 , 숫자 배열로 주세욧
        $.ajax({
            url:"/finalresult/chart1",
            type:"get",
            data:{"grade_per_grade":"2"},
            async:false,
            dataType:"json",
            success:function(data){
               console.log(data);
               for(var key in data){
                   pieData1.push(data[key])
               }
               console.log("pieData1:",pieData1);
               window.pieChart=new Chart(ctx1,{
                type:'doughnut',
                data:{
                    labels:pieLabels1,
                    datasets:[
                        {
                            data:pieData1,
                            backgroundColor:pieColors1
                        }
                    ]
                },
                options:{
                    responsive:false
                }
            })
            }
        });

 
            //data 등급별 받아오기 
        $.ajax({
                url:"/finalresult/chart2",
                type:"get",
                data:{"group_per_grade":"2"},
                dataType:"json",
                async:false,
                success:function(data){
                    console.log(data);
                    for(var key in data){
                        pieData2.push(data[key])
                    }
                    console.log("pieData2:",pieData2);
                    window.pieChart=new Chart(ctx2,{
                        type:'doughnut',
                        data:{
                            labels:pieLabels2,
                            datasets:[
                                {
                                    data:pieData2,
                                    backgroundColor:pieColors2
                                }
                            ]
                        },
                        options:{
                            responsive:false
                        }
                    })
                }
            });
    
    //pieData=[5,4,3,2];


        $.ajax({
            url:"/finalresult/table",
            type:"get",
            data:{"level":"2"},
            async:false,
            dataType:"json",
            success:function(data){
                var html='';
                console.log(data)
                var check=data.risk
                if(check=="NO DATA"){
                    html+='<tr>'
                    html+='<td>-</td>'
                    html+='<td>-</td>'
                    html+='<td>-</td>'
                    html+='<td>-</td>'
                    html+='</tr>'
                }
                else{
                    for(key in data){
                        html+='<tr>';
                        html+='<td>'+data[key].rate+'</td>'; //위험도
                        html+='<td id="riskName" onclick="change(this)">'+data[key].risk+'</td>'; //위험명
                        html+='<td>'+data[key].manage+'</td>';//위험 처리전략
                        html+='<td id="riskNum">'+data[key].id_vulns+'</td>'; //이게 vuln 고유 번호, 숨겨짐 
                        html+='</tr>';
                    }}
                $("#dynamicTbody").empty();
                $("#dynamicTbody").append(html);
                //sort();
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

        //// 차트 그리기 
        let ctx1 = document.getElementById('pie-chart1').getContext('2d');
        //var ctx1=$("#pie-chart1").getContext('2d');
        var pieLabels1=['1등급', '2등급', '3등급'];
        var pieData1=[];
        var pieColors1=["#FEEACB","#FFD696","#FFC566","#FFB136","#FF9C00"]; 

        var ctx2=document.getElementById('pie-chart2').getContext('2d');
        var pieLabels2=['정보자산','소프트웨어','인력','하드웨어'];
        var pieData2=[];
        var pieColors2=["#FEEACB","#FFD696","#FFC566","#FFB136"]; 


           //data 등급별 받아오기 
           //몇등급인지 전송, 해당 등급별 "자산 등급 분포" 받아오기 , 숫자 배열로 주세욧
           $.ajax({
               url:"/finalresult/chart1",
               type:"get",
               data:{"grade_per_grade":"3"},
               dataType:"json",
               async:false,
               success:function(data){
                  console.log(data);
                  for(var key in data){
                      pieData1.push(data[key])
                  }
                  console.log("pieData1:",pieData1);
                  window.pieChart=new Chart(ctx1,{
                    type:'doughnut',
                    data:{
                        labels:pieLabels1,
                        datasets:[
                            {
                                data:pieData1,
                                backgroundColor:pieColors1
                            }
                        ]
                    },
                    options:{
                        responsive:false
                    }
                })
               }
           });
   
           //pieData=[1,2,3,4,5];


       //data 등급별 받아오기 
      $.ajax({
           url:"/finalresult/chart2",
           type:"get",
           data:{"group_per_grade":"3"},
           async:false,
           dataType:"json",
           success:function(data){
               console.log(data);
               for(var key in data){
                   pieData2.push(data[key])
               }
               console.log("pieData2:",pieData2);
               window.pieChart=new Chart(ctx2,{
                type:'doughnut',
                data:{
                    labels:pieLabels2,
                    datasets:[
                        {
                            data:pieData2,
                            backgroundColor:pieColors2
                        }
                    ]
                },
                options:{
                    responsive:false
                }
            })
        
           }
       });
       
       //pieData=[5,4,3,2];
   

        //몇등급인지 전송, 해당 등급별 위험 받아오기 
     
        $.ajax({
            url:"/finalresult/table",
            type:"get",
            data:{"level":"3"},
            dataType:"json",
            async:false,
            success:function(data){
                var html='';
                console.log(data)
                var check=data.risk
                if(check=="NO DATA"){
                    html+='<tr>'
                    html+='<td>-</td>'
                    html+='<td>-</td>'
                    html+='<td>-</td>'
                    html+='<td>-</td>'
                    html+='</tr>'
                }
                else{
                    for(key in data){
                        html+='<tr>';
                        html+='<td>'+data[key].rate+'</td>'; //위험도
                        html+='<td id="riskName" onclick="change(this)">'+data[key].risk+'</td>'; //위험명
                        html+='<td>'+data[key].manage+'</td>';//위험 처리전략
                        html+='<td id="riskNum">'+data[key].id_vulns+'</td>'; //이게 vuln 고유 번호, 숨겨짐 
                        html+='</tr>';
                }}
                $("#dynamicTbody").empty();
                $("#dynamicTbody").append(html);
                //sort();
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

       //// 차트 그리기 
       let ctx1 = document.getElementById('pie-chart1').getContext('2d');
       //var ctx1=$("#pie-chart1").getContext('2d');
       var pieLabels1=['1등급', '2등급', '3등급'];
       var pieData1=[];
       var pieColors1=["#FEEACB","#FFD696","#FFC566","#FFB136","#FF9C00"]; 

       var ctx2=document.getElementById('pie-chart2').getContext('2d');
       var pieLabels2=['정보자산','소프트웨어','인력','하드웨어'];
       var pieData2=[];
       var pieColors2=["#FEEACB","#FFD696","#FFC566","#FFB136"]; 

       //data 등급별 받아오기 
       //몇등급인지 전송, 해당 등급별 "자산 등급 분포" 받아오기 , 숫자 배열로 주세욧
       $.ajax({
           url:"/finalresult/chart1",
           type:"get",
           data:{"grade_per_grade":"4"},
           dataType:"json",
           async:false,
           success:function(data){
              console.log(data);
              for(var key in data){
                  pieData1.push(data[key])
              }
              console.log("pieData1:",pieData1);
              window.pieChart=new Chart(ctx1,{
                type:'doughnut',
                data:{
                    labels:pieLabels1,
                    datasets:[
                        {
                            data:pieData1,
                            backgroundColor:pieColors1
                        }
                    ]
                },
                options:{
                    responsive:false
                }
            })
           }
       });

       //pieData=[1,2,3,4,5];

   //data 등급별 받아오기 
    $.ajax({
       url:"/finalresult/chart2",
       type:"get",
       data:{"group_per_grade":"4"},
       dataType:"json",
       async:false,
       success:function(data){
           console.log(data);
           for(var key in data){
               pieData2.push(data[key])
           }
           console.log("pieData2:",pieData2);
           window.pieChart=new Chart(ctx2,{
            type:'doughnut',
            data:{
                labels:pieLabels2,
                datasets:[
                    {
                        data:pieData2,
                        backgroundColor:pieColors2
                    }
                ]
            },
            options:{
                responsive:false
            }
        })
       }
   });
   
   //pieData=[5,4,3,2];

        //몇등급인지 전송, 해당 등급별 위험 받아오기 

        $.ajax({
            url:"/finalresult/table",
            type:"get",
            data:{"level":"4"},
            dataType:"json",
            async:false,
            success:function(data){
                var html='';
                console.log(data)
                var check=data.risk
                if(check=="NO DATA"){
                    html+='<tr>'
                    html+='<td>-</td>'
                    html+='<td>-</td>'
                    html+='<td>-</td>'
                    html+='<td>-</td>'
                    html+='</tr>'
                }
                else{
                    for(key in data){
                        html+='<tr>';
                        html+='<td>'+data[key].rate+'</td>'; //위험도
                        html+='<td id="riskName" onclick="change(this)">'+data[key].risk+'</td>'; //위험명
                        html+='<td>'+data[key].manage+'</td>';//위험 처리전략
                        html+='<td id="riskNum">'+data[key].id_vulns+'</td>'; //이게 vuln 고유 번호, 숨겨짐 
                        html+='</tr>';
                    }}
                $("#dynamicTbody").empty();
                $("#dynamicTbody").append(html);
               // sort();
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
        
 //// 차트 그리기 
        let ctx1 = document.getElementById('pie-chart1').getContext('2d');
        //var ctx1=$("#pie-chart1").getContext('2d');
        var pieLabels1=['1등급', '2등급', '3등급'];
        var pieData1=[];
        var pieColors1=["#FEEACB","#FFD696","#FFC566","#FFB136","#FF9C00"]; 

        var ctx2=document.getElementById('pie-chart2').getContext('2d');
        var pieLabels2=['정보자산','소프트웨어','인력','하드웨어'];
        var pieData2=[];
        var pieColors2=["#FEEACB","#FFD696","#FFC566","#FFB136"];        
               //data 등급별 받아오기 
               //몇등급인지 전송, 해당 등급별 "자산 등급 분포" 받아오기 , 숫자 배열로 주세욧
               $.ajax({
                   url:"/finalresult/chart1",
                   type:"get",
                   data:{"grade_per_grade":"5"},
                   dataType:"json",
                   async:false,
                   success:function(data){
                      console.log(data);
                      for(var key in data){
                          pieData1.push(data[key])
                      }
                      console.log("pieData1:",pieData1);
                      window.pieChart=new Chart(ctx1,{
                        type:'doughnut',
                        data:{
                            labels:pieLabels1,
                            datasets:[
                                {
                                    data:pieData1,
                                    backgroundColor:pieColors1
                                }
                            ]
                        },
                        options:{
                            responsive:false
                        }
                    })
                   }
               });
       
           ////// 두 번째 차트 그리기     

           //data 등급별 받아오기 
          $.ajax({
               url:"/finalresult/chart2",
               type:"get",
               data:{"group_per_grade":"5"},
               dataType:"json",
               async:false,
               success:function(data){
                   console.log(data);
                   for(var key in data){
                       pieData2.push(data[key])
                   }
                   console.log("pieData2:",pieData2);
                   window.pieChart=new Chart(ctx2,{
                    type:'doughnut',
                    data:{
                        labels:pieLabels2,
                        datasets:[
                            {
                                data:pieData2,
                                backgroundColor:pieColors2
                            }
                        ]
                    },
                    options:{
                        responsive:false
                    }
                })
               }
           });
        
       


        $.ajax({
            url:"/finalresult/table",
            type:"get",
            data:{"level":"5"},
            dataType:"json",
            async:false,
            success:function(data){
                var html='';
                console.log(data)
                var check=data.risk
                if(check=="NO DATA"){
                    html+='<tr>'
                    html+='<td>-</td>'
                    html+='<td>-</td>'
                    html+='<td>-</td>'
                    html+='<td>-</td>'
                    html+='</tr>'
                }
                else{
                    for(key in data){
                        html+='<tr>';
                        html+='<td>'+data[key].rate+'</td>'; //위험도
                        html+='<td id="riskName" onclick="change(this)">'+data[key].risk+'</td>'; //위험명
                        html+='<td>'+data[key].manage+'</td>';//위험 처리전략
                        html+='<td id="riskNum">'+data[key].id_vulns+'</td>'; //이게 vuln 고유 번호, 숨겨짐 
                        html+='</tr>';
                    }}
                $("#dynamicTbody").empty();
                $("#dynamicTbody").append(html);
                //sort();
             
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
    console.log(num); //얘가 vuln 고유 번호 !! 
   
// 해당 위험명에 해당하는 고유 번호를 보내서, 걔의 취약성과 처리 방법 가져오기 (get)

    $.ajax({
        type: 'get',
        url : '/finalresult/modal',  //위험 정보 보낼 서버 주소 
        dataType:'json',
        data:{"vulnNum":num},
        success: function(data){   //데이터 주고받기 성공했을 경우 실행할 결과, data는 서버로부터 받은 데이터 
            // 취약성과 처리 방법이 넘어온다 

            console.log(data);
            var t1=data.name_vulns;
            var t2=data.manage_vulns;

            $("#text1").text("취약성 : "+t1);
            $("#text2").text("해결책 : "+t2);

        },
        error:function(){   //데이터 주고받기가 실패했을 경우 실행할 결과
            console.log(error);
        }
    })


    $(".modal").fadeIn(1000);
}

$(function(){
    $(".modal_content").click(function(){
        $(".modal").fadeOut();
    })
})
/*
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

}*/