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
                url: 'https://jsonplaceholder.typicode.com/posts', //서버에서 입력할 것
                dataSrc: '',
                dataType: 'json',
            },
            columns: [
                /*{ data: "index", width: 60 }, //대분류
                { data: "groupname", width: 120 }, //자산그룹명
                { data: "assetname" },  //자산명*/
                { data: "userId", width: 60 }, //test
                { data: "id", width: 120 }, //test
                { data: "title" },  //test
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
            success: function (data) { //data: 서버로부터 받아온 json data 
                /*for (var i = 0; i < data.length; i++) {
                    $('#sel_2').append("<option value=" + obj[i].groupId + ">" + obj[i].groupname + "</option>"); //groupname: 자산그룹명, groupId: 해당 그룹명의 value값
                }*/
                $.each(data, function (index, item) { // 데이터 =item
                    $('#sel_2').append("<option value=" + item.groupId + ">" + item.groupname + "</option>"); //groupname: 자산그룹명, groupId: 해당 그룹명의 value값
                });
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
                /*var col_1 = JSON.stringify(myDatatable.row(i).data().index);
                var col_2 = JSON.stringify(myDatatable.row(i).data().groupname);
                var col_3 = JSON.stringify(myDatatable.row(i).data().assetname);*/
                var col_1 = JSON.stringify(myDatatable.row(i).data().userId); //test
                var col_2 = JSON.stringify(myDatatable.row(i).data().id); //test
                var col_3 = JSON.stringify(myDatatable.row(i).data().title); //test
                $(".users_asset_list_table>tbody").append("<tr><td style=" + "'width: 60px;text-align: center;'" + ">" + col_1 + "</td><td style=" + "'width: 90px;text-align: center;'" + ">" + col_2 + "</td><td style=" + "'width: 90px;text-align: center;'" + ">" + "test" +
                    "</td><td style=" + "'width: 90px;text-align: center;'" + "><div class='cia_div'><a class='cia'>CIA 산출</a></div></td><td style=" + "'width: 90px;text-align: center;'" + "><form><input type='checkbox' value='1'>상<input type='checkbox' value='2'>중<input type='checkbox' value='3'>하</form></td><td style=" + "'width: 70px;text-align: center;'" + "><span class='delete'>[삭제]</span></td></tr>"
                );
                $(".cia_div").click(function () {
                    $(".modal-wrapper").fadeIn();
                })
                $("#exit_btn").click(function () {
                    $(".modal-wrapper").fadeOut();
                })
            }
        });
        
    });
});
$(function() {
    $("#c_label").click(function () { //기밀성 지표 클릭
        if($("#c_cal").css("display") == "none") {
            $("#c_cal").fadeIn();
            $("#cia_save").fadeIn();
        }
        else {
            $("#c_cal").fadeOut();
            $("#cia_save").fadeOut();
        }
    })
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

$(function () {
    var sum = 0;
    $('input[type="checkbox"][name="cs_biz_form"]').click(function () {
        if ($(this).prop('checked')) {
            $(this).closest("tr").children('input[type="checkbox"][name="cs_biz_form"]').prop('checked', false);
            //$('input[type="checkbox"][name="cs_biz_form"]').prop('checked', false);
            $(this).prop('checked', true);
            var parent = $(this).closest("tr");
            var children = parent.children('#score');
            children.text($(this).val());
            sum += Number($(this).val());
        }
        else {
            sum -= Number($(this).val());
            var parent = $(this).closest("tr");
            var children = parent.children('#score');
            children.empty();
        }
    });
    
});