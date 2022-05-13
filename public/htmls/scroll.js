var $html = $("html");
var page = 1;
var lastPage = $(".content").length; 
$html.animate({scrollTop:0},800);

$(document).ready(function(){

	if(window.scrollY<=window.innerHeight){
   		$(".moveTopBtn").hide();
		$(".header").hide();
	}//첫 페이지에서는 top버튼 숨기기

	$("#next").hide(); //일단 다음 버튼 숨기기 

});

window.addEventListener("wheel", function(e){
	e.preventDefault();
},{passive : false});

$(window).on("wheel", function(e){
 
	if($html.is(":animated")) return;


	if(e.originalEvent.deltaY > 0){ //아래로 스크롤

		if(window.scrollTop<window.innerHeight){
			$(".moveTopBtn").hide();
			$(".header").hide();
		 }
	
		else{
			$(".moveTopBtn").show().css({"position":"fixed"});
			$(".header").fadeIn(1500);
		}

		if(page== lastPage) return;
		page++;
	}

	else if(e.originalEvent.deltaY < 0){ //위로 스크롤 

		if(window.scrollY<window.innerHeight){
			$(".moveTopBtn").hide();
			$(".header").hide();
		 }
	
		else{
			$(".moveTopBtn").show().css({"position":"fixed"});
			$(".header").fadeIn(1500);
		}
		if(page == 1) return;
		page--;
	}
		
	//var posTop = (page-1) * $(window).height();
	var posTop=(page-1)*window.innerHeight;
	$html.animate({scrollTop : posTop},800);
});


// next button _ Anal1
$(function(){
	$('.select .sel').click(function(){
		$("#next").fadeIn(1000);
	});

	$('#input3').click(function(){
		$("#next").fadeIn(1000);
	})
});

