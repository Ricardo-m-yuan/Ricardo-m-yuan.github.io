﻿// JavaScript Document
var Tween = {
	linear: function (t, b, c, d){
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};
//callBack 回调函数，动画结束之后，执行的函数
function move(obj,attr,time,target,type,callBack,ConBack)
{
	var t = 0;
	var b =  css(obj,attr);
	var c =  target - b;
	var d = time / 20;
	 clearInterval(obj.timer);
	 obj.timer = setInterval(
	 	function (){
			t++;
			var nub = Tween[type](t,b,c,d);
			if(attr == "opacity"){
				obj.style[attr] = nub/100;
				obj.style.filter ="alpha(opacity="+ nub +")";
			} else {
				obj.style[attr] = nub + "px";
			}
			ConBack&&ConBack();
			if(t >= d){
				clearInterval(obj.timer);
				/*if(callBack){
					callBack();
				}(*/
				callBack&&callBack();
			}
		},
		20
	 );
}
function mTween(init)
	{
		var obj = init["element"] ;
		var type = init["type"] ;
		var time = init["time"] ;
		var target = init["target"] ;
		var callBack = init["callBack"] ;
		var t = 0;
		var b = {};
		var c = {};
		var d = time / 20;
		for(var s in target){
			b[s] = css(obj,s);
			c[s] = target[s] - b[s];
		}
		 clearInterval(obj.timer);
		 obj.timer = setInterval(
		 	function (){
				t++;
				for(var s in b){
					var nub = Tween[type](t,b[s],c[s],d);
					if(s == "opacity"){
						obj.style[s] = nub/100;
						obj.style.filter ="alpha(opacity="+ nub +")";
					} else {
						obj.style[s] = nub + "px";
					}
				}
				if(t >= d){
					clearInterval(obj.timer);
					callBack&&callBack();
				}
			},
			20
		 );
	}
function css(obj,attr){        
	var nub = 0;
	if(obj.currentStyle){
		nub = parseFloat(obj.currentStyle[attr]);
	} else { 
		nub = parseFloat(getComputedStyle(obj)[attr]);
	}
	if(attr == "opacity"){
		return Math.round(nub*100);
	}
	return nub;
}

function $(ele,parent){			//封装的函数
	var oTa = ele.substring(0,1);   //取字符串的第一个字符
	var parent = parent || document;  //以父级获取
	var arr = [];
	var all = parent.getElementsByTagName("*");    //获取所有的元素
	if(oTa == "#"){      //判断实参是否id
		var id = ele.substring(1);		// 获取实参的id值
		return parent.getElementById(id);
	}else if(oTa == "."){                  // 判断参数是否是className
		var cla = ele.substring(1);        // 获取实参的class值
		if(document.getElementsByClassName == undefined){   //是否是IE浏览器
			for(var i=0;i<all.length;i++){       //  循环所有的元素
				if(all[i].className != ""){      //  排除没有className值的元素
					var s = all[i].className.split(" "); //每个className以空格隔开
					for(var j=0;j<s.length;j++){
						if(cla == s[j]){      //判断实参和className是否相等
							arr.push(all[i]);							
						}
					}					
				}
			}
			return arr;		
		}else{     //class获取
			return parent.getElementsByClassName(cla);  //谷歌浏览器兼容的
		}	
	}else{    //以元素名获取
		return parent.getElementsByTagName(ele);
	}
}
function addEvent(obj,en,fn){   //事件绑定函数
	if(obj.addEventListener){
		obj.addEventListener(en,fn,false)
	}else{
		obj.attachEvent('on'+en,fn)
	}
}
function addWheel(obj,fnUp,fnDown){   //滚轮滚动封装函数
	var liu = window.navigator.userAgent.toLowerCase();
	if(liu.indexOf('firefox') == -1){
		obj.onmousewheel = fn;
	}else{ //走ff
		obj.addEventListener('DOMMouseScroll',fn);
	}
	function fn(ev){
		var ev = ev||window.event;
		var down = true;
		if(ev.wheelDelta){
			down = ev.wheelDelta>0?true:false;
		}else{
			down = ev.detail<0?true:false;
		}
		if(down){			
			if(typeof fnUp == 'function'){
				fnUp();
			}
		}else{
			if(typeof fnDown == 'function'){
				fnDown();
			}
		}
//		ev.preventDefault();	//清除默认行为
	}	
}
function Sclone(obj,boolean){	//方法继承，深度克隆，浅度克隆；
	var v = obj.constructor == Array?[]:{};
	for(var attr in obj){
		if(typeof obj[attr] == "object" && boolean){//深度克隆，改变对象中的对象时不会影响父类；
			v[attr] = Sclone(obj[attr],boolean);
		}else{
			v[attr] = obj[attr];//浅度克隆，，改变对象中的对象时会影响父类；
		}
	}
	return v;
}
function coll(obj1,obj2){//碰撞函数；
	var div1All = obj1.getBoundingClientRect();
	var top1 = div1All.top;
	var bottom1 = div1All.bottom;
	var left1 = div1All.left;
	var right1 = div1All.right;
	
	var div2All = obj2.getBoundingClientRect();
	var top2 = div2All.top;
	var bottom2 = div2All.bottom;
	var left2 = div2All.left;
	var right2 = div2All.right;

	if(right1>=left2&&bottom1>top2&&left1<right2&&top1<bottom2){
		return true;
	}else{
		return false;
	}
}
function removeRepeat(arr){									//去重函数；
	var obj ={};
	for(var i=0;i<arr.length;i++){
		if(obj[(typeof arr[i])+arr[i]]){				//给对象添加属性，当属性重复时，返回true；
			arr.splice(i,1);							//删除当前位置的arr的数据；
			i--;
		}else{
			obj[(typeof arr[i])+arr[i]] = 1;			//当没有这个属性时给obj添加一个属性；
		}			
	}
	return arr;
}
function getcss(obj,attrs){				//样式调用
	//这是兼容IE和谷歌浏览器；
	if(obj.currentStyle == undefined){
		return getComputedStyle(obj)[attrs]; //谷歌浏览器
	}else{
		return obj.currentStyle[attrs]; //IE浏览器
	}
}