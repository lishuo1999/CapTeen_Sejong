var real=JSON.parse(localStorage.getItem("data")); // 데이터 가져오기 추후 이름 바꿈
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



let pieChartData1 = {
    labels: ['1등급', '2등급', '3등급', '4등급', '5등급'],
    datasets: [{
        data: [4,7,2,5,9],
        backgroundColor: ["#FF9C00","#FFB136","#FFC566","#FFD696","#FEEACB"]
    }] 
};


let pieChartData2 = {
    labels: ['하드웨어', '소프트웨어', '정보자산', '인적'],
    datasets: [{
        data: [4,7,2,5],
        backgroundColor: ["#FF9C00","#FFB136","#FFC566","#FFD696"]
    }] 
};


let pieChartDraw1 = function () {
    let ctx = document.getElementById('pie-chart1').getContext('2d');
    
    window.pieChart = new Chart(ctx, {
        type: 'doughnut',
        data: pieChartData1,
        options: {
            responsive:false,
            //title: {
            //    display: true,
            //    text: '위험도 등급별 분포'
            //}
            
        }
    });

};


let pieChartDraw2 = function () {
    let ctx = document.getElementById('pie-chart2').getContext('2d');
    
    window.pieChart = new Chart(ctx, {
        type: 'doughnut',
        data: pieChartData2,
        options: {
            responsive:false,
            //title: {
            //    display: true,
            //    text: '위험도 등급별 분포'
            //}
            
        }
    });

};


//1등급 박스를 클릭하였을때 
$(function(){
    $('#box1-1').on('click',function(){ 
        $.noConflict();
        //도넛차트 그리기
        pieChartDraw1(); //차트 그래프 그리기 
        pieChartDraw2();
        $("#chart1-name").text("위험 1등급의 자산 등급 분포");
        $("#chart2-name").text("위험 1등급의 자산 분류 분포");

        //몇등급인지 전송, 해당 등급별 위험 받아오기 
        $.ajax({
            url:"https://jsonplaceholder.typicode.com/posts",
            type:"post",
            dataType:"json",
            data:({
                "level":"1등급" //선택한 카테고리 정보 서버로 전송
            }),
            success:function(data){
               console.log(data);
            }
        })

        $("#finalTable").DataTable({

            info:false,
            paging:false,
            autoWidth:false,
            searching:false,
            destroy:true, //다시 클릭하면 다시 로드 
            order:[[0,"desc"]], //나중에 위험도 내림차순때문에 지정
            ajax:{
                type: "get",
                url: 'https://jsonplaceholder.typicode.com/posts',
                dataSrc: '',
                dataType: 'json',
            },
            columns:[
                {data:"id"},
                {data:"title"},
                {data:"userId"},
            ],
            //scrollX:false,
            //scrollY:350

        });

        $("#box2").fadeIn(1000);
        $("#box3").fadeIn(1000);
    })
});


//2등급 박스를 클릭하였을때 
$(function(){
    $('#box1-2').on('click',function(){ 
        $.noConflict();
        //도넛차트 그리기
        pieChartDraw1(); //차트 그래프 그리기 
        pieChartDraw2();
        $("#chart1-name").text("위험 2등급의 자산 등급 분포");
        $("#chart2-name").text("위험 2등급의 자산 분류 분포");

        //몇등급인지 전송, 해당 등급별 위험 받아오기 
        $.ajax({
            url:"https://jsonplaceholder.typicode.com/posts",
            type:"post",
            dataType:"json",
            data:({
                "level":"2등급" //선택한 카테고리 정보 서버로 전송
            }),
            success:function(data){
               console.log(data);
            }
        })

        $("#finalTable").DataTable({

            info:false,
            paging:false,
            autoWidth:false,
            searching:false,
            destroy:true, //다시 클릭하면 다시 로드 
            order:[[0,"desc"]], //나중에 위험도 내림차순때문에 지정
            ajax:{
                type: "get",
                url: 'https://jsonplaceholder.typicode.com/posts',
                dataSrc: '',
                dataType: 'json',
            },
            columns:[
                {data:"id"},
                {data:"title"},
                {data:"userId"},
            ],
            //scrollX:false,
            //scrollY:350

        });
        $("#box2").fadeIn(1000);
        $("#box3").fadeIn(1000);
        
      

    })
});


