
window.onload = function () {
    $("#right").hide(); //처음에는 가리기 
    $("#fadeinText1").hide();
    $("#fadeinText2").hide();
    $("#fadeinText3").hide();
    $("#fadeinText4").hide();
}



//위험 수용박스를 클릭했을 때 
$(function(){
    $('#box1').on('click',function(){ // 위험 수용 
        $("#box1").hide();
        $("#box2").hide();
        $("#box3").hide();
        $("#box4").hide();
        $("#right").fadeIn(1000);
        $("#fadeinText1").fadeIn(1000);
        $(".bigbox").css({
            //"background-color": "#F1F0EF",
            "background-color":"white",
            "border":"2px white solid",
            "border-radius":"50px",
            "box-shadow": "2px 2px 3px 3px #CBCBCB"
            })
        
        $("#methodTable").DataTable({
            info:false,
            paging:false,
            autoWidth:false,
            searching:false,
            ordering:false,
            destroy:true, //다시 클릭하면 다시 로드 
            ajax:{ //위험 수용에 해당하는 위험들 받아오기
                type: "get",
                url: 'https://jsonplaceholder.typicode.com/comments',  //서버에서 입력할 url
                dataSrc: '',
                dataType: 'json',
            },
            columns:[
                {data:"id",width:"70%"}, //1열만 데이터 받아와서 넣기 (위험수용에 해당하는 위험들), "id"로 적혀있는 값은 수정 필요 
                {
                    render: function () { //select box
                        return '<select id="choice" onchange="change(this);"><option value="sooyong">위험 수용</option><option value="jeonga">위험 전가</option><option value="hoepee">위험 회피</option><option value="gamso">위험 감소</option></select>'
                    }
                }
            ],
        });
        $("#choice").val("sooyong").prop("selected", true); //초기 선택값 지정
    })
});



//위험 전가 박스를 클릭했을 때 
$(function(){
    $('#box2').on('click',function(){ // 위험 전가
        $("#box1").hide();
        $("#box2").hide();
        $("#box3").hide();
        $("#box4").hide();
        $("#right").fadeIn(1000);
        $("#fadeinText2").fadeIn(1000);
        $(".bigbox").css({
            //"background-color": "#F1F0EF",
            "background-color":"white",
            "border":"2px white solid",
            "border-radius":"50px",
            "box-shadow": "2px 2px 3px 3px #CBCBCB"
            })

        $("#methodTable").DataTable({
            info:false,
            paging:false,
            autoWidth:false,
            ordering:false,
            searching:false,
            destroy:true, //다시 클릭하면 다시 로드 
            ajax:{ //위험 전가에 해당하는 위험들 받아오기
                type: "get",
                url: 'https://jsonplaceholder.typicode.com/comments',//서버 url
                dataSrc: '',
                dataType: 'json',
            },
            columns:[
                {data:"id",width:"70%"}, //1열만 데이터 받아와서 넣기 (위험전가에 해당하는 위험들)
                {
                    render: function () { //select box
                        return '<select id="choice" onchange="change(this);"><option value="jeonga">위험 전가</option><option value="sooyong">위험 수용</option><option value="hoepee">위험 회피</option><option value="gamso">위험 감소</option></select>'
                    }
                }
            ],


        });
        $("#choice").val("jeonga").prop("selected", true); //초기 선택값 지정
    })
});



//위험 회피 박스를 클릭했을 때 
$(function(){
    $('#box3').on('click',function(){ // 위험 회피
        $("#box1").hide();
        $("#box2").hide();
        $("#box3").hide();
        $("#box4").hide();
        $("#right").fadeIn(1000);
        $("#fadeinText3").fadeIn(1000);
        $(".bigbox").css({
            //"background-color": "#F1F0EF",
            "background-color":"white",
            "border":"2px white solid",
            "border-radius":"50px",
            "box-shadow": "2px 2px 3px 3px #CBCBCB"
            })

        $("#methodTable").DataTable({
            info:false,
            paging:false,
            autoWidth:false,
            ordering:false,
            searching:false,
            destroy:true, //다시 클릭하면 다시 로드 
            ajax:{ //위험 회피에 해당하는 위험들 받아오기
                type: "get",
                url: 'https://jsonplaceholder.typicode.com/comments', //서버 url
                dataSrc: '',
                dataType: 'json',
            },
            columns:[
                {data:"id",width:"70%"}, //1열만 데이터 받아와서 넣기 (위험회피에 해당하는 위험들)
                {
                    render: function () { //select box
                        return '<select id="choice" onchange="change(this);"><option value="hoepee">위험 회피</option><option value="sooyong">위험 수용</option><option value="jeonga">위험 전가</option><option value="gamso">위험 감소</option></select>'
                    }
                }
            ],


        });
        $("#choice").val("hoepee").prop("selected", true); //초기 선택값 지정
    })
});



//위험 감소 박스를 클릭했을 때 
$(function(){
    $('#box4').on('click',function(){ // 위험 감소
        $("#box1").hide();
        $("#box2").hide();
        $("#box3").hide();
        $("#box4").hide();
        $("#right").fadeIn(1000);
        $("#fadeinText4").fadeIn(1000);
        $(".bigbox").css({
            //"background-color": "#F1F0EF",
            "background-color":"white",
            "border":"2px white solid",
            "border-radius":"50px",
            "box-shadow": "2px 2px 3px 3px #CBCBCB"
            })

        $("#methodTable").DataTable({
            info:false,
            paging:false,
            autoWidth:false,
            ordering:false,
            searching:false,
            destroy:true, //다시 클릭하면 다시 로드 
            ajax:{ //위험 감소에 해당하는 위험들 받아오기
                type: "get",
                url: 'https://jsonplaceholder.typicode.com/comments', //서버 url
                dataSrc: '',
                dataType: 'json',
            },
            columns:[
                {data:"id",width:"70%"}, //1열만 데이터 받아와서 넣기 (위험감소에 해당하는 위험들)
                {
                    render: function () { //select box
                        return '<select id="choice" onchange="change(this);"><option value="gamso">위험 감소</option><option value="sooyong">위험 수용</option><option value="jeonga">위험 전가</option><option value="hoepee">위험 회피</option></select>'
                    }
                }
            ],


        });
        $("#choice").val("gamso").prop("selected", true); //초기 선택값 지정
    });

});


function change(obj){ //select box 다른 옵션 클릭했을때
    var index=obj.closest("tr").rowIndex;
    console.log(index); //클릭한 애의 rowindex 가져오기 
    var val=obj.closest("td");
   // console.log(val);
    var sel=val.firstChild.options[val.firstChild.selectedIndex].value; //클릭한 애의 선택된 값 가져오기 
    console.log(sel);

    var obj={"index":index,"selected":sel}; //{변경한 열 번호, 변경한 값} 전송

    $.ajax({
        type: 'POST',   //post방식으로 명시
        url : 'https://jsonplaceholder.typicode.com/comments',  //서버 주소 
        dataType:'json',
        data:({
            obj
        }),
        success: function(data){   //데이터 주고받기 성공했을 경우 실행할 결과, data는 서버로부터 받은 데이터 
            //function(data)를 쓰게 되면 전달받은 데이터가 data안에 담아서 들어오게 된다. 
            console.log(data);
        },
        error:function(){   //데이터 주고받기가 실패했을 경우 실행할 결과
            console.log(error);
        }
    })
}

