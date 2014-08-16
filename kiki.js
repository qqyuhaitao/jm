(function(win , scale){
    "use strict";
    var global = this,
    doc = document,
    slice = Array.prototype.slice,
    objectPrototype = Object.prototype,
    toString = objectPrototype.toString,
    $ = null,
    //工具类
    k = {
        version: '1.0.0',
        scale: scale,
        setScale: function(scale){
            this.scale = scale; 
        },
        getScale: function(){
            return this.scale;
        },
        isBoolean: function(value){
            return typeof value === 'boolean';
        },
        isNumber: function(value){
            return typeof value === 'number' && isFinite(value);
        },
        isString: function(value){
            return typeof value === 'string';
        },
        isArray: function(value){
            return value && typeof value === 'object' && Array === value.constructor;
        },
        isElement: function(value){
            return value ? value.nodeType === 1 : false;
        },
        isFunction: function(value){
            return typeof value === 'function';
        },
        isObject: function(value){
            return value && typeof value === 'object' && Object === value.constructor;
        },
        isPainObject: function(value){
            return toString.call(value)==='[object Object]';
        },
        makeArray: function(likeArray){
            return slice.call(likeArray);
        },
        extend: function(){
            var res = {},
            argsArr;
            if(arguments.length > 1){
                res = arguments[0];
                argsArr = slice.call(arguments, 1);
                argsArr.forEach(function(v){
                    for(var i in v){
                        if(v.hasOwnProperty(i)){
                            res[i] = v[i];
                        }
                    }
                })
            }                
            return res;
        },
        ready: function(callback){
            if(/complete|loaded|interactive/.test(doc.readyState)){
                callback.call(k)
            } else {
                doc.addEventListener('DOMContentLoaded', function(){
                    callback.call(k);
                }, false)
            }
        },
        each: function(obj, callback){
            if(this.isNumber(obj.length)){
                for(var i = 0, len = obj.length; i < len; i++){
                    callback.call(obj[i], i, obj[i]);
                }
            }else{
                for(var i in obj){
                    callback.call(obj[i], i, obj[i]);
                }
            }
        },


    }
    //return k;





    //jquery 的原型连
    $ = function(selector, dom){
        return new $.prototype.init(selector, dom);
    }
    $.prototype = {
        length: 0,
        init: function(selector, dom){
            var elems = [],dom = dom || doc, self = this;
            if(!selector){
                return self;
            }
            if(k.isFunction(selector)){
                k.ready(selector);
            }else if(k.isString(selector)){
                if( /^#.+$/.test(v)){
                    v = v.replace('#','');
                    elems = dom.getElementById(v);
                    self[0] = elems || [];
                    return self;
                }else if(/^\..+$/.test(v) && dom.getElementsByClassName){
                    v = v.replace('.','');
                    elems = dom.getElementsByClassName(v);
                }else{
                    elems = dom.querySelectorAll(v);
                }
            }else if(selector.nodeType === 1){
                self[0] = selector;
                self.length = 1;
            }else{
                self.dom = dom;
            }

            self.context = dom;
            self.selector = selector;
            return k.extend(this, elems);
        },
        size: function(){
            return this.length;
        },
        first: function(){
            return this.eq(0);
        },
        last: function(){
            return this.eq(this.length - 1); 
        },
        eq: function(index){
            if(index>=0 && index < (this.length-1)){
                return $(this[index]);
            }
        },
        each: function(callback){
            k.each(this, function(k,v){
                callback.call(this,k,v);
            });
        },
        find: function(str){
            var self = this;
            if(str.nodeType == 1){
                return $(str);
            }else if(this.length == 1){
                return $(str, this[0]);
            }else{
                this.each(function(){
                    this.querySelectorAll(str);
                });
            }
        },
        addClass: function(){
            this.each(function(){

            });
        },
        removeClass: function(){

        },
        toggleClass: function(){

        },
        attr: function(){

        },
        html: function(){

        },
        css: function(){

        }
    }

    $.prototype.init.prototype = $.prototype;
    window.kiki = $;









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





