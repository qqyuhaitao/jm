window.onload = function(){
	var count = 0, //鱼饵计数
		h = window.screen.height,
		w = window.screen.width,
		body = document.getElementsByTagName('body')[0],
		hasTouch = 'ontouchstart' in window,
		start_ev = hasTouch ? 'touchstart' : 'mousedown',
		move_ev = hasTouch ? 'touchmove' : 'mousemove',
		end_ev = hasTouch ? 'touchend' : 'mouseup',
		SHAKE_THRESHOLD = 3000, //阙值 
		last_update = 0,
		x = y = z = last_x = last_y = last_z = counts = 0,
		txMotation = null,
		flyMotation = null,
		numBait = null,
		isshg = false,
		oFishing = document.getElementById('fishing'),
		opf = document.getElementById('pf'),
		oTool = document.getElementById('tools'),
		oBottomA = document.getElementById('bottom_btn').getElementsByTagName('a'),
		oJdMask = document.getElementById('jd_mask');
		oYeCount = document.getElementById('yeCount');
		oAudio = document.getElementById('audio');

	var ele = function(n) {
		return document.getElementById('block_0' + n);
	}


	//监听运动传感事件(判断用户的设备是否支持)
	function init() {　　
		if (window.DeviceMotionEvent) {　　　　
			window.addEventListener('devicemotion', deviceMotionHandler, false); //绑定摇一摇
		} else {
			//如果设备不支持的话给用户提示
			alert("Not supported on your device.");
		}
	};

	/**
	  鱼竿定位
	  */
	if (oTool) {
		oTool.style.right = (w - 136) / 2 - 24 + "px";
	}

	/**
	  摇一摇
	  */
	function deviceMotionHandler(eventData) {
		//获取含重力的加速度  
		var acceleration = eventData.accelerationIncludingGravity,
			curTime = new Date().getTime(),
			diffTime = curTime - last_update;
		if (diffTime > 100) { //0.1s的重力加速度变化
			last_update = curTime;
			x = acceleration.x;
			y = acceleration.y;
			z = acceleration.z;
			var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
			if (speed > SHAKE_THRESHOLD) {
				counts++;
				if (counts == 1) { //摇一摇成功
					clearTimeout(flyMotation);
					flyMotation = setTimeout(function() {
						opf.style.display = "block";
						ele(1).style.opacity = 0;
						ele(1).style.webkitTransition = "opacity 1s";
						setTimeout(function() {
							ele(1).style.display = "none";
							ele(2).style.display = "block";
						}, 1000);
						flyCast(function(data) {

							//显示鱼饵数量的处理
							//oYeCount.value = data;

						});
					}, 1000);

				} else {
					return false; //摇一摇失败
				}
			}
			last_x = x;
			last_y = y;
			last_z = z;
		}
	};


	/**
	  抛鱼饵
	  */
	function flyCast(callBackNum) { //callBackNum()用来返回鱼饵数量
		var oPfImg = document.getElementById('pfImg'),
			l = oPfImg.offsetLeft,
			t = oPfImg.offsetTop,
			pfW = opf.offsetWidth,
			pfH = opf.offsetHeight;
		opf.style.top = 0 - pfH + "px";
		startMove(opf, oPfImg);
	};

	function startMove(el, elImg) {
		clearInterval(txMotation);
		var iSpeed = 0,
			lineC = document.getElementById("myCanvas"),
			lineStartX = oTool.offsetLeft + 25,
			lineStartY = oTool.offsetTop;
		txMotation = setInterval(function() {
			iSpeed += (0 - el.offsetTop) / 6;
			iSpeed *= 0.65;
			if (Math.abs(iSpeed) <= 1 && Math.abs(0 - el.offsetTop) <= 1) {
				elImg.src = "../images/fishing/yp_icon.png";
				clearInterval(txMotation);
				el.style.top = 0 + 'px';
				iSpeed = 0;
			} else {
				if (Math.abs(iSpeed) <= 5 && Math.abs(0 - el.offsetTop) <= 5) {
					elImg.src = "../images/fishing/yp_icon.png";
				}
				var cxt = lineC.getContext("2d");
				cxt.moveTo(lineStartX, lineStartY);
				cxt.lineTo(lineStartX, lineStartY - (el.offsetTop + iSpeed));
				cxt.stroke();
				el.style.top = el.offsetTop + iSpeed + 'px';
			}
		}, 40);
	};


	/**
	  收杆
	  */
    
	var elWheel = document.getElementById('wheel'),
		elArrow = document.getElementById('arrow'),
		elMask = document.getElementById('jd_mask');
		o = {},
		deg = 0,
		ss = 0,
		maskH = null,
		timer = null,
		isRotate = false,
		pointLength = function(objx, objy) {
			return Math.sqrt(Math.abs(objx.x - objy.x) * Math.abs(objx.x - objy.x) + Math.abs(objx.y - objy.y) * Math.abs(objx.y - objy.y));
		};

		center = null;

    function offset(_this){
        var left = 0,
        top = 0;
        while (_this.offsetParent) {
            left += _this.offsetLeft;
            top += _this.offsetTop;
            _this = _this.offsetParent;
        }
        return {
            "left": left,
            "top": top
        }
    }


    function getCenter(){
    	var centerObj = offset(elArrow),
	    	oY = offset(elArrow).top + 100, //oX,oY为圆心坐标
			oX = offset(elArrow).left + 100;
		return {
			x: centerObj.left + 100,
			y: centerObj.top + 100
		}
    }

	//提杆
	function clickTg() {
		ele(2).style.display = "none";
		ele(3).style.display = "block";
		isshg = true;
		ss = 0;
	};
	ele(2).addEventListener('click', clickTg, false);

	//计时器
	timer = setInterval(function timeGo() {
		if (isRotate) ss++;
		if (ss <= 3) return false;
		else outTime();
	}, 1000);

	//超出时间收杆失败
	function outTime() {
		if (deg < 1080) {
			//收杆太慢
			clearInterval(timer);
			ele(3).style.display = "none";
			ele(4).style.display = "block";
			isshg = false;
		}
	}

	function touchStart(e) {
		o.pageX = e.changedTouches[0].pageX;
		o.pageY = e.changedTouches[0].pageY;
		o.S = true; //isScrolling
		o.X = 0;
		o.Y = 0; //horizontal moved
		isRotate = true;
		if(center == null){
			center = getCenter();
		}
	};

	function touchMove(e) {
		e.preventDefault();
		if (ss <= 3) {
			var absX = e.changedTouches[0].pageX,
				absY = e.changedTouches[0].pageY,
				target = {
					x: absX,
					y: absY
				},
				start = {
					x: o.pageX,
					y: o.pageY
				},
				a = pointLength(start, center),
				c = pointLength(start, target),
				b = pointLength(center, target),
				y = Math.acos((a * a + b * b - c * c) / (2 * a * b));
			deg = y * 180 / Math.PI + deg;
			this.style.webkitTransform = 'rotateZ(' + deg + 'deg)';
			o.pageX = e.changedTouches[0].pageX;
			o.pageY = e.changedTouches[0].pageY;
			maskH = 299 - 259 * (deg / 1080);
			elMask.style.height = maskH + "px";
			if (deg >= 1080) {//收杆成功
				deg = 1080;
				isshg = false;
				callBackResult();
			}
		} else {
			outTime();
		}

	};

	function touchEnd(e) {
		o.S = false;
	};
	//在收杆的时候禁止屏幕默认的动作
	body.addEventListener(start_ev, function(e){
		if(isshg){
			e.preventDefault();
		}
	});
	body.addEventListener(move_ev, function(e){
		if(isshg){
			e.preventDefault();
		}
	});
	body.addEventListener(end_ev, touchEnd);
	body.addEventListener('touchcancel', touchEnd);
	elArrow.addEventListener(move_ev, touchMove, false);
	elArrow.addEventListener(start_ev, touchStart, false);



	function callBackResult() {
		//收杆成功
		clearInterval(timer);
		ele(3).style.display = "none";
		ele(5).style.display = "block";
	}


	/**
      获得鱼饵
      */
	function clickYuEr() {
		for (var i = 1; i <= 7; i++) {
			ele(i).style.display = "none";
		}
		ele(6).style.display = "block";
	};
	oBottomA[0].addEventListener('click', clickYuEr, false);

	/**
	  查看鱼篓
	  */
	function clickYuLou() {
		for (var i = 1; i <= 7; i++) {
			ele(i).style.display = "none";
		}
		ele(7).style.display = "block";
	};
	oBottomA[1].addEventListener('click', clickYuLou, false);

	init();

}