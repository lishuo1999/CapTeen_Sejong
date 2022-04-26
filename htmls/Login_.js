$(function () {
    $('#login').on("submit", function (event) {
        var $id = $(this).find("[name=id]");
        var $pw = $(this).find("[name=pw]");

        var data = { //data = {"id":"사용자 아이디","pw":"사용자 비밀번호"}
            "id": $id.val(),
            "pw": $pw.val()
        }

        fetch(getContextPath() + "/", { //""에 url 입력
            method: "post",
            headers: {
                "Content-Type": "application/json", //보내는 데이터가 json이라는 걸 알려줌
            },
            body: JSON.stringfy(data),  //json을 string으로 변환해서 body에 넣어 보냄
        });
    });
});