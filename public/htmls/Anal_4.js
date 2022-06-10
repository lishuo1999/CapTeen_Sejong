$(document).ready(function(){
    $("#threatTable").hide(); //일단 table 숨기기 
    $('[data-toggle="tooltip"]').tooltip();
});

$(function(){
    $('#box1').on('click',function(){         
    

        $.ajax({
            url:"/analysis/threat",
            type:"get",
            data:{"category":"4"}, //하드웨어
            dataType:"json",
            success:function(data){
                var html='';
                console.log(data)
                var check=data.name_threats
                if(check=="NO DATA"){
                    html+='<tr>';
                    html+='<td>-</td>';//자산명
                    html+='<td>-</td>'; //이게 명 
                    html+='<td>-</td>';
                    html+='<td>-</td>';
                    html+='<td id="threatNum">""</td>'; //이게고유 번호, 숨겨짐 
                    html+='</tr>';
                }
                else{
                    for(key in data){
                        html+='<tr>';
                        html+='<td>'+data[key].name_assets+'</td>'; //자산명
                        html+='<td>'+data[key].name_threats+'</td>'; //이게 위협 명 
                        html+='<td><input id="input1" style="text-align:center" type="text"></input></td>';
                        html+='<td><input id="input2" style="text-align:center" type="text"></input></td>';
                        html+='<td id="threatNum">'+data[key].id_threats+'</td>'; //이게 위협 고유 번호, 숨겨짐 
                        html+='</tr>';
                    }
                    html+='<tr><td colspan="4"><button type="button" id="save">저장</td></tr>' // 테이블 맨 아랫줄에 저장 버튼 
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

        $.ajax({
            url:"/analysis/threat",
            type:"get",
            data:{"category":"2"}, //소프트웨어
            dataType:"json",
            success:function(data){
                var html='';
                console.log(data)
                var check=data.name_threats
                if(check=="NO DATA"){
                    html+='<tr>';
                    html+='<td>-</td>';//자산명
                    html+='<td>-</td>'; //이게 취약성 명 
                    html+='<td>-</td>';
                    html+='<td>-</td>';
                    html+='<td id="threatNum">""</td>'; //이게 취약성 고유 번호, 숨겨짐 
                    html+='</tr>';
                }
                else{
                    for(key in data){
                        html+='<tr>';
                        html+='<td>'+data[key].name_assets+'</td>'; //자산명
                        html+='<td>'+data[key].name_threats+'</td>'; //이게 취약성 명 
                        html+='<td><input id="input1" style="text-align:center" type="text"></input></td>';
                        html+='<td><input id="input2" style="text-align:center" type="text"></input></td>';
                        html+='<td id="threatNum">'+data[key].id_threats+'</td>'; //이게 취약성 고유 번호, 숨겨짐 
                        html+='</tr>';
                    }
                    html+='<tr><td colspan="4"><button type="button" id="save">저장</td></tr>' // 테이블 맨 아랫줄에 저장 버튼 
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
        

        $.ajax({
            url:"/analysis/threat",
            type:"get",
            data:{"category":"1"}, //전자정보
            dataType:"json",
            success:function(data){
                var html='';
                console.log(data)
                var check=data.name_threats
                if(check=="NO DATA"){
                    html+='<tr>';
                    html+='<td>-</td>';//자산명
                    html+='<td>-</td>'; //이게 취약성 명 
                    html+='<td>-</td>';
                    html+='<td>-</td>';
                    html+='<td id="threatNum">""</td>'; //이게 취약성 고유 번호, 숨겨짐 
                    html+='</tr>';
                }else{
                    for(key in data){
                        html+='<tr>';
                        html+='<td>'+data[key].name_assets+'</td>'; //자산명
                        html+='<td>'+data[key].name_threats+'</td>'; //이게 취약성 명 
                        html+='<td><input id="input1" style="text-align:center" type="text"></input></td>';
                        html+='<td><input id="input2" style="text-align:center" type="text"></input></td>';
                        html+='<td id="threatNum">'+data[key].id_threats+'</td>'; //이게 취약성 고유 번호, 숨겨짐 
                        html+='</tr>';
                    }
                    html+='<tr><td colspan="4"><button type="button" id="save">저장</td></tr>' // 테이블 맨 아랫줄에 저장 버튼 
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
        
        $.ajax({
            url:"/analysis/threat",
            type:"get",
            data:{"category":"3"}, //인적자원
            dataType:"json",
            success:function(data){
                var html='';
                console.log(data);
                var check=data.name_threats
                if(check=="NO DATA"){
                    html+='<tr>';
                    html+='<td>-</td>';//자산명
                    html+='<td>-</td>'; //이게 위협 명 
                    html+='<td>-</td>';
                    html+='<td>-</td>';
                    html+='<td id="threatNum">""</td>'; //이게 위협 고유 번호, 숨겨짐 
                    html+='</tr>';
                }
                else{
                    for(key in data){
                        html+='<tr>';
                        html+='<td>'+data[key].name_assets+'</td>'; //자산명
                        html+='<td>'+data[key].name_threats+'</td>'; //이게 위협명 
                        html+='<td><input id="input1" style="text-align:center" type="text"></input></td>';
                        html+='<td><input id="input2" style="text-align:center" type="text"></input></td>';
                        html+='<td id="threatNum">'+data[key].id_threats+'</td>'; //이게 위협 고유 번호, 숨겨짐 
                        html+='</tr>';
                    }
                    html+='<tr><td colspan="4"><button type="button" id="save">저장</td></tr>' // 테이블 맨 아랫줄에 저장 버튼 
                }

                $("#dynamicTbody").empty();
                $("#dynamicTbody").append(html);
            }
        })

        $("#threatTable").fadeIn(1000);
    });

});


$(document).off("click").on("click","#save",function(){ //지금까지 입력한 값들 모두 받아야함
    var close=$(this).closest("tr")
    console.log("가장 가까운 아이: ",close)
    
    var table=close.parent() // (상위)테이블을 찾아가기
    console.log("parent: ",table);
    var size=$('#threatList>tbody tr').length //rows 수
    console.log("표의 크기: ",size)
    
    var json='['

    $('#threatList>tbody tr').each(function(index){
        var tr=$(this)
        //console.log("인덱스:",index)
        if(index==size-1)
            return false;
        var td=tr.children();
        var freq=td.find('#input1').val();
        var money=td.find('#input2').val(); 
        var num=td.eq(4).text(); // 숨겨진 위협 번호 
        console.log("빈도:",freq);
        console.log("돈:",money);
        console.log("숫자:",num);
        console.log(index);
        json+='{"frequency":'+freq+',"money":'+money+',"num":'+num+'},'
        //json+='{"frequency":1,"money":2,"num":3},'
    }) //each 문 
    json=json.slice(0,-1)
    json+=']'
    console.log(json)
    console.log(JSON.parse(json))
 


    $.ajax({
        type: 'POST',   //post방식으로 명시
        url : '/analysis/save_threat',  //취약성 정보 보낼 서버 주소 
        dataType:'json',
        data:{data:json},
        success: function(data){   //데이터 주고받기 성공했을 경우 실행할 결과, data는 서버로부터 받은 데이터 
            //function(data)를 쓰게 되면 전달받은 데이터가 data안에 담아서 들어오게 된다. 
            console.log(JSON.parse(data));
        },
        error:function(){   //데이터 주고받기가 실패했을 경우 실행할 결과
            console.log(error);
        }
    })

})

/*function change(obj){ 
    //var index=obj.closest("tr").rowIndex;
    //console.log(index); //클릭한 애의 rowindex 가져오기

    var frequency=obj.closest("tr").childNodes[2].firstChild;
    frequency=frequency.value;
    var money=obj.closest("tr").childNodes[3].firstChild;
    money=money.value;
    var num=obj.closest("tr").childNodes[5].innerText;
    
    console.log(frequency);//발생가능성
    console.log(money);//영향정도
    console.log(num);

   
    var obj=({"frequency":frequency,"money":money,"num":num});

/*    $.ajax({
        type: 'POST',   //post방식으로 명시
        url : '/analysis/save_threat',  //취약성 정보 보낼 서버 주소 
        dataType:'json',
        data:obj,
        success: function(data){   //데이터 주고받기 성공했을 경우 실행할 결과, data는 서버로부터 받은 데이터 
            //function(data)를 쓰게 되면 전달받은 데이터가 data안에 담아서 들어오게 된다. 
            console.log(data);
        },
        error:function(){   //데이터 주고받기가 실패했을 경우 실행할 결과
            console.log(error);
        }
    })*
}*/
