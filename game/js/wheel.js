(function(){
	//
	window.requestAnimFrame = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
            window.setTimeout(callback, 1000 / 60)
        }
    })();  

    //大转盘
    	function Turntable(){
    		this.eFrame = document.getElementById("e_frame");
    		this.eCon = document.getElementById("e_con");
    		this.eClose = document.getElementById('e_close');
	        this.wheelBtn = document.getElementById("wheel_btn");
	        this.wheelImg = document.getElementById('wheel_img');
	        this.awardTitArray = ['一等奖','二等奖','三等奖','四等奖','五等奖'];
        }
        Turntable.prototype = {
        	//转盘
            Initwheel:function(){
            	var that = this,
            	    canva = '<p id="rewards1" class="reward">'+this.awardTitArray[0]+'</p><p id="rewards2" class="reward">'+this.awardTitArray[1]+'</p><p id="rewards3" class="reward">'+this.awardTitArray[2]+'</p><p id="rewards4" class="reward">'+this.awardTitArray[3]+'</p><p id="rewards5" class="reward">'+this.awardTitArray[4]+'</p>';
	            //加入奖项名称到转盘
	            this.wheelImg.innerHTML = canva;
            },

            //旋转
            Turnwheel:function(awardIndex){
 				var num = 0,
 				    that = this,
				    stopdeg = 0,//停的角度
				    totalDeg = 0,
				    randomN = Math.floor(Math.random() * 10 + 5),//转盘转动的圈数至少为5。
	            	basicDeg = 360 * randomN,
	            	turning = true,
	            	a = 0.008,
	            	nowStep = 0,
	            	step = [],
	            	random = Math.random() * 72,
	            	eDeg = [0 + random, 72 + random, 144 + random, 216 + random, 288 + random];
	            stopdeg = eDeg[awardIndex];
				totalDeg = basicDeg + stopdeg;
				countSteps();
                requestAnimFrame(rotateWheel);

                //转盘旋转
	            function rotateWheel() {
	                that.wheelImg.style.webkitTransform = 'rotate(' + step[nowStep++] + 'deg)';
	                that.wheelImg.style.MozTransform = 'rotate(' + step[nowStep++] + 'deg)';
	                if (nowStep < step.length) {//控制转动的停止
	                    requestAnimFrame(rotateWheel);
	                } else {//当转动结束短暂时间后告诉用户中奖信息
	                    turning = false;
	                    setTimeout(function() {
                          //显示中奖提示
                          that.eFrame.style.display = "block";
                          that.eCon.innerHTML = '恭喜您！本次大转盘您中了'+that.awardTitArray[awardIndex]+'~';
	                    }, 200);
	                }
	            }

                //利用方程计算每一次移动后的角度
	            function countSteps() {
	                var t = Math.sqrt(totalDeg / a);
	                var v = a * t;
	                for (var i = 0; i < t; i++) {
	                    step.push(2 * v * i - a * i * i); //抛物线(设定了a为y = a*x*x + b*x + c 中的-a)
	                }
	                step.push(totalDeg);
	            }

		    }
            
        };
        //关闭弹框
        function close(){
        	e_frame.style.display = "none"; 
        }

		var obj = new Turntable();
		obj.Initwheel(); 
		obj.wheelBtn.addEventListener('click', function(){
		    obj.Turnwheel(0);
		})
		obj.eClose.addEventListener('click',close,false);

	            
})();
