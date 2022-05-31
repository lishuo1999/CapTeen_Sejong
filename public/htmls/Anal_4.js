$(document).ready(function(){
    $("#threatTable").hide(); //일단 table 숨기기 
    $('[data-toggle="tooltip"]').tooltip();
});

$(function(){
    $('#box1').on('click',function(){         
        
        //$.ajax({
        //    url:"https://jsonplaceholder.typicode.com/posts",
        //    type:"post",
        //    dataType:"json",
        //    data:({
        //        "category":"하드웨어" //선택한 카테고리 정보 서버로 전송
        //    }),
        //    success:function(data){
        //       console.log(data);
        //    }
        //})

        $.ajax({
            url:"https://jsonplaceholder.typicode.com/posts",
            type:"get",
            data:{"category":"4"}, //하드웨어
            dataType:"json",
            success:function(data){
                var html='';
                for(key in data){
                    html+='<tr>';
                    html+='<td>'+data[key].title+'</td>'; //이게 위협 명 
                    html+='<td><input id="input1" style="text-align:center" type="text"></input></td>';
                    html+='<td><input id="input2" style="text-align:center" type="text"></input></td>';
                    html+='<td><button type="button" id="save" onclick="change(this)">저장</button></td>';
                    html+='<td id="threatNum">'+data[key].id+'</td>'; //이게 위협 고유 번호, 숨겨짐 
                    html+='</tr>';
                }
                $("#dynamicTbody").empty();
                $("#dynamicTbody").append(html);
            }
        })

        $("#threatTable").fadeIn(1000);
    });

});

$(function(){
    $('#box2').on('click',function(){         
        
        //$.ajax({
        //    url:"https://jsonplaceholder.typicode.com/posts",
        //    type:"post",
        //    dataType:"json",
        //    data:({
        //        "category":"소프트웨어" //선택한 카테고리 정보 서버로 전송
        //    }),
        //    success:function(data){
        //       console.log(data);
        //    }
        //})

        $.ajax({
            url:"https://jsonplaceholder.typicode.com/posts",
            type:"get",
            data:{"category":"2"}, //소프트웨어
            dataType:"json",
            success:function(data){
                var html='';
                for(key in data){
                    html+='<tr>';
                    html+='<td>'+data[key].title+'</td>'; //이게 취약성 명 
                    html+='<td><input id="input1" style="text-align:center" type="text"></input></td>';
                    html+='<td><input id="input2" style="text-align:center" type="text"></input></td>';
                    html+='<td><button type="button" id="save" onclick="change(this)">저장</button></td>';
                    html+='<td id="threatNum">'+data[key].id+'</td>'; //이게 취약성 고유 번호, 숨겨짐 
                    html+='</tr>';
                }
                $("#dynamicTbody").empty();
                $("#dynamicTbody").append(html);
            }
        })

        $("#threatTable").fadeIn(1000);
    });

});


$(function(){
    $('#box3').on('click',function(){         
        
        //$.ajax({
        //    url:"https://jsonplaceholder.typicode.com/posts",
        //    type:"post",
        //    dataType:"json",
        //    data:({
        //        "category":"전자정보" //선택한 카테고리 정보 서버로 전송
        //    }),
        //    success:function(data){
        //       console.log(data);
        //    }
        //})

        $.ajax({
            url:"https://jsonplaceholder.typicode.com/posts",
            type:"get",
            data:{"category":"1"}, //전자정보
            dataType:"json",
            success:function(data){
                var html='';
                for(key in data){
                    html+='<tr>';
                    html+='<td>'+data[key].title+'</td>'; //이게 취약성 명 
                    html+='<td><input id="input1" style="text-align:center" type="text"></input></td>';
                    html+='<td><input id="input2" style="text-align:center" type="text"></input></td>';
                    html+='<td><button type="button" id="save" onclick="change(this)">저장</button></td>';
                    html+='<td id="threatNum">'+data[key].id+'</td>'; //이게 취약성 고유 번호, 숨겨짐 
                    html+='</tr>';
                }
                $("#dynamicTbody").empty();
                $("#dynamicTbody").append(html);
            }
        })

        $("#threatTable").fadeIn(1000);
    });

});

$(function(){
    $('#box4').on('click',function(){         
        
        //$.ajax({
        //    url:"https://jsonplaceholder.typicode.com/posts",
        //    type:"post",
        //    dataType:"json",
        //    data:({
        //        "category":"인적" //선택한 카테고리 정보 서버로 전송
        //    }),
        //    success:function(data){
        //       console.log(data);
        //    }
        //})

        $.ajax({
            url:"https://jsonplaceholder.typicode.com/posts",
            type:"get",
            data:{"category":"3"}, //인적자원
            dataType:"json",
            success:function(data){
                var html='';
                for(key in data){
                    html+='<tr>';
                    html+='<td>'+data[key].title+'</td>'; //이게 취약성 명 
                    html+='<td><input id="input1" style="text-align:center" type="text"></input></td>';
                    html+='<td><input id="input2" style="text-align:center" type="text"></input></td>';
                    html+='<td><button type="button" id="save" onclick="change(this)">저장</button></td>';
                    html+='<td id="threatNum">'+data[key].id+'</td>'; //이게 취약성 고유 번호, 숨겨짐 
                    html+='</tr>';
                }
                $("#dynamicTbody").empty();
                $("#dynamicTbody").append(html);
            }
        })

        $("#threatTable").fadeIn(1000);
    });

});

function change(obj){ //select box 다른 옵션 클릭했을때

    //var index=obj.closest("tr").rowIndex;
    //console.log(index); //클릭한 애의 rowindex 가져오기

    var frequency=obj.closest("tr").childNodes[1].firstChild;
    frequency=frequency.value;
    var money=obj.closest("tr").childNodes[2].firstChild;
    money=money.value;
    var num=obj.closest("tr").childNodes[4].innerText;
    
    console.log(frequency);
    console.log(money);
    console.log(num);

   
    var obj={"frequency":frequency,"money":money,"num":num};

    $.ajax({
        type: 'POST',   //post방식으로 명시
        url : 'https://jsonplaceholder.typicode.com/comments',  //취약성 정보 보낼 서버 주소 
        dataType:'json',
        data:({
            obj
        }),
        success: function(data){   //데이터 주고받기 성공했을 경우 실행할 결과, data는 서버로부터 받은 데이터 
            //function(data)를 쓰게 되면 전달받은 데이터가 data안에 담아서 들어오게 된다. 
            console.log(data);
        },
        error:function(){   //데이터 주고받기가 실패했을 경우 실행할 결과
            console.log(error);
        }
    })
}
