window.onload = function () {
    $("#asset_list_table").hide();
}
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
                "index": $data_send //대분류
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
$(function () { //조회 버튼 클릭 시
    $('#search_button').click(function () {
        $("#asset_list_table").show();
        $.ajax({ //서버 측에서 자산 리스트 가져오기
            type: "get",
            url: "https://jsonplaceholder.typicode.com/posts", //서버에서 입력할 것
            datatype: "json",
            contentType: "application/json",
            data: { //보내는 데이터
                //자산 대분류
                //자산 그룹명
            },
            success: function (data) { //data: 서버로부터 받아온 json data
                /*$.each(data, function (index, item) { // 데이터 =item
                    $('#asset_list_table>tbody').append("<tr><td id='index' style=" + "'width: 60px;text-align: center;'" + ">" + item.index + "</td><td id='groupname' style=" + "'width: 90px;text-align: center;'" + ">" + item.groupname + "</td><td id='name_assets' style=" + "'width: 90px;text-align: center;'" + ">" + item.name_assets +
                        "</td><td style=" + "'width: 90px;text-align: center;'" + "><input type='checkbox' value='"+ item.id_assets +"' name='user_checkbox' style='width: 100px' checked></td></tr>");
                });*/
                $.each(data, function (index, item) { // 데이터 =item
                    $('#asset_list_table>tbody').append("<tr><td id='userId' style=" + "'width: 60px;text-align: center;'" + ">" + item.userId + "</td><td id='id' style=" + "'width: 90px;text-align: center;'" + ">" + item.id + "</td><td id='title' style=" + "'width: 90px;text-align: center;'" + ">" + item.title +
                        "</td><td style=" + "'width: 90px;text-align: center;'" + "><input type='checkbox' value='"+ item.userId +"' name='user_checkbox' style='width: 100px' checked></td></tr>");
                });
            },
            error: function () {
                console.log(error);
            }
        });
    });
});
var data = [];
var C, I, A;
$(function () { //담기 버튼 클릭 시
    $('#collect').click(function () {
        $('input:checkbox[name=user_checkbox]').each(function (i) {
            if ($(this).is(":checked") == true) { //보유 자산 리스트 출력
                //var parent = $(this).closest("tr");
                //var col_1 = parent.children('#index').text();
                //var col_2 = parent.children('#groupname').text();
                //var col_3 = parent.children('#name_assets').text();
                var parent = $(this).closest("tr");
                var col_1 = parent.children('#userId').text();
                var col_2 = parent.children('#id').text();
                var col_3 = parent.children('#title').text();
                $(".users_asset_list_table>tbody").append("<tr><td style=" + "'width: 60px;text-align: center;'" + ">" + col_1 + "</td><td style=" + "'width: 90px;text-align: center;'" + ">" + col_2 + "</td><td style=" + "'width: 90px;text-align: center;'" + ">" + "test" +
                    "</td><td style=" + "'width: 90px;text-align: center;'" + "><div class='cia_div' value='" + i + "'><a class='cia'>CIA 산출</a></div></td><td style=" + "'width: 90px;text-align: center;'" + "><form>상<input type='checkbox' value='1'>중<input type='checkbox' value='2'>하<input type='checkbox' value='3'></form></td><td style=" + "'width: 70px;text-align: center;'" + "><span class='delete'>[삭제]</span></td></tr>"
                );
                /*$(".users_asset_list_table>tbody").append("<tr><td style=" + "'width: 60px;text-align: center;'" + ">" + col_1 + "</td><td style=" + "'width: 90px;text-align: center;'" + ">" + col_2 + "</td><td value='"+ $(this).value() +"' style=" + "'width: 90px;text-align: center;'" + ">" + "test" +
                    "</td><td style=" + "'width: 90px;text-align: center;'" + "><div class='cia_div' value='" + i + "'><a class='cia'>CIA 산출</a></div></td><td style=" + "'width: 90px;text-align: center;'" + "><form>상<input type='checkbox' value='1'>중<input type='checkbox' value='2'>하<input type='checkbox' value='3'></form></td><td style=" + "'width: 70px;text-align: center;'" + "><span class='delete'>[삭제]</span></td></tr>"
                );*/
            }
        });

        $('.cia_div').each(function (i, item) {
            $('div[class="cia_div"][value="' + i + '"]').click(function () { //CIA 산출 클릭 시
                $(".modal-wrapper").show()
                $('#exit_btn').attr('value', i);
                $('img[id="exit_btn"][value="' + i + '"]').click(function () { //취소 버튼 클릭 시
                    $(".modal-wrapper").hide();
                    $('div[class="cia_div"][value="' + i + '"]').html("<a class='cia'>완료</a>");
                    $('div[class="cia_div"][value="' + i + '"]').attr('value', -1);
                    $('input[type="checkbox"][name="c_form"]').prop("checked", false);
                    $('input[type="checkbox"][name="i_form"]').prop("checked", false);
                    $('input[type="checkbox"][name="a_form"]').prop("checked", false);
                    $('.score').empty();
                    $("#c_cal").hide();
                    $("#c_save").hide();
                    $("#i_cal").hide();
                    $("#i_save").hide();
                    $("#a_cal").hide();
                    $("#a_save").hide();
                    $("#c_label").css("color", "black");
                    $("#i_label").css("color", "black");
                    $("#a_label").css("color", "black");
                })
            })
        });
    });
});
$(function () {
    $("#c_label").click(function () { //기밀성 지표 클릭
        $("#c_label").css("color", "#ED7D31");
        $("#i_label").css("color", "black");
        $("#a_label").css("color", "black");
        if ($("#i_cal").is($('#i_cal').show()) || $("#a_cal").is($('#a_cal').show())) {
            $("#i_cal").hide();
            $("#i_save").hide();
            $("#a_cal").hide();
            $("#a_save").hide();
            $("#c_cal").show();
            $("#c_save").show();
        }
    });
});
$(function () {
    var sum = 0;
    $('input[type="checkbox"][name="c_form"]').click(function () {
        if ($(this).prop('checked')) {
            $(this).closest("tr").children('input[type="checkbox"][name="cs_biz_form"]').prop('checked', false);
            //$('input[type="checkbox"][name="cs_biz_form"]').prop('checked', false);
            $(this).prop('checked', true);
            var parent = $(this).closest("tr");
            var children = parent.children('.score');
            children.text($(this).val());
            sum += Number($(this).val());
        }
        else {
            sum -= Number($(this).val());
            var parent = $(this).closest("tr");
            var children = parent.children('.score');
            children.empty();
        }
    });
    $('#c_save').click(function () {
        if (confirm("저장하시겠습니까?")) { //확인 버튼 클릭 시
            C = parseInt(sum / 14);
            alert("기밀성 평균점수는 " + C + " 입니다.");
            sum = Number(0);
        }
        else { //취소 버튼 클릭 시

        }
    });
});
$(function () {
    $("#i_label").click(function () { //무결성 지표 클릭
        $("#c_label").css("color", "black");
        $("#i_label").css("color", "#ED7D31");
        $("#a_label").css("color", "black");
        if ($("#c_cal").is($('#c_cal').show()) || $("#a_cal").is($('#a_cal').show())) {
            $("#c_cal").hide();
            $("#c_save").hide();
            $("#a_cal").hide();
            $("#a_save").hide();
            $("#i_cal").show();
            $("#i_save").show();
        }
    })
});
$(function () {
    var sum = 0;
    $('input[type="checkbox"][name="i_form"]').click(function () {
        if ($(this).prop('checked')) {
            $(this).closest("tr").children('input[type="checkbox"][name="cs_biz_form"]').prop('checked', false);
            //$('input[type="checkbox"][name="cs_biz_form"]').prop('checked', false);
            $(this).prop('checked', true);
            var parent = $(this).closest("tr");
            var children = parent.children('.score');
            children.text($(this).val());
            sum += Number($(this).val());
        }
        else {
            sum -= Number($(this).val());
            var parent = $(this).closest("tr");
            var children = parent.children('.score');
            children.empty();
        }
    });
    $('#i_save').click(function () {
        if (confirm("저장하시겠습니까?")) { //확인 버튼 클릭 시
            I = parseInt(sum / 13);
            alert("무결성 평균점수는 " + I + " 입니다.");
            sum = Number(0);
        }
        else { //취소 버튼 클릭 시

        }
    });
});
$(function () {
    $("#a_label").click(function () { //가용성 지표 클릭
        $("#c_label").css("color", "black");
        $("#i_label").css("color", "black");
        $("#a_label").css("color", "#ED7D31");
        if ($("#c_cal").is($('#c_cal').show()) || $("#i_cal").is($('#i_cal').show())) {
            $("#i_cal").hide();
            $("#i_save").hide();
            $("#c_cal").hide();
            $("#c_save").hide();
            $("#a_cal").show();
            $("#a_save").show();
        }
    })
});
$(function () {
    var sum = 0;
    $('input[type="checkbox"][name="a_form"]').click(function () {
        if ($(this).prop('checked')) {
            $(this).closest("tr").children('input[type="checkbox"][name="cs_biz_form"]').prop('checked', false);
            //$('input[type="checkbox"][name="cs_biz_form"]').prop('checked', false);
            $(this).prop('checked', true);
            var parent = $(this).closest("tr");
            var children = parent.children('.score');
            children.text($(this).val());
            sum += Number($(this).val());
        }
        else {
            sum -= Number($(this).val());
            var parent = $(this).closest("tr");
            var children = parent.children('.score');
            children.empty();
        }
    });
    $('#a_save').click(function () {
        if (confirm("저장하시겠습니까?")) { //확인 버튼 클릭 시
            A = parseInt(sum / 13);
            alert("가용성 평균점수는 " + A + " 입니다.");
            sum = Number(0);
        }
        else { //취소 버튼 클릭 시

        }
    });
});
$(function () { //다음 클릭 시 모든 데이터 리스트 POST
    $('#next').click(function () {
        $.ajax({
            type: "post",
            url: "/", //서버에서 입력할 것
            datatype: "json",
            contentType: "application/json",
            data: data,
            success: function (data) { //data: 서버로부터 받아온 json data 

            },
            error: function () {
                console.log(error);
            }
        });
    });
});