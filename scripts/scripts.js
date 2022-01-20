// JavaScript Document
for(i=1;i<=3;i++){
    var e = $("#main .swiper-container .swiper-wrapper .slide"+i+" .mainobject .maintext").css("color")
    console.log(e)
    $("#main .swiper-container .slide"+i+" .mainobject a").css("border","solid 0.5px "+e)
}


$(".menu").mouseover(menudown);
$(".menu").mouseout(menuup);

function menudown(){
    $(".submenu").stop().slideDown();
}
function menuup(){
    $(".submenu").stop().slideUp();
    
}
var a1;
var a2;
$(".menu").mouseover(function(){

    $("#horizental_underline").css("display","block");
    $("#vertical_underline").show();

    
    })
$(".menu>li a").mouseover(function(){
    a1=$(this).children("a").width()+20
    
    $("#horizental_underline").width(a1+"px")
})
$(".menu>li").mouseover(function(){
    let a1=$(this).children("a").width()+20
        $("#horizental_underline").css("display","block");
     $("#horizental_underline").offset({left:$(this).children("a").offset().left-10,top:$(this).offset().top+50}) 

        $("#horizental_underline").width(a1+"px")
})
$(".menu>li span").mouseover(function(){
    $("#vertical_underline").show();
    $("#horizental_underline").css("display","block");
    $(".submenu").stop().slideDown();
    return false;
})
$(".menu").mouseout(function(){
    $("#horizental_underline").hide();
    $("#vertical_underline").hide();
    })

$(".submenu li").mouseover(function(){
    $("#vertical_underline").show();
   a2=$(this).children("a").width()+20 
    $("#vertical_underline").offset({left:$(this).children("a").offset().left-10,top:$(this).offset().top+40})
    $("#vertical_underline").width(a2+"px")
})
var product_info_value=0; ///신제품 자동선택
var product_info_totalvalue = 3;///카테고리 갯수
var info_index=1;
var move = 0;
$(".product_info i").click(function(){
	info_index = $(this).index()+1
	$(this).addClass("on");
	$(this).siblings("i").removeClass("on")
	$(".product_info_index li:nth-of-type("+info_index+") ul").show().css("z-index",1);
	$(".product_info_index li:nth-of-type("+info_index+") ").siblings().children("ul").hide().css("z-index",0);
	for(i=0;i<=product_info_totalvalue-1;i++){
		if($(this).index()==i){
		product_info_value=i;////0이면 신제품
		move = i
		}
	}
	console.log(product_info_value);
});
var product_info_product_totalvalue=4 //쓸 이미지 수

const copy1 = $(".product_info_index li:nth-of-type(1) .product_info_product li");///
const copy2 = $(".product_info_index li:nth-of-type(2) .product_info_product li");
const copy3 = $(".product_info_index li:nth-of-type(3) .product_info_product li");
var imgsort;
var imgName;

for(e=1;e<=product_info_totalvalue;e++){
	switch(e){
		case 1 :
			imgsort = "new";
			break;
		case 2 :
			imgsort = "premium";
			break;
		case 3 :
			imgsort = "drink";
			break;
	}
	for(i=2;i<=product_info_product_totalvalue;i++){
		imgName = 'img/product_'+imgsort+i+'.png'
		imgalt = imgsort+i
		$(eval("copy"+e)).clone().appendTo(".product_info_index li:nth-of-type("+e+") .product_info_product");
		$(".product_info_index li:nth-of-type("+e+") .product_info_product li:last-of-type img").attr("src",imgName);
		$(".product_info_index li:nth-of-type("+e+") .product_info_product li:last-of-type img").attr("alt",imgName);
	}
	
}

const copy1_1 = $(".product_info_index li:nth-of-type(1) .product_info_product li");
const copy2_1 = $(".product_info_index li:nth-of-type(2) .product_info_product li");
const copy3_1 = $(".product_info_index li:nth-of-type(3) .product_info_product li");

for(i=1;i<=product_info_totalvalue;i++){
	$(eval("copy"+i+"_1")).clone().appendTo(".product_info_index li:nth-of-type("+i+") .product_info_product");
	$(eval("copy"+i+"_1")).clone().appendTo(".product_info_index li:nth-of-type("+i+") .product_info_product");
}
var index = [0,0,0];
var click = true;

$(".product_info .arrow.prev").click(function(){
	arrow(1);
});
$(".product_info .arrow.next").click(function(){
	arrow(-1);
});
//////ul의 가로넓이/li의 가로넓이
function arrow(e){
            if(click==true){
                click=false;
				console.log("무브는"+move);
                index[move] += e;
				console.log("인덱스는"+index);
                $(".product_info_index li:nth-of-type("+(move+1)+") ul").css({"left":-1200 +( index[move] * -300) + "px","transition":"0.4s"});
                if(index[move] == 4){
                    index[move] = 0;
                    setTimeout(function(){
                        $(".product_info_index li:nth-of-type("+(move+1)+") ul").css({"left":-1200 + (index[move] * -300) + "px","transition":"0s"});
                    }, 400);
                }else if (index[move] == -4){
                    index[move] = 0;
                    setTimeout(function(){
                        $(".product_info_index li:nth-of-type("+(move+1)+") ul").css({"left":-1200 + ((index[move]) * -300) + "px","transition":"0s"});
                    }, 400);
                }
                setTimeout(function(){click=true},410)
            }
		}
$(".product_info_index>li ul").draggable({
            
			axis : "x",
			stop: function(event,ui){	// ui.position.left : .slidelist 클래스 left 위치값
				if(ui.position.left + 50 < -1200 + (index[move] * -300)){	// 우측 50px이상 드래그되면 이벤트 실행
					arrow(1);
					//$(this).animate({left: -1200 + (index * -300)},400,'linear');
				} else if(ui.position.left - 50 > -1200 + (index[move] * -300)){	// 좌측 50px이상 드래그되면 이벤트 실행
					arrow(-1);
					//$(this).animate({left: -1200 + (index * -300)},400,'linear');
				} else {
					$(".product_info_index li:nth-of-type("+(move+1)+") ul").animate({left: -1200 + (index[move] * -300)},40,'linear');
				}
			},
			drag : function(event,ui){
				if(ui.position.left <= -1500 + (index[move] * -300)){
					ui.position.left = -1500 + (index[move] * -300);
				}
				if(ui.position.left >= -900 + (index[move] * -300)){
					ui.position.left = -900 + (index[move] * -300);
				}
			}
		})
/*function arrow(e){
            if(click==true){
                click=false;
                var a = $(".product_info_index li").width()/4
				console.log("무브는"+move);
				console.log(a);
                index[move] += e;
				console.log("인덱스는"+index);
                $(".product_info_index li:nth-of-type("+(move+1)+") ul").css({"left":-1200 +( index[move] * -300) + "px","transition":"0.4s"});
                if(index[move] == 4){
                    index[move] = 0;
                    setTimeout(function(){
                        $(".product_info_index li:nth-of-type("+(move+1)+") ul").css({"left":-1200 + (index[move] * -300) + "px","transition":"0s"});
                    }, 400);
                }else if (index[move] == -4){
                    index[move] = 0;
                    setTimeout(function(){
                        $(".product_info_index li:nth-of-type("+(move+1)+") ul").css({"left":-1200 + ((index[move]) * -300) + "px","transition":"0s"});
                    }, 400);
                }
                setTimeout(function(){click=true},410)
            }
		}
*/



