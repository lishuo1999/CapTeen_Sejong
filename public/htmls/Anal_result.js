var real=JSON.parse(localStorage.getItem("data"));
var result=Object.keys(real); //전송받은 데이터 result 변수에 저장~ 
var datas=[]
for(var i=0;i<result.length-1;i++){ //맨뒤에 id값이 추가되니까 length-1 ..
    var key=result[i];
    datas[i]=parseInt(real[key]); //문자를 정수형 숫자로 변환
}
console.log(datas);


window.onload = function () {
    pieChartDraw(); //차트 그래프 그리기 
    createGradetable(); //등급 표 만들기
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
            plugins:{
                title: {
                    display: true,
                    text: '위험도 등급별 분포'
                }
            }
        }
    });
};

let createGradetable=function(){
    for (var i=0;i<5;i++){
        $("tr:eq("+1+") td:eq("+(i+1)+")").html(datas[i]);
        // 1번째 행의 i+1번째 열에 datas[i] 데이터 넣음
        
    }
};