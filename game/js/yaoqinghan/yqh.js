(function(){
    var h = window.screen.height,
        w = window.screen.width;


    /**
      添加id
      */
    var oPage = document.getElementById('page');
    if(oPage){

    }

    /**
      展开
      */
    var mPage = document.getElementById('mPage');
    if(mPage){
        var openA = mPage.getElementsByTagName('a'),
            openP = mPage.getElementsByTagName('p');
        for(var i = 0; i < openA.length; i++){
            openA[i].onclick = function(){
                animateOpen(this);
            }
        }
        //展开动画
        function animateOpen(el){
            if(el.parentNode.className.indexOf("on") < 0){
                el.parentNode.className = el.parentNode.className +" on";
            }else{
                el.parentNode.className = el.parentNode.className.replace(" on","");
            }
        }
    }


    /**
      刮开
      */
    var mb_mask = document.getElementById('mb_mask');
    if(mb_mask){
        var oImg = document.getElementById('img'),
            hasTouch = 'ontouchstart' in window,
            start_ev = hasTouch ? 'touchstart' : 'mousedown',
            move_ev = hasTouch ? 'touchmove' : 'mousemove',
            end_ev = hasTouch ? 'touchend' : 'mouseup',
            offsetX = oImg.offsetLeft,
            offsetY = oImg.offsetTop,
            loadTime = new Date().getTime(),
            dis = null,
            endTime = null;

        var cxt = oImg.getContext("2d");
        layer(cxt);

        
        //绘制图像
        function layer(cxt){
            var img = new Image();
            img.src="../images/yaoqinghan/cover_bg_03@2x.jpg";//图片的加载一般放在最后
            img.onload = function(){
               cxt.drawImage(img,0,0,640,960);//原图片的大小为640*960 
            }
            //在图像上绘制文字

        }
        //touch
        function eventDown(e){                 
            e.preventDefault();                 
            istouch=true;          
        }   
        function eventUp(e){                 
            e.preventDefault();                 
            istouch = false;
            endTime = new Date().getTime();
            dis = (endTime - loadTime)/1000;
            //alert(dis)
            if(dis > 1){
                mb_mask.style.opacity = 0;
            }else{
                return;
            }
        }               
        function eventMove(e){              
            e.preventDefault();                 
            if(istouch){                     
                if(e.changedTouches){                         
                    e = e.changedTouches[e.changedTouches.length-1];                     
                }                     
                var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX + w/2 || 0,                         
                    y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY + h/2 || 0;                        
                with(cxt){                
                    beginPath();                     
                    arc(x, y, 15, 0, Math.PI * 2);
                    closePath();                         
                    fill();            
                }                
            } 
            //在绘制的圆外显示canvas图像  
            cxt.globalCompositeOperation = 'destination-out'; 
        }
        
        //触发事件
        oImg.addEventListener(start_ev,eventDown,false);
        oImg.addEventListener(move_ev,eventMove,false);
        oImg.addEventListener(end_ev,eventUp,false);
    }
    
})();
    
