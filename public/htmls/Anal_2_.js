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
                url: '/', //서버에서 입력할 것
                dataSrc: '',
                dataType: 'json',
            },
            columns: [
                { data: "index", width: 60 }, //대분류
                { data: "groupname", width: 120 }, //자산그룹명
                { data: "assetname" },  //자산명
                {
                    render: function () { //체크박스
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
            url: "/", //서버에서 입력할 것
            datatype: "json",
            contentType: "application/json",
            data: {
                "index": $data_send
            },
            success: function (data) { //data: 서버로부터 받아온 json data    (여기까지 성공)
                for (var i = 0; i < data.length; i++) {
                    $('#sel_2').append("<option value=" + obj[i].groupId + ">" + obj[i].groupname + "</option>"); //groupname: 자산그룹명, groupId: 해당 그룹명의 value값
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
        var myDatatable = $("#asset_list_table").DataTable();    
        $('input:checkbox[name=user_checkbox]').each(function (i) {
            if ($(this).is(":checked") == true) {
                var col_1 = JSON.stringify(myDatatable.row(i).data().index);
                var col_2 = JSON.stringify(myDatatable.row(i).data().groupname);
                var col_3 = JSON.stringify(myDatatable.row(i).data().assetname);
                $(".users_asset_list_table>tbody").append("<tr><td>" + col_1 + "</td><td>" + col_2 + "</td><td>" + col_3 + "</td></tr>");
            }
        });
    });
});

$(function () { //다음 버튼 클릭 시 체크된 리스트 모두 넘겨줘야 함
    $('#next').click(function () {
        var listArray = [];
        var myDatatable = $("#asset_list_table").DataTable();
        $('input:checkbox[name=user_checkbox]').each(function (i) {
            if ($(this).is(":checked") == true) {
                //console.log($(this).val());
                var json = JSON.stringify(myDatatable.row(i).data())
                listArray.push(json);
            }
        });
        $.ajax({
            type: "post",
            url: "/", //서버쪽에서 입력할 것
            datatype: "json", //서버로 부터 수신할 데이터 타입
            contentType: "application/json", //전송할 테이터 타입
            data: JSON.stringify(listArray),
            success: function () {
                console.log(data);
            },
            error: function () {
                console.log(error);
            }
        });
    });
});