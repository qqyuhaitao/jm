(function() {

    var hasTouch = 'ontouchstart' in window,
        start_ev = hasTouch ? 'touchstart' : 'mousedown',
        move_ev = hasTouch ? 'touchmove' : 'mousemove',
        end_ev = hasTouch ? 'touchend' : 'mouseup',
        inner = document.getElementById('inner'),
        oDiv = inner.getElementsByTagName('div'),
        x = y = startX = startY = aboveY = isup = 0,
        is = 0,
        h = window.screen.height,
        w = window.screen.width,
        imgArray = [];

    textCssInit();
    onePageText();

    //touchstart事件
    function eventDown(evt) {
        evt.preventDefault();
        var touch = evt.changedTouches[0];; //获取第一个触点  
        var x = Number(touch.pageX); //页面触点X坐标  
        var y = Number(touch.pageY); //页面触点Y坐标  
        //记录触点初始位置  
        startX = x;
        startY = y;
    }

    //touchmove事件可以得到滑动的方向
    function eventMove(evt) {
        evt.preventDefault();
        evt.stopPropagation(); //阻止把事件分派到其他节点 
        var touch = evt.changedTouches[evt.changedTouches.length - 1]; //获取第一个触点  
        var x = Number(touch.pageX); //页面触点X坐标  
        var y = Number(touch.pageY); //页面触点Y坐标  
        var a = x - startX,
            b = y - startY;
        x = startX;
        //var text = 'TouchMove事件触发：（' + a + ', ' + b + '）';  
        //alert(text);
        //判断滑动方向
        if (y - startY > 0) {
            isup = -1; //向上滑动    
        }
        if (y - startY < 0) {
            isup = 1; //向下滑动  
        }
    }


    //touchend事件  
    function eventUp(evt) {
        evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
        var text = 'TouchEnd事件触发';

        is += Number(isup);
        if (is <= 0) {
            is = 0;
        } else if (is >= oDiv.length - 1) {
            is = oDiv.length - 1;
        }

        gotoTop(is, isup); //滑动结束的时候开始页面滑动  
    }

    //滑动
    function gotoTop(n, z) {
        //背景图片运动
        inner.style.top = -n * h + "px"; //通过定位来实现页面的滑动
        //文字运动
        textAnimate(n, z);
        textAnimateM(n, z);
    }

    //初始化文字
    function textCssInit() {
        var textH = oDiv[0].getElementsByTagName('img')[1].offsetHeight;
        //给文字定位
        for (var i = 0; i < oDiv.length; i++) {
            imgArray.push(oDiv[i].getElementsByTagName('img').length - 1);;
            (function(i) {
                var imgT = oDiv[i].getElementsByTagName('img');
                imgT[imgT.length - 1].style.left = (w - 21) / 2 + "px";
            })(i);
        }
        //最后一页没有向下的箭头
        var b = imgArray[imgArray.length - 1];
        oDiv[oDiv.length - 1].getElementsByTagName('img')[b].style.left = '10%';
    }

    //刚进入的时候第一个页面的动画
    function onePageText() {
        //背景渐变
        oDiv[0].getElementsByTagName('img')[0].style.opacity = 1;
        oDiv[0].getElementsByTagName('img')[0].style.transition = "opacity 1s ease .1s";
        textAnimate(0);
    }

    //滑进
    function textAnimate(nIndex, isIndex) {
        var imgT = oDiv[nIndex].getElementsByTagName('img');
        var textH = oDiv[0].getElementsByTagName('img')[1].offsetHeight;
        //文字向上滑动渐变出来
        for (var i = 1, k = imgT.length - 2; i <= imgArray[nIndex]; i++, k--) {;
            (function(i) {
                imgT[i].style.opacity = 1;
                imgT[i].style.bottom = 19 + textH * k + 'px';
                imgT[i].style.transition += "all 1s ease " + i * .8 + "s";
            })(i);
        }
    }

    //滑出
    function textAnimateM(nIndex, isIndex) {
        var imgT = oDiv[nIndex - 1].getElementsByTagName('img');
        var textH = oDiv[0].getElementsByTagName('img')[1].offsetHeight;
        for (var i = 1, k = imgT.length - 2; i <= imgArray[nIndex - 1]; i++, k--) {;
            (function(i) {
                imgT[i].style.opacity = 0;
                imgT[i].style.bottom = 0 + 'px';
                imgT[i].style.transition += "all 1s ease " + i * .8 + "s";
            })(i);
        }

    }

    //事件绑定
    document.addEventListener(start_ev, eventDown, false);
    document.addEventListener(move_ev, eventMove, false);
    document.addEventListener(end_ev, eventUp, false);



})();