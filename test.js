define('a',function(){
    //执行代码
    return 'aaaaaaaaaa'
});
(function(win , scale){
    var global = this,
        doc = document,
        slice = Array.prototype.slice,

    objectPrototype = Object.prototype,
    toString = objectPrototype.toString,

    



    var Jm = function(selector, dom){
        
    }

    Jm.prototype = {
    }


    Jm.extend = function(target, source, isCover, deep){


        
    }


})(window, function(){
    var scale = 1, 
    $wrapper = document.getElementById('wrapper'),
    $body = document.getElementsByTagName('body')[0],
    windowWidth = document.documentElement && document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth,
    scale = parseFloat(windowWidth / 320);
    $wrapper.style.zoom = scale;
    $body.style.display = 'block';
    return scale;
});
