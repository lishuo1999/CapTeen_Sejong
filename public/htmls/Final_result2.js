window.onload = function () {
    //처리 전략별 위험 개수
    /*$.ajax({
        type: "get",
        url: "/", //서버에서 입력할 것
        datatype: "json",
        contentType: "application/json",
        data: {
            //"index": $data_send
        },
        success: function (data) { //data: 서버로부터 받아온 json data
            $('#con_top1').append("<p style=" + "margin:0px; font-weight: 900;" + ">위험 수용</p><span>" + data.accept + "</span>");
            $('#con_top2').append("<p style=" + "margin:0px; font-weight: 900;" + ">위험 전가</p><span>" + data.transfer + "</span>");
            $('#con_top3').append("<p style=" + "margin:0px; font-weight: 900;" + ">위험 회피</p><span>" + data.avoid + "</span>");
            $('#con_top4').append("<p style=" + "margin:0px; font-weight: 900;" + ">위험 감소</p><span>" + data.reduce + "</span>");
        },
        error: function () {
            console.log(error);
        }
    });*/

    var ctx1 = $("#pie-chart1"); //자산
    var pieLabels = ["1등급", "2등급", "3등급", "4등급", "5등급"];
    var pieData = [10, 8, 3, 8, 7]; //임의로 설정
    var pieColors = [
        "#0E77C7",
        "#3E9DE6",
        "#74B7ED",
        "#B5DCFF",
        "#E3EDFE"
    ];

    /*$.ajax({
        type: "get",
        url: "/", //서버에서 입력할 것
        datatype: "json",
        contentType: "application/json",
        data: {
            //"index": $data_send
        },
        success: function (data) { //data: 서버로부터 받아온 json data
            pieData[0] = data.asset_grade_1,
            pieData[1] = data.asset_grade_2,
            pieData[2] = data.asset_grade_3,
            pieData[3] = data.asset_grade_4,
            pieData[4] = data.asset_grade_5
        },
        error: function () {
            console.log(error);
        }
    });*/

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

    var ctx2 = $("#pie-chart2"); //취약성
    var pieLabels = ["1등급", "2등급", "3등급", "4등급", "5등급"];
    var pieData = [4, 2, 3, 9, 10]; //임의로 설정
    var pieColors = [
        "#FF9C00",
        "#FFB136",
        "#FFC566",
        "#FFD696",
        "#FEEACB"
    ];

    /*$.ajax({
        type: "get",
        url: "/", //서버에서 입력할 것
        datatype: "json",
        contentType: "application/json",
        data: {
            //"index": $data_send
        },
        success: function (data) { //data: 서버로부터 받아온 json data
            pieData[0] = data.vuln_grade_1,
            pieData[1] = data.vuln_grade_2,
            pieData[2] = data.vuln_grade_3,
            pieData[3] = data.vuln_grade_4,
            pieData[4] = data.vuln_grade_5
        },
        error: function () {
            console.log(error);
        }
    });*/

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

    var ctx3 = $("#pie-chart3"); //위협
    var pieLabels = ["1등급", "2등급", "3등급", "4등급", "5등급"];
    var pieData = [4, 9, 2, 9, 4]; //임의로 설정
    var pieColors = [
        "#00B834",
        "#30D960",
        "#65E68C",
        "#A6FFBF",
        "#D9FCE0"
    ];

    /*$.ajax({
        type: "get",
        url: "/", //서버에서 입력할 것
        datatype: "json",
        contentType: "application/json",
        data: {
            //"index": $data_send
        },
        success: function (data) { //data: 서버로부터 받아온 json data
            pieData[0] = data.threat_grade_1,
            pieData[1] = data.threat_grade_2,
            pieData[2] = data.threat_grade_3,
            pieData[3] = data.threat_grade_4,
            pieData[4] = data.threat_grade_5
        },
        error: function () {
            console.log(error);
        }
    });*/

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


    var ctx4 = $("#bar-chart1"); //자산 대분류별 자산 수
    var barData = [5, 9, 2, 10, 9];

    $.ajax({
        type: "get",
        url: "/", //서버에서 입력할 것
        datatype: "json",
        contentType: "application/json",
        data: {
            //"index": $data_send
        },
        success: function (data) { //data: 서버로부터 받아온 json data
            barData[0] = data.index_1,
            barData[1] = data.index_2,
            barData[2] = data.index_3,
            barData[3] = data.index_4,
            barData[4] = data.index_5
        },
        error: function () {
            console.log(error);
        }
    });

    var mybarChart = new Chart(ctx4, {
        type: 'bar',
        data: {
            labels: ["전자정보", "문서", "소프트웨어", "하드웨어", "인력"],
            datasets: [{
                label: '자산 대분류별 자산 수',
                data: barData,
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


    var ctx5 = $("#bar-chart2"); //위험도 등급별 위험 수
    var barData = [10, 6, 12, 7, 8];

    /*$.ajax({
        type: "get",
        url: "/", //서버에서 입력할 것
        datatype: "json",
        contentType: "application/json",
        data: {
            //"index": $data_send
        },
        success: function (data) { //data: 서버로부터 받아온 json data
            barData[0] = data.grade_1,
            barData[1] = data.grade_2,
            barData[2] = data.grade_3,
            barData[3] = data.grade_4,
            barData[4] = data.grade_5
        },
        error: function () {
            console.log(error);
        }
    });*/

    var mybarChart = new Chart(ctx5, {
        type: 'bar',
        data: {
            labels: ["1등급", "2등급", "3등급", "4등급", "5등급"],
            datasets: [{
                label: '위험도 등급별 위험 수',
                data: barData,
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
