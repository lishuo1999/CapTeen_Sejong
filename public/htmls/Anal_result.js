var real=JSON.parse(localStorage.getItem("data"));
var result=Object.keys(real); //전송받은 데이터 result 변수에 저장~ 
var datas=[]
for(var i=0;i<5;i++){ 
    var key=result[i];
    datas[i]=parseInt(real[key]); //문자를 정수형 숫자로 변환
}
console.log(datas);


window.onload = function () {
    $("#table_right").hide();
    $("#caption").hide();
    $(".box2").hide();
    pieChartDraw(); //차트 그래프 그리기 
    createGradetable(); //등급 표 만들기
    $('.tooltip0').tooltip();
    $('.tooltip1').tooltip();
    $('.tooltip2').tooltip();
    $('.tooltip3').tooltip();
    $('.tooltip4').tooltip();
    $('.tooltip5').tooltip(); //tooltip show (bootstrap)
}

let pieChartData = {
    labels: ['1등급', '2등급', '3등급', '4등급', '5등급'],
    datasets: [{
        data: datas,
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)']
    }] 
};

let pieChartDraw = function () {
    let ctx = document.getElementById('pie-chart').getContext('2d');
    
    window.pieChart = new Chart(ctx, {
        type: 'pie',
        data: pieChartData,
        options: {
            responsive:false,
            //title: {
            //    display: true,
            //    text: '위험도 등급별 분포'
            //}
            
        }
    });
};

let createGradetable=function(){
    for (var i=0;i<5;i++){
        $("tr:eq("+1+") td:eq("+(i+1)+")").html(datas[i]);
        // 1번째 행의 i+1번째 열에 datas[i] 데이터 넣음

    }
};

//1등급부터 5등급까지 클릭했을때
$(function(){
    $('#head .tooltip1').on('click',function(){ //1등급
        $("#caption").text("1등급");
        $("#caption").fadeIn(1000);
        $("#table_right").fadeIn(1000);
        $(".box2").fadeIn(1000);
        $("#totalTable").DataTable({
            info:false,
            paging:false,
            autoWidth:false,
            destroy:true, //다시 클릭하면 다시 로드 
            order:[[0,"desc"]], //이건 나중에 위험도 내림차순때문에 지정
            ajax:{
                type: "get",
                url: '/analysis/risk1', //서버에서 변경
                dataSrc: '',
                dataType: 'json',
            },
            columns:[ //여기 data 명은 서버에서 변경 
                {data:"riskRate",width:"10%"},
                {data:"risk",width:"90%"}
            ],
            //scrollX:false,
            //scrollY:350



            //columnDefs: [
            //   
            //    { targets: 0, width: 5 },
            //    { targets: 1, width: 5 },
            //    { targets: 2, width: 15 },
            //    { targets: 3, width: 20 },
            //    { targets: 4, width: 25 }
            //]

        });

    });
    $('#head .tooltip2').on('click',function(){ //1등급
        $("#caption").text("2등급");
        $("#caption").fadeIn(1000);
        $("#table_right").fadeIn(1000);
        $(".box2").fadeIn(1000);
        $("#totalTable").DataTable({

            info:false,
            paging:false,
            autoWidth:false,
            destroy:true, //다시 클릭하면 다시 로드 
            order:[[0,"desc"]], //이건 나중에 위험도 내림차순때문에 지정
            ajax:{
                type: "get",
                url: '/analysis/risk2',
                dataSrc: '',
                dataType: 'json',
            },
            columns:[
                {data:"riskRate",width:"10%"},
                {data:"risk",width:"90%"}
            ],
            //scrollX:false,
            //scrollY:350



            //columnDefs: [
            //   
            //    { targets: 0, width: 5 },
            //    { targets: 1, width: 5 },
            //    { targets: 2, width: 15 },
            //    { targets: 3, width: 20 },
            //    { targets: 4, width: 25 }
            //]

        });

    });
    $('#head .tooltip3').on('click',function(){ //1등급
        $("#caption").text("3등급");
        $("#caption").fadeIn(1000);
        $("#table_right").fadeIn(1000);
        $(".box2").fadeIn(1000);
        $("#totalTable").DataTable({

            info:false,
            paging:false,
            autoWidth:false,
            destroy:true, //다시 클릭하면 다시 로드 
            order:[[0,"desc"]], //이건 나중에 위험도 내림차순때문에 지정
            ajax:{
                type: "get",
                url: '/analysis/risk3',
                dataSrc: '',
                dataType: 'json',
            },
            columns:[
                {data:"riskRate",width:"10%"},
                {data:"risk",width:"90%"}
            ],
            //scrollX:false,
            //scrollY:350



            //columnDefs: [
            //   
            //    { targets: 0, width: 5 },
            //    { targets: 1, width: 5 },
            //    { targets: 2, width: 15 },
            //    { targets: 3, width: 20 },
            //    { targets: 4, width: 25 }
            //]

        });

    });
    $('#head .tooltip4').on('click',function(){ //4등급
        $("#caption").text("4등급");
        $("#caption").fadeIn(1000);
        $("#table_right").fadeIn(1000);        
        $(".box2").fadeIn(1000);
        $("#totalTable").DataTable({

            info:false,
            paging:false,
            autoWidth:false,
            destroy:true, //다시 클릭하면 다시 로드 
            order:[[0,"desc"]], //이건 나중에 위험도 내림차순때문에 지정
            ajax:{
                type: "get",
                url: '/analysis/risk4',
                dataSrc: '',
                dataType: 'json',
            },
            columns:[
                {data:"riskRate",width:"10%"},
                {data:"risk",width:"90%"}
            ],
            //scrollX:false,
            //scrollY:350



            //columnDefs: [
            //   
            //    { targets: 0, width: 5 },
            //    { targets: 1, width: 5 },
            //    { targets: 2, width: 15 },
            //    { targets: 3, width: 20 },
            //    { targets: 4, width: 25 }
            //]

        });

    });
    $('#head .tooltip5').on('click',function(){ //5등급
        $("#caption").text("5등급");
        $("#caption").fadeIn(1000);
        $("#table_right").fadeIn(1000);        
        $(".box2").fadeIn(1000);
        $("#totalTable").DataTable({

            info:false,
            paging:false,
            autoWidth:false,
            destroy:true, //다시 클릭하면 다시 로드 
            order:[[0,"desc"]], //이건 나중에 위험도 내림차순때문에 지정
            ajax:{
                type: "get",
                url: '/analysis/risk5',
                dataSrc: '',
                dataType: 'json',
            },
            columns:[
                {data:"riskRate",width:"10%"},
                {data:"risk",width:"90%"}
            ],
            //scrollX:false,
            //scrollY:350



            //columnDefs: [
            //   
            //    { targets: 0, width: 5 },
            //    { targets: 1, width: 5 },
            //    { targets: 2, width: 15 },
            //    { targets: 3, width: 20 },
            //    { targets: 4, width: 25 }
            //]

        });

    });
});