window.onload = function () {
    $("#asset_list_table").hide();
}
$(function () { //자산분류 선택 시 -> 해당 자산그룹명 리스트를 select 태그에 데이터 가져오기
    $('#sel_1').change(function (event) {
        var data_send = $(this).val();
        $.ajax({
            type: "get",
            url: "/analysis/asset_big", //서버에서 입력할 것
            datatype: "json",
            contentType: "application/json",
            data: {
                "id_big_assets": data_send //대분류
            },
            success: function (data) { //data: 서버로부터 받아온 json data 
                $('#sel_2').empty();
                $('#sel_2').append("<option value='0' selected>-선택-</option>");
                for (var i = 0; i < data.length; i++) {
                    $('#sel_2').append("<option value='" + data[i].id_m_cat_ass + "'>" + data[i].name_m_cat_ass + "</option>"); //groupname: 자산그룹명, groupId: 해당 그룹명의 value값
                }
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
        var id_big = $('#sel_1 option:selected').val();
        var id_mid = $('#sel_2 option:selected').val();
        $.ajax({ //서버 측에서 자산 리스트 가져오기
            type: "get",
            url: "/analysis/asset_big_mid", //서버에서 입력할 것
            datatype: "json",
            contentType: "application/json",
            data: { //보내는 데이터
                "id_big_assets": id_big,//자산 대분류 id
                "id_mid_assets": id_mid//자산 중분류 id
            },
            success: function (data) { //data: 서버로부터 받아온 json data
                for (var i = 0; i < data.length; i++) {
                    $('#asset_list_table>tbody').append("<tr><td id='big_name' value=''style=" + "'width: 60px;text-align: center;'" + ">" + data[i].name_b_cat_ass + "</td><td id='groupname' style=" + "'width: 90px;text-align: center;'" + ">" + data[i].name_m_cat_ass + "</td><td id='name_assets' value = '" + id_big + "' style=" + "'width: 90px;text-align: center;'" + ">" + data[i].name_assets +
                        "</td><td style=" + "'width: 90px;text-align: center;'" + "><input type='checkbox' value='" + data[i].id_assets + "' name='user_checkbox' style='width: 100px' checked></td></tr>");
                }
            },
            error: function () {
                console.log(error);
            }
        });
    });
});
var data = [];
var C, I, A;
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
            C = sum / 14;
            C = Math.round(C);
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
            I = sum / 13;
            I = Math.round(I);
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
            A = sum / 13;
            A = Math.round(A);
            alert("가용성 평균점수는 " + A + " 입니다.");
            sum = Number(0);
        }
        else { //취소 버튼 클릭 시

        }
    });
});
$(function () { //담기 버튼 클릭 시
    $('#collect').click(function () {
        $('input:checkbox[name=user_checkbox]').each(function (i) {
            if ($(this).is(":checked") == true) { //보유 자산 리스트 출력sss
                var parent = $(this).closest("tr");
                var col_1 = parent.children('#name_assets').text();
                var send_1 = $(this).val();//자산id
                var send_2 = parent.children('#name_assets').attr("value");//자산 대분류 id
                $(".users_asset_list_table>tbody").append("<tr><td id='send_last' name = '" + send_2 + "' value = '" + send_1 + "' style=" + "'width: 90px;text-align: center;'" + ">" + col_1 +
                    "</td><td style=" + "'width: 90px;text-align: center;'" + "><div class='cia_div' value='" + i + "'><a class='cia'>CIA 산출</a></div></td><td style=" + "'width: 90px;text-align: center;'" + "><form class='send' value='" + i + "'>상<input type='radio' name='b' value='3'>중<input type='radio' name='b' value='2'>하<input type='radio' name='b' value='1'></form></td><td style=" + "'width: 90px;text-align: center;'" + "><form class='send_val' value='" + i + "'>예<input type='radio' name='a' value='1'>아니요<input type='radio' name='a' value='0'><form></td><td style=" + "'width: 70px;text-align: center;'" + "><button class='save_ass_list' value='" + i + "'>저장</button></td></tr>"
                );
            }
        })
        $('.cia_div').each(function (i, item) {
            $('div[class="cia_div"][value="' + i + '"]').click(function () { //CIA 산출 클릭 시
                C = 0;
                I = 0;
                A = 0;
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
        $('.save_ass_list').each(function (i, item) {
            $('button[class="save_ass_list"][value="' + i + '"]').click(function () {  //리스트에서 저장버튼 클릭 시
                var X_par = $('form[class="send"][value="' + i + '"]');
                var X_child = X_par.find('input[name="b"]:checked').attr("value");
                var grade = (Number(C) + Number(I) + Number(A) + Number(X_child)) / 4
                grade = Math.round(grade); //자산 가치 등급

                var X_par_val = $('form[class="send_val"][value="' + i + '"]');
                var X_child_val = X_par_val.find('input[name="a"]:checked').attr("value"); //핵심자산
                var send_val1 = $('#send_last').attr("value");//자산id
                var send_val2 = $('#send_last').attr("name");//자산 대분류 id

                var data = ({
                    "assets_id": send_val1, //자산id
                    "big_assets_id": send_val2, //자산 대분류 id
                    "usr_assets_imp": X_child_val, //핵심자산
                    "usr_assets_rate": grade //자산 가치 등급
                });
                data = JSON.stringify(data);
                //alert(data);
                $.ajax({
                    type: "post",
                    url: "/analysis/save_ass", //서버에서 입력할 것
                    datatype: "json",
                    contentType: "application/json",
                    data: data,
                    success: function (data) { //data: 서버로부터 받아온 json data 
                        console.log('success');
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });

            });

        });
    });
});

/*$(function () { //다음 클릭 시 모든 데이터 리스트 POST
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
});*/