// data 전송
$(function(){
	$('#next').on('click',function(){            

        value=$("input[name=business]:checked").val(); //value값 가져오기
        console.log(value);

        $.ajax({
            type: 'POST',   //post방식으로 명시
            url : 'https://rrymupe.request.dreamhack.games',  //서버 주소 
            dataType:'json',
            data:({
                "value":value
            }),
            success: function(data){   //데이터 주고받기 성공했을 경우 실행할 결과, data는 서버로부터 받은 데이터 
                //function(data)를 쓰게 되면 전달받은 데이터가 data안에 담아서 들어오게 된다. 
                console.log(data);
            },
            error:function(){   //데이터 주고받기가 실패했을 경우 실행할 결과
                console.log(error);
            }
        })

    }); 
});
// 다음 버튼 누르면 데이터 전송 
