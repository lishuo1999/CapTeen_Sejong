window.onload = function () {
    $("#asset_list_table").hide();
}

$(function () { //조회 버튼 클릭 시
    $('#search_button').click(function () {
        $("#asset_list_table").show();
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
                { data: "userId", width: 60 },
                { data: "id", width: 120 },
                { data: "title" },
                {
                    render: function () {
                        return '<input type="checkbox" name="user_checkbox" value="" style="width: 100px" checked>'
                    }
                }
            ]
        });
    });
});
$(function () { //자산분류 선택 시 -> 해당 자산그룹명 리스트를 select 태그에 데이터 가져오기
    $('#sel_1').change(function (event) {
        var $data_send = $(this).val();
        //alert($data_send);
        $.ajax({
            type: "get",
            url: "/",
            datatype: "json",
            contentType: "application/json",
            data: {
                "index": $data_send
            },
            success: function (data) { //data: 서버로부터 받아온 json data    (여기까지 성공)
                for (var i = 0; i < data.length; i++) {
                    $('#sel_2').append("<option value=" + obj[i].userId + ">" + obj[i].id + "</option>");
                }
            },
            error: function () {
                console.log(error);
            }
        });
    });
});


$(function () { //담기 버튼 클릭 시
    $('#collect').click(function () {
        var checkbox = $("input[name=user_checkbox]:checked");
        var checkbox_length = $("input:checkbox[name=user_checkbox]:checked").length;
        checkbox.each(function(i) { // 체크된 체크박스 값을 가져옴
            $(".users_asset_list_table>tbody").append("<tr><td>test1</td><td>test2</td><td>test3</td></tr>");
        });
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