$(function () {
   $('#id_ident').click(function () {
      if ($('#id').val() != '') {
         // 아이디를 서버로 전송 > DB 유효성 검사 > 결과 반환받기
         $.ajax({
            type: 'GET',
            url: '/',
            data: {
               "id": $('#id').val()
            },
            dataType: 'json',
            contentType: "application/json",
            success: function (result) {
               if (result == '0') { //0이면 아이디 존재x
                  $('#result').css("color","green").text('사용 가능한 아이디입니다.');
                  $('#int-area_id').css("margin-bottom", "5px");
                  //alert('사용 가능한 아이디입니다.');
               } else { //1이면 아이디 이미 존재
                  $('#result').css("color","red").text('이미 사용중인 아이디입니다.');
                  $('#int-area_id').css("margin-bottom", "5px");
                  //alert('이미 사용중인 아이디입니다.');
               }
            },
            error: function (error) {
               console.log(error);
            }
         });

      } else {
         alert('아이디를 입력하세요.');
         $('#id').focus();
      }
   })

   $('#join').on("submit", function (event) {
      var $id = $(this).find("[name=id]");
      var $pw = $(this).find("[name=pw]");
      var $pw_c = $(this).find("[name=pw_c]");
      var $pn = $(this).find("[name=pn]");
      var $em = $(this).find("[name=em]");
      var $pwCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,16}$/;// 비밀번호에 숫자 특수문자 영어로 유효성 검사  비밀번호의 수는 6~12
      var $pnCheck = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;
      var $emCheck = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

      if ($id.val().length <= 4) { //아이디 길이 검사
         alert("다시 입력");
         event.focus().select();
         event.preventDefault();
         return;
      }
      if (!$pwCheck.test($pw.val())) { //비밀번호 형식 검사
         alert("비밀번호는 영어,숫자,특수문자 조합으로 해주세요.(글자수는 6~12)")
         $pw.focus();
         event.preventDefault();
         return;
      }
      if ($pw.val() != $pw_c.val()) { //비밀번호 재입력 검사
         alert("비밀번호가 일치하지 않습니다")
         $pw_c.focus();
         event.preventDefault();
         return;
      }
      if (!$pnCheck.test($pn.val())) { //전화번호 형식 검사
         alert("전화번호 형식에 맞지 않습니다 ");
         $pn.focus();
         event.preventDefault();
         return;
      }
      if (!$emCheck.test($em.val())) {
         alert("이메일 형식에 맞지 않습니다 ");
         $em.focus();
         event.preventDefault();
         return;
      }

      $.ajax({ //서버로 id, pw 보냄
         type: "post",
         url: "/join", //서버url -> 서버쪽에서 입력할 것
         datatype: "json", //서버로 부터 수신할 데이터 타입
         contentType: "application/json", //전송할 테이터 타입
         success: function (data) {
            console.log(data);
         },
         error: function () {
            console.log(error);
         }
      });

   });

   
});