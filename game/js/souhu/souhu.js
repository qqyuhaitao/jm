(function(){
    var DOC = document;
    var BODY = DOC.body;
    var WIN = window;

    //进入页面的动画
    WIN.onload = function(){
        BODY.className = "on";
     
    }   
    
    //给菜单栏添加滑动
    var menuBox = document.getElementById("menu"),
        menuBt = menuBox.getElementsByTagName('a'),
        initX = 0,
        nowX = 0,
        reg = /\-?[0-9]+/g,
        hasTouch = 'ontouchstart' in window,
        start_ev = hasTouch ? 'touchstart' : 'mousedown',
        move_ev = hasTouch ? 'touchmove' : 'mousemove',
        end_ev = hasTouch ? 'touchend' : 'mouseup';
        if(menuBox){
            menuBox.style.width = menuBt.length*menuBt[0].offsetWidth+menuBt.length +'px';
            zongW = menuBox.style.width.match(reg)[0];

            //touchstart
            menuBox.addEventListener(start_ev,function(e){
                e.preventDefault();
                menuBox.style.transition = '';
                var position = getPosition(e);
                initX = position.x;
                var translated = menuBox.style.webkitTransform;
                if( translated != "none"){
                    nowX = Number(menuBox.style.webkitTransform.match(reg)[1]);
                }else{
                    nowX = 0;
                }
            });

            //touchmove
            menuBox.addEventListener(move_ev,function(e){
                e.preventDefault();
                BODY.className = "";
                for(var i = 0; i < menuBt.length; i++){
                    menuBt[i].style.webkitTransform='translate3d(0,0,0)';
                }
                var position = getPosition(e);
                menuBox.style.webkitTransform = 'translate3d('+(nowX*1+(position.x - initX*1))+'px,0,0)';
                
            });

            //touchend
            menuBox.addEventListener(end_ev,function(e){
                e.preventDefault();
                menuBox.style.transition = 'all .6s';
                nowX = Number(menuBox.style.webkitTransform.match(reg)[1]);
                if(nowX > 0){
                    menuBox.style.webkitTransform = "translate3d(0,0,0)";
                }else if( nowX < -(zongW-WIN.screen.width) ){ 
                    menuBox.style.webkitTransform = "translate3d("+(-(zongW-WIN.screen.width)+1)+"px,0,0)";
                }else{
                    var dis = (nowX/menuBt[0].offsetWidth).toFixed()*menuBt[0].offsetWidth;
                    menuBox.style.transwebkitTransformform = "translate3d("+dis+"px,0,0)";
                }
            });
        }
        
        function getPosition(e) {
            var that = this;
            if (!event) {
                return false
            }
            if (e.touches) e = e.touches[0];
            var canRect = BODY.getBoundingClientRect();

            return {
                x: (e.clientX - canRect.left),
                y: (e.clientY - canRect.top)
            }
        } 

        //选项卡
        var tabUl = document.getElementById('tabUl');
        if(tabUl) {
            var tabLi = tabUl.getElementsByTagName('li'),
                nav_a = document.getElementById('nav_a').getElementsByTagName('a');
            for(var i = 0; i < tabLi.length; i++){
                ;(function(i){
                    nav_a[i].onclick = function(){
                        for( var j = 0; j< tabLi.length; j++){
                            nav_a[j].className = null;
                            tabLi[j].className = '';
                        }
                        nav_a[i].className = "on";
                        tabLi[i].className = 'selected';
                    }
                })(i);
            }
        } 

        //展开全文
        var balckbord = document.getElementById('balckbord');
        if(balckbord){
            var openA = balckbord.getElementsByTagName('a');
            var openSpan = balckbord.getElementsByTagName('span');
            for(var i = 0; i < openA.length; i++){
                ;(function(i){
                    openA[i].onclick = function(){
                        if(openA[i].innerHTML == '⇓展开全文⇓'){
                            openSpan[i].className = 'b_info_txt3 on';
                            openA[i].innerHTML = '⇓收起⇓'; 
                        }else{ 
                            openSpan[i].className = 'b_info_txt3';
                            openA[i].innerHTML = '⇓展开全文⇓'; 
                        } 
                       
                    }
                })(i);
            }

        }




})();
    