//3등급 박스를 클릭하였을때 
$(function(){
    $('#box1-3').on('click',function(){ 
        $.noConflict();
        //도넛차트 그리기
        pieChartDraw1(); //차트 그래프 그리기 
        pieChartDraw2();
        $("#chart1-name").text("위험 3등급의 자산 등급 분포");
        $("#chart2-name").text("위험 3등급의 자산 분류 분포");

        //몇등급인지 전송, 해당 등급별 위험 받아오기 
        $.ajax({
            url:"https://jsonplaceholder.typicode.com/posts",
            type:"post",
            dataType:"json",
            data:({
                "level":"3등급" //선택한 카테고리 정보 서버로 전송
            }),
            success:function(data){
               console.log(data);
            }
        })
        
        $("#finalTable").DataTable({

            info:false,
            paging:false,
            autoWidth:false,
            searching:false,
            destroy:true, //다시 클릭하면 다시 로드 
            order:[[0,"desc"]], //나중에 위험도 내림차순때문에 지정
            ajax:{
                type: "get",
                url: 'https://jsonplaceholder.typicode.com/posts',
                dataSrc: '',
                dataType: 'json',
            },
            columns:[
                {data:"id"},
                {data:"title"},
                {data:"userId"},
            ],
            //scrollX:false,
            //scrollY:350

        });
        $("#box2").fadeIn(1000);
        $("#box3").fadeIn(1000);

        //몇등급인지 전송, 해당 등급별 위험 받아오기 
      

    })
});


//4등급 박스를 클릭하였을때 
$(function(){
    $('#box1-4').on('click',function(){ 

        $.noConflict();
        //도넛차트 그리기
        pieChartDraw1(); //차트 그래프 그리기 
        pieChartDraw2();
        $("#chart1-name").text("위험 4등급의 자산 등급 분포");
        $("#chart2-name").text("위험 4등급의 자산 분류 분포");

        //몇등급인지 전송, 해당 등급별 위험 받아오기 
        $.ajax({
            url:"https://jsonplaceholder.typicode.com/posts",
            type:"post",
            dataType:"json",
            data:({
                "level":"4등급" //선택한 카테고리 정보 서버로 전송
            }),
            success:function(data){
               console.log(data);
            }
        })
        
        $("#finalTable").DataTable({

            info:false,
            paging:false,
            autoWidth:false,
            searching:false,
            destroy:true, //다시 클릭하면 다시 로드 
            order:[[0,"desc"]], //나중에 위험도 내림차순때문에 지정
            ajax:{
                type: "get",
                url: 'https://jsonplaceholder.typicode.com/posts',
                dataSrc: '',
                dataType: 'json',
            },
            columns:[
                {data:"id"},//위험도
                {data:"title"}, //위험
                {data:"userId"}, //처리전략
            ],
            //scrollX:false,
            //scrollY:350

        });
        $("#box2").fadeIn(1000);
        $("#box3").fadeIn(1000);

        //몇등급인지 전송, 해당 등급별 위험 받아오기 
      

    })
});

//5등급 박스를 클릭하였을때 
$(function(){
    $('#box1-5').on('click',function(){ 

        $.noConflict();
        //도넛차트 그리기
        pieChartDraw1(); //차트 그래프 그리기 
        pieChartDraw2();
        $("#chart1-name").text("위험 5등급의 자산 등급 분포");
        $("#chart2-name").text("위험 5등급의 자산 분류 분포");

        //몇등급인지 전송, 해당 등급별 위험 받아오기 
        $.ajax({
            url:"https://jsonplaceholder.typicode.com/posts",
            type:"post",
            dataType:"json",
            data:({
                "level":"5등급" //선택한 카테고리 정보 서버로 전송
            }),
            success:function(data){
               console.log(data);
            }
        })
        
        $("#finalTable").DataTable({

            info:false,
            paging:false,
            autoWidth:false,
            searching:false,
            destroy:true, //다시 클릭하면 다시 로드 
            order:[[0,"desc"]], //나중에 위험도 내림차순때문에 지정
            ajax:{
                type: "get",
                url: 'https://jsonplaceholder.typicode.com/posts',
                dataSrc: '',
                dataType: 'json',
            },
            columns:[
                {data:"id"},
                {data:"title"},
                {data:"userId"},
            ],
            //scrollX:false,
            //scrollY:350

        });
        $("#box2").fadeIn(1000);
        $("#box3").fadeIn(1000);
        //몇등급인지 전송, 해당 등급별 위험 받아오기 
      

    })
});
