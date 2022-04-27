$(function () {
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
      $("input[name=id").focus();

      var data = { //data = {"id":"사용자 아이디","pw":"사용자 비밀번호"}
         "id": $id.val(),
         "pw": $pw.val()
      }

      fetch(getContextPath() + "/servers", { //""에 url 입력
         method: "post",
         headers: {
            "Content-Type": "application/json", //보내는 데이터가 json이라는 걸 알려줌
         },
         body: JSON.stringfy(data),  //json을 string으로 변환해서 body에 넣어 보냄
      });
   });
});