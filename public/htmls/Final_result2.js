window.onload = function () {
    $(function(){ //DataTable
        /*$("#con_bot1_table").DataTable({
            lengthChange: false, // 검색 기능 숨기기
            searching: false,// 정렬 기능 숨기기
            ordering: false,// 정보 표시 숨기기
            info: true,// 페이징 기능 숨기기
            paging: true,
            pagingType : "simple",
            "autoWidth": false,
            "scrollY": 170,
            "scrollCollapse": true,
            "pageLength": 5
        });*/
    });

    var ctx1 = $("#pie-chart1");
    var pieLabels = ["1등급", "2등급", "3등급", "4등급", "5등급"];
    var pieData = [10, 4, 8, 4, 3]; //임의로 설정
    var pieColors = [
        "#0E77C7",
        "#3E9DE6",
        "#74B7ED",
        "#B5DCFF",
        "#E3EDFE"
    ];

    var mypieChart = new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: pieLabels,
            datasets: [
                {
                    data: pieData,
                    backgroundColor: pieColors,
                    hoverOffset: 4
                }
            ]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Chart.js Doughnut Chart'
            },
            legend: {
                display: true,
                position: 'bottom'
            }
        }
    });

    var ctx2 = $("#pie-chart2");
    var pieLabels = ["1등급", "2등급", "3등급", "4등급", "5등급"];
    var pieData = [10, 10, 8, 4, 1]; //임의로 설정
    var pieColors = [
        "#FF9C00",
        "#FFB136",
        "#FFC566",
        "#FFD696",
        "#FEEACB"
    ];

    var mypieChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: pieLabels,
            datasets: [
                {
                    data: pieData,
                    backgroundColor: pieColors
                }
            ]
        },
        options: {
            maintainAspectRadio: false
        }
    });

    var ctx3 = $("#pie-chart3");
    var pieLabels = ["1등급", "2등급", "3등급", "4등급", "5등급"];
    var pieData = [7, 10, 8, 4, 3]; //임의로 설정
    var pieColors = [
        "#00B834",
        "#30D960",
        "#65E68C",
        "#A6FFBF",
        "#D9FCE0"
    ];

    var mypieChart = new Chart(ctx3, {
        type: 'doughnut',
        data: {
            labels: pieLabels,
            datasets: [
                {
                    data: pieData,
                    backgroundColor: pieColors
                }
            ]
        },
        options: {
            maintainAspectRadio: false
        }
    });


    var ctx4 = $("#bar-chart1");
    var mybarChart = new Chart(ctx4, {
        type: 'bar',
        data: {
            labels: ["전자정보", "문서", "소프트웨어", "하드웨어", "인력"],
            datasets: [{
                label: '자산 대분류별 자산 수',
                data: [65, 59, 80, 81, 56],
                backgroundColor: [
                    '#C7C8FF',
                    '#C7C8FF',
                    '#C7C8FF',
                    '#C7C8FF',
                    '#C7C8FF',
                ],
                
                hoverBorderWidth: 1,
                barThickness: 15
            }]
        },
        options: {
            indexAxis: 'y',
        }
    });


    var ctx5 = $("#bar-chart2");
    var mybarChart = new Chart(ctx5, {
        type: 'bar',
        data: {
            labels: ["1등급", "2등급", "3등급", "4등급", "5등급"],
            datasets: [{
                label: '위험도 등급별 위험 수',
                data: [65, 59, 80, 81, 56],
                backgroundColor: [
                    '#FF4437',
                    '#FFA636',
                    '#FFFA48',
                    '#73E600',
                    '#05B81D',
                ],
                hoverBorderWidth: 1,
                barThickness: 50
            }]
        },
        options: {
        }
    });     
}

