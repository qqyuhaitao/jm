(function(){
	
    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
            window.setTimeout(callback, 1000 / 60)
        }
    })();

    //click事件
	var flop = document.getElementById('flop'),
	    flopLi = flop.getElementsByTagName('li'),
	    num = 0,
	    clickOn = true;//翻牌次数
    for(var i = 0,len = flopLi.length; i < len; i++){
    	if(clickOn){
    		(function(n){
	            flopLi[n].onclick = function(){
	            	num--;
	                rotateFlop(this);
	            }
	        })(i);	
    	} else {
    		return;
    	}	
    }

    //弹框出是否中奖信息
    function callBack(){
      
    	//这里用来显示中奖提示信息
    	//alert('未中奖');
        
    }

    //旋转
    function rotateFlop(el){
    	var deg = 0,
    	    sef = el,
    	    rotateInt = null;
    	    clickOn = false;
	    clearInterval(rotateInt);
	    rotateInt = setInterval(startRotate, 0);
	    //旋转
    	function startRotate(){
    		deg++;
    		sef.style.transform = "rotateY(" + deg + "deg)";
            sef.style.webkitTransform = "rotateY(" + deg + "deg)";
            sef.style.OTransform = "rotateY(" + deg + "deg)";
            sef.style.MozTransform = "rotateY(" + deg + "deg)";
            if (deg == 90 || deg == 270) {
	            var $zheng = sef.querySelector('.zheng'),
	                $fan = sef.querySelector('.fan'),
	                $index = $fan.style.zIndex;
	            if($index == 0){
	            	$zheng.style.zIndex = 0;
	            	$fan.style.zIndex = 1;
	            }else{
	            	$zheng.style.zIndex = 1;
	            	$fan.style.zIndex = 0;
	            }
            }
            if(deg == 180 || deg >=360){
            	clearInterval(rotateInt);
            	if(deg >= 360){
            		deg = 0;//旋转一周之时，将旋转角度置0
            	}
                var calltime = setTimeout(function(){
                    clearTimeout(calltime);
                    callBack();//弹框显示用户中奖信息
                },100);//在翻牌执行完之后显示中奖信息
            }
    	}


    }


})();
