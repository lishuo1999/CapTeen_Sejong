/*$(document).ready(function () {
    //$('#asset_list_table').DataTable();
    $("#asset_list_table").DataTable({
        ajax: {
            type: "get",
            url: "https://jsonplaceholder.typicode.com/posts",
            dataSrc: '',
            dataType: 'json',
            success: function (data) {
                let str = JSON.stringify(data);
                alert(str);
            },
            error: function () {
                alert('error');
            }
        },
        columns: [
            { data: "userId" },
            { data: "id" },
            { data: "title" },
            { data: "body" }
        ]
    });
});*/

$(function(){ //json 데이터를 Datatable에 가져오기
    $("#asset_list_table").DataTable({
        lengthChange: false,
        // 검색 기능 숨기기
        searching: true,
        // 정렬 기능 숨기기
        ordering: true,
        // 정보 표시 숨기기
        info: false,
        // 페이징 기능 숨기기
        paging: false,
        ajax: {
            type: "get",
            url: 'https://jsonplaceholder.typicode.com/posts',
            dataSrc: '',
            dataType: 'json',
        },
        columns: [
            { data: "userId", width: 60},
            { data: "id", width: 120},
            { data: "title" },
            {
                render: function() {
                    return '<input type="checkbox" name="" value="" style="width: 100px" checked>'
                }
            }
        ]
    });

});




//POST method
/*$(function() {
    $("#search_button").click(function() {
        $.ajax({ //서버로 id, pw 보냄
            type: "post",
            url: "/", //서버url
            datatype: "json", //서버로 부터 수신할 데이터 타입
            contentType : "application/json", //전송할 테이터 타입
            data: data,
            success: function(data){
                console.log(data);
            },
            error: function() {
                console.log(error);
            }
        });
    });
});*/

//GET method
/*$(function() {
    $("#search_button").click(function() { //조회버튼 누르면
        $.ajax({
            type: "get",
            url: "https://jsonplaceholder.typicode.com/users/1",
            datatype: "json",
            success: function(data){
                let str = JSON.stringify(data);
                alert(str);
            },
            error: function() {
                alert('error');
            }
        });
    });
});*/