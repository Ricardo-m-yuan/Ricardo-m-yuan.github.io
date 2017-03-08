$(function(){
	
	var arr = ["img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg","img/5.jpg","img/6.jpg","img/7.jpg","img/8.jpg","img/9.jpg"]
	$(".vr .play p").on("mouseenter",function(){
		$(".vr .play span").css("width","300px");
		$(this).css("color","black");
	})
	$(".vr .play p").on("mouseleave",function(){
		$(".vr .play span").css("width","0px");
		$(this).css("color","white");
	})
	$(".work .work_more .imgs div").each(function(i,ele){
		$(this).css("background","url("+arr[i]+")")
	})
	var html = $("html");
	//导航栏
	$(".tigger").eq(0).css("display","block").siblings().css("display","none");
	$(".nav_quit").eq(0).children().css("transform","translateZ(-25px) rotateX(-90deg)");
	$(".nav_quit").eq(0).find(".bg_red").css("background","red");
	$(".nav_quit").each(function(i,ele){
		$(this).on("click",function(){		
			$(".tigger").eq(i).css("display","block").siblings().css("display","none");
			$(this).children().css("transform","translateZ(-25px) rotateX(-90deg)");
			$(this).siblings().children().css("transform","translateZ(-25px) rotateX(0deg)");
			$(this).find(".bg_red").css("background","red");
			$(this).siblings().find(".bg_red").css("background","white");
		})
	})
	
	//轮播图；
	var att=[];
	var wheel = true;	
	$(".repeat-lis li").each(function(i,ele){
		$(this).css({
			left:i*400,
			top:0
		})
	})
	$(".repeat-imgs .repeat-lis li p").on("mouseenter",function(){
		$(this).siblings().stop().animate({
			top:-20
		},200);
	})
	$(".repeat-imgs .repeat-lis li p").on("mouseleave",function(){
		$(this).siblings().stop().animate({
			top:0
		},200);
	})	
	//鼠标拖拽
	var active = $("#move");
	active.css({
		left:active.parent().width()-active.width()
	})	
	$(".repeat-lis").stop().animate({
		left:-($(".repeat-lis").width()-$(".repeat-imgs").width())
	})
	var w = 0;
	active.on("mousedown",function(ev){
		var x = ev.pageX;
		var left = ev.pageX-$(this).position().left;
		$(document).on("mousemove",function(ev){
			w = ev.pageX - left;
			if(w<=0){
				w=0
			}			
			if(w>(active.parent().width()-active.width())){
				w = active.parent().width()-active.width();
			}			
			var inn = w/(active.parent().width()-active.width());
			var length = $(".repeat-lis").width()-$(".repeat-imgs").width();
			$(".repeat-lis").stop().animate({
				left:-length*inn
			},10)			
			active.stop().animate({
				left:w
			},10)
			return false;
		})
		$(document).on("mouseup",function(){
			$(document).off("mousemove");
		})
	})
	//滚轮移动；
	var fire;	
	$(".nav_quit").eq(1).on("click",function(){
		clearInterval(fire);		
		w = active.parent().width()-active.width();
		fire = setInterval(function(){
			fnup();
		},50)
		if(wheel){						
			addWheel($(document)[0],fnup,fndown);
		}		
		wheel = false;
	})
	$(".nav_quit").eq(1).on("click",function(){
		wheel = true;
	})
	
	function fndown(){
		w+=30
		if(w>(active.parent().width()-active.width())){
			w = active.parent().width()-active.width();
		}
		active.stop().animate({
			left:w
		},10)
		var length = $(".repeat-lis").width()-$(".repeat-imgs").width();
		var inn = w/(active.parent().width()-active.width());
		$(".repeat-lis").stop().animate({
			left:-length*inn
		},10)
	}
	function fnup(){
		w-=30;
		if(w<=0){
			w=0
		}
		active.stop().animate({
			left:w
		},50)
		var length = $(".repeat-lis").width()-$(".repeat-imgs").width();
		var inn = w/(active.parent().width()-active.width());
		$(".repeat-lis").stop().animate({
			left:-length*inn
		},50)
		if(w == 0){
			clearInterval(fire);
		}
	}
	
	
	
	//vr/360
	$(".nav_quit").eq(2).on("click",function(){
		html.css("overflow","auto");
	})
	$(".nav_quit").eq(2).siblings().on("click",function(){
		html.css("overflow","hidden");
	})
	$(".imgs .bg").on("mouseenter",function(){
		$(this).css("background","rgba(0,0,0,.1)").siblings().stop().animate({bottom:30},300);		
	})
	$(".imgs .bg").on("mouseleave",function(){
		$(this).css("background","rgba(0,0,0,.4)").siblings().stop().animate({bottom:20},300);		
	})
	
	//dire
	var line = $(".dire .cline span");
	var left_act = $(".dire .left_act");
	var right_act = $(".dire .right_act");
	var rtext = $(".dire .text_right");
	var ltext = $(".dire .text_left");
	var onoff = true;
	$(".nav_quit").eq(3).siblings().on("click",function(){
		if(!onoff){		
			rtext.css("color","white");
			ltext.css("color","white");		
			line.css("z-index",0).css("height",0).css("width",50).css("background","white");
			line.parent().css("background","#333333").css("width",10);
			left_act.css("width",1110);
			right_act.css("width",1110)
			onoff = true;			
		}		
	})
	$(".nav_quit").eq(3).on("click",function(){
		if(onoff){
			setTimeout(function(){
				rtext.css("color","black")
				ltext.css("color","black")
			},200)
			line.css("z-index",5);
			line.stop().animate({
				height:1000		
			},300)
			setTimeout(function(){
				left_act.stop().animate({
					width:0
				},300);
				right_act.stop().animate({
					width:0
				},300)
			},300);
			setTimeout(function(){
				line.css("width",0).css("background","#E8E8E8");
				line.parent().css("width",1).css("background","#E8E8E8")
				rtext.css("z-index",5);
				ltext.css("z-index",5);
			},600);		
		}
		onoff = false;
	})
	textenter(rtext,right_act);
	textenter(ltext,left_act);
	textleave(rtext,right_act);
	textleave(ltext,left_act);
	
	
	//awards
	var num1,num2,num3=0;	
	var timer,timer1,timer2;
	var tigger = true;
	$(".number li").each(function(i,ele){
		$(ele).css({
			"position":"absolute",
			top:-283,
			left:126*i+10
		})
	})
	$(".nav_quit").eq(4).on("click",function(){
		if(tigger){
			$(".awards .up").stop().animate({
				height:300,
				bottom:428
			},300)
			setmove(timer,0);
			setTimeout(function(){
				setmove(timer1,1);
			},200)
			setTimeout(function(){
				setmove(timer2,2);
			},400)
		}
		tigger = false;
	})
	$(".nav_quit").eq(4).siblings().on("click",function(){
		if(!tigger){
			$(".awards .up").stop().animate({
				height:0,
				bottom:300
			},300)
		}		
		tigger = true;
	})
	
	//contact
	var ht = $(".contact .con_ul li h1");
	$(".nav_quit").eq(6).on("click",function(){
		ht.stop().animate({
			width:243,
			height:203
		},300)
	})
	$(".nav_quit").eq(6).siblings().on("click",function(){
		ht.stop().animate({
			width:0,
			height:0
		})
	})
	var ctli = $(".contact .nav ul li");
	ctli.eq(0).find("span").css("background","red");
	ctli.eq(0).on("click",function(){
		$(document).scrollTop(0);
		$(this).find("span").css("background","red");
		$(this).siblings().find("span").css("background","");
	})
	ctli.eq(1).on("click",function(){
		$(document).scrollTop(840);
		$(this).find("span").css("background","red");
		$(this).siblings().find("span").css("background","");
	})

	
	function setmove(name,i){
		var num=0;					
		name=setInterval(function(){			
			$(".number li").eq(i).stop().animate({
				top:566
			},200)
			setTimeout(function(){
				$(".number li").eq(i).css("top","-283px");
			},250)
			num++;
			if(num>=3){
				clearInterval(name);
				setTimeout(function(){
					$(".number li").eq(i).css("top","0px");
				},251)					
			}
		},350)
	}
	function textenter(obj1,obj2){
		obj1.on("mouseenter",function(){
			obj2.stop().animate({
				width:1110
			},200)
			$(this).find(".top_line").stop().animate({
				width:60
			},200)
			$(this).find(".down_line").stop().animate({
				width:250
			},200)
			$(this).find(".down_line").css("background","red");
			$(this).find(".ctext").css("color","#fff");
		})
	}
	function textleave(obj1,obj2){
		obj1.on("mouseleave",function(){
			obj2.stop().animate({
				width:0
			},200)
			$(this).find(".top_line").stop().animate({
				width:20
			},200)
			$(this).find(".down_line").stop().animate({
				width:150
			},200)			
			$(this).find(".down_line").css("background","black");
			$(this).find(".ctext").css("color","black");
		})
	}
})
