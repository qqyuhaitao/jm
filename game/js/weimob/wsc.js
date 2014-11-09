(function() {
    var h = window.screen.height,
        w = window.screen.width,
        oHd = document.getElementById('header'),
        oCon = document.getElementById('content'),
        oFt = document.getElementById('footer');


    //首页图片适应屏幕
    var oIndex = document.getElementById('index');
    if (oIndex) {
        var Img = new Image(),
            oImg = document.getElementById('imgFull');
        Img.src = oImg.src;
        if (w < Img.width) {
            oImg.width = ((h - oHd.offsetHeight) * Img.width) / Img.height;
            oImg.style.marginLeft = (w - oImg.width) / 2 + "px";
        } else {
            oImg.width = w;

        }
    }


    //tab
    var oTab = document.getElementById('otherCon');
    if(oTab){
        //tab
        var oTab_a = oTab.getElementsByTagName('a'),
            oTab_li = oTab.getElementsByTagName('ul')[0].getElementsByTagName('li');
        for(var i = 0; i < 3; i++){
            oTab_a[i].index = i;
            oTab_a[i].onclick = function(){
                for(var i = 0; i < oTab_li.length; i++){
                    oTab_a[i].className = '';
                    oTab_li[i].style.display = 'none';
                }
                this.className = 'current';
                oTab_li[this.index].style.display = 'block';
                hzFunction();
            }
            
        }
        hzFunction();
    }

    function hzFunction(){
        var hz = h - oHd.offsetHeight -  oFt.offsetHeight - oCon.offsetHeight;
        if(hz > 0){
            oCon.style.height = h - oHd.offsetHeight -  oFt.offsetHeight + "px";
        }else{
            return;
        }
    }



    //chart
    //checkedbox
    var chart = document.getElementById('chart');
    if(chart){
        hzFunction();
        var oHtit = chart.getElementsByTagName('h3'),
            oInput = chart.getElementsByTagName('input'),
            oI = chart.getElementsByTagName('em'),
            count;
        //是否全选    
        for(var i = 0; i < oInput.length-1; i++){
            oInput[i].onclick = function(){
                count = 0;
                for(var i = 0; i < oInput.length-1; i++){
                    if(oInput[i].checked == true){
                        count++;
                        oInput[i].parentNode.childNodes[1].className = 'qb_icon icon_checkbox checked';
                    }else{
                        oInput[i].parentNode.childNodes[1].className = 'qb_icon icon_checkbox';
                    }
                }
                if(count == oI.length-1){//全中
                    oInput[oInput.length-1].checked = true;
                    oInput[oInput.length-1].parentNode.childNodes[1].className = 'qb_icon icon_checkbox checked';
                } else {
                    oInput[oInput.length-1].checked = false;
                    oInput[oInput.length-1].parentNode.childNodes[1].className = 'qb_icon icon_checkbox';
                }
            }

        }
        //全选
        oInput[oInput.length-1].onclick = function(){
            for(var i = 0; i < oInput.length-1; i++){
                oInput[i].checked = this.checked;
                if(this.checked){
                    for(var i = 0; i < oInput.length; i++){
                        if(oInput[i].type == 'checkbox'){
                            oInput[i].parentNode.childNodes[1].className = 'qb_icon icon_checkbox checked';
                        }
                    }
                }else{
                    for(var i = 0; i < oInput.length; i++){
                        if(oInput[i].type == 'checkbox'){
                            oInput[i].parentNode.childNodes[1].className = 'qb_icon icon_checkbox';
                        }
                    }
                }
            }
        }
        //计算金额
        
    }

   
    //商品详情展开
    var oInfo = document.getElementById('detail_info');
    if(oInfo){
        var oArrow = document.getElementById('info_arrow');
        oArrow.onclick = function(){
            animateOpen(oInfo);
        }
    }
    function animateOpen(el){
        if(el.className.indexOf("on") < 0){
            el.className = el.className +" on";
        }else{
            el.className = el.className.replace(" on","");
        }
    }


})();