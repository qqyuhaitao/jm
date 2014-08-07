(function(win , scale){
    "use strict";
    var global = this,
        doc = document,
        slice = Array.prototype.slice,
        objectPrototype = Object.prototype,
        toString = objectPrototype.toString,
        kiki = {
            version: "1.0.0",
            isBoolean: function(value){
                return typeof value === 'boolean';
            },
            isNumber: function(value){
                return typeof value === 'number' && isFinite(value);
            },
            isString: function(value){
                return typeof value === 'string';
            },
            isArray: function(object){
                return object && typeof object === 'object' && Array === object.constructor;
            },
            isElement: function(value){
                return value ? value.nodeType === 1 : false;
            },
            isFunction: function(value){
                return typeof value === 'function';
            },
            isObject: function(value){

            },
            isPainObject: function(value){

            }


        }


    



    var k = function(selector, dom){
        
    }

    k.prototype = {

    }


    k.extend = function(target, source, isCover, deep){


        
    }

    return k;

})(window, (function(){
    var scale = 1, 
    $wrapper = document.getElementById('wrapper'),
    $body = document.getElementsByTagName('body')[0],
    windowWidth = document.documentElement && document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth,
    scale = parseFloat(windowWidth / 320);
    $wrapper.style.zoom = scale;
    $body.style.display = 'block';
    return scale;
})());
