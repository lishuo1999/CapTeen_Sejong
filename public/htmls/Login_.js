$(document).ready(function () { //로그인 버튼 클릭 시
    $('#login').submit(function (event) {
        $.ajax({ //서버로 id, pw 보냄
            type: "post",
            url: "/login", //서버url -> 서버쪽에서 입력할 것
            datatype: "json", //서버로 부터 수신할 데이터 타입
		    contentType : "application/json", //전송할 테이터 타입
            success: function(){ 
                console.log(data);
                alert("success");
            },
            error: function() {
                console.log(error);
                alert('error');
            }
        });
    });
});




/*$(function() { //페이지 로드할 때
    var data = { //data = {"id":"사용자 아이디","pw":"사용자 비밀번호"}
        "id": "aixue1999",
        "pw": "kuaile1999"
    }
    $.ajax({ //서버로 id, pw 보냄
        type: "post",
        url: "https://jsonplaceholder.typicode.com/posts", //서버url
        datatype: "json", //서버로 부터 수신할 데이터 타입
        contentType : "application/json", //전송할 테이터 타입
        data: JSON.stringify(data), //stringify 안쓰면 오류뜸
        success: function(){
            alert("success");
            console.log(data);
        },
        error: function() {
            console.log(error);
        }
    });
});*/