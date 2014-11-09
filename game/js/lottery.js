(function(bodyStyle){
		    bodyStyle.mozUserSelect = 'none';         
            bodyStyle.webkitUserSelect = 'none';
            var mask = document.getElementById("mask"),
                result = document.getElementById('result'),
	            card = document.getElementById('card_text'),
	            num_wrap = document.getElementById('num_wrap'),
	            btn = document.getElementById('car_btn'),
	            e_frame = document.getElementById('e_frame'),
	            e_close = document.getElementById('e_close');
            //刮卡
            if(mask){
	            //变量
	            var hasTouch = 'ontouchstart' in window,
	                start_ev = hasTouch ? 'touchstart' : 'mousedown',
	                move_ev = hasTouch ? 'touchmove' : 'mousemove',
	                end_ev = hasTouch ? 'touchend' : 'mouseup',
	                ctx,
	                w = result.offsetWidth,            
			        h = result.offsetHeight,
	                offsetX = mask.offsetLeft,
	                offsetY = mask.offsetTop,
	                l = card.offsetLeft,
	                t = card.offsetTop,
	                w_num = num_wrap.offsetWidth,            
			        h_num = num_wrap.offsetHeight,
	                istouch = false,
	                num1 = 0,
	                num2 = 0;
	            num_wrap.style.lineHeight = h_num + "px";
	             
				//mask绘制
	            mask.width = w;             
				mask.height = h;         
				ctx = mask.getContext('2d');          
				layer(ctx);               
	            //touch 
	            function layer(ctx){                 
					ctx.fillStyle = '#999';                 
					ctx.fillRect(0, 0, w, h);       
				}     
				function eventDown(e){                 
					e.preventDefault();                 
					istouch=true; 
					num1++;            
				}   
				function eventUp(e){                 
					e.preventDefault();                 
					istouch=false;
					num2++; 
					if(num1 > 0 && num2 > 0){
						if(result.innerText == "未中奖"){
							btn.style.display = "none";
                            e_frame.style.display = "block";
						}else{
                            e_frame.style.display = "none";
                            btn.style.display = "block";
                    	}
	                }
				}               
				function eventMove(e){                 
					e.preventDefault();                 
					if(istouch){                     
						if(e.changedTouches){                         
							e = e.changedTouches[e.changedTouches.length-1];                     
						}                     
						var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX - l || 0,                         
						    y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY - t|| 0;                     
						with(ctx){                    
							beginPath();                     
							arc(x, y, 25, 0, Math.PI * 2);
							closePath();                         
							fill();                
						}                
					}             
				}
				ctx.globalCompositeOperation = 'destination-out'; //在源图像外显示目标图像(就是在绘制的圆外面显示矩形)

	            //事件绑定
	            mask.addEventListener(start_ev,eventDown,false);
	            mask.addEventListener(move_ev,eventMove,false);
	            mask.addEventListener(end_ev,eventUp,false);
	            e_close.addEventListener('click',close,false);

	            //关闭弹框
	            function close(){
	            	e_frame.style.display = "none"; 
	            }


            }

            //验证
            var nameStr = document.getElementById('user_name'),
                phoneStr = document.getElementById('user_phone');
            if( nameStr || phoneStr){
                nameStr.onchange = function(){
                	verfifyName(nameStr);
                }
                phoneStr.onchange = function(){
                	verfifyPhone(phoneStr);
                }

            }

            //姓名验证
            function verfifyName(name){
				var nameStr = name.value;
				if(nameStr.replace(/(^\s*)|(\s*$)/g, "") == ""){
				    alert("联系人姓名不能为空");
				    return false;
				}else {
				var reg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
				var name_Flag = reg.test(nameStr);
					if(name_Flag && nameStr.replace(/[^\x00-\xff]/g, '..').length > 2 && nameStr.replace(/[^\x00-\xff]/g, '..').length < 8){
					   return true;
					}else{
					   alert("联系人姓名只能为中文、英文、数字并且长度为2~8个字符");
					   return false;
					}
				}
			}

			//联系电话验证
			function verfifyPhone(phone){
				var phoneStr = phone.value;
				if(phoneStr.replace(/(^\s*)|(\s*$)/g, "") == ""){
				    alert("联系电话不能为空");
				    return false;
				}else if(!isNaN(Number(phoneStr)) && phoneStr.length > 8 && phoneStr.length <= 11){
				    var reg = /^1[3,5,8]\d{9}$/;
				    var phone_Flag = reg.test(phoneStr);
				    if(phone_Flag){
				        return true;
				    }else{
					    alert("手机号码只能是数字,并且只能以13或15或18开头并且长度是11位");
					    return false;
				    }
				}else{
				    var reg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
				    var phone_Flag = reg.test(phoneStr);
				    if(phone_Flag){
				        return true;
				    }else{
				        alert("对不起，您输入的电话格式错误");
				        return false;
				    }
				}
			}
                     
		})(document.body.style);