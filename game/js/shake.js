(function(){
	//监听运动传感事件
	function init(){
	　　if (window.DeviceMotionEvent) 
		{
	　　　　window.addEventListener('devicemotion', deviceMotionHandler, false);
		}else {
		    //如果设备不支持的话给用户提示
			alert("Not supported on your device.");
		}
	}
    //变量
	var SHAKE_THRESHOLD = 3000; //阙值 
	var last_update = 0;//  
	var x=y=z=last_x=last_y=last_z=counts = 0; 
	var $frameDom = document.getElementById('e_frame'),
        $closeDom = document.getElementById('e_close'); 
	//摇  
	function deviceMotionHandler(eventData){
	    //获取含重力的加速度  
	    var acceleration = eventData.accelerationIncludingGravity,
	        $numDom = document.getElementById('numCount'),
	        $num = $numDom.innerHTML,   
	        curTime = new Date().getTime(), 
	        diffTime = curTime - last_update;

	    if (diffTime > 100) {//0.1s的重力加速度变化
			last_update = curTime; 
			x = acceleration.x;
			y = acceleration.y;  
			z = acceleration.z; 
			var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;  //Math.abs()获得绝对值

			if (speed > SHAKE_THRESHOLD) {
				counts++;
				if(counts == 1){
					//摇一摇次数计数
					if($num == 0){
						return;
					}else{
						$num--;
						$numDom.innerHTML = $num;

						//显示中奖信息
				        $frameDom.style.display = "block";

				        //信息返回的时候将判断置0
				        counts = 0;
					}
				}
				
			}

			last_x = x;  
			last_y = y;  
			last_z = z;  
	    }  
	}
     $closeDom.onclick = function(){
     	$frameDom.style.display = "none";
     }
	init();
})();
