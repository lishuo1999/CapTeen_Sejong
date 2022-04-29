//data 전송
$(function(){
	$('#next').on('click',function(){            
        
        value1=$("#input1").val(); //value값 가져오기
        if(value1.trim()==''){
            alert('모든 항목을 입력하세요');
            location.href='./Proc_1.html'
            return;
        }
        console.log(value1);

        value2=$("#input2").val(); //value값 가져오기
        if(value2.trim()==''){
            alert('모든 항목을 입력하세요');
            location.href='./Proc_1.html'
            return;
        }
        console.log(value2);

        value3=$("#input3").val(); //value값 가져오기
        if(value3.trim()==''){
            alert('모든 항목을 입력하세요');
            location.href='./Proc_1.html'
            return;
        }
        console.log(value3);
    
        $.ajax({
            type: 'post',   //get방식으로 명시
            url : 'https://iangvxk.request.dreamhack.games',  //이동할 jsp 파일 주소
            dataType:'json',   //문자형식으로 받기
        
            data:{'income':value1,'security':value2,'others':value3},
            success: function(data){   //데이터 주고받기 성공했을 경우 실행할 결과
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