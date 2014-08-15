(function(win , scale){
    "use strict";
    var global = this,
    doc = document,
    slice = Array.prototype.slice,
    objectPrototype = Object.prototype,
    toString = objectPrototype.toString,
    concat = Array.prototype.concat,
    cssNumber = {
        "columnCount": true,
        "fillOpacity": true,
        "flexGrow": true,
        "flexShrink": true,
        "fontWeight": true,
        "lineHeight": true,
        "opacity": true,
        "order": true,
        "orphans": true,
        "widows": true,
        "zIndex": true,
        "zoom": true
    },
    empltyElem = doc.createElement('div'),
    toCamel = function(str){
        return str.replace(/-\w+/g, function(word){
            return word.substring(1,2).toUpperCase()+word.substring(2);
        })
    },
    $ = null,
    //工具类
    k = {
        version: '1.0.0',
        scale: scale,
        trim: function(srt){
            return 
        },
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
        isArrayLike: function(obj){
            return obj.length > 0 && (obj.length-1) in obj;
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
        isDocument: function(elem){
            return elem && (elem.nodeType === 9) && (elem.nodeName === "#document");
        },
        isWindow: function(elem){
            return elem && (elem == elem.window);
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
            return obj
        },
        merge: function( first, second ) {
            var len = +second.length,
            j,
            i = first.length;
            for ( j = 0; j < len; j++ ) {
                first[ i++ ] = second[ j ];
            }
            first.length = i;
            return first;
        },
        map: function(elems, callback, arg){
            var value,
            i = 0,
            length = elems.length,
            isArray = k.isArrayLike( elems ),
            ret = [];
            if ( isArray ) {
                for ( ; i < length; i++ ) {
                    value = callback( elems[ i ], i, arg );
                    if ( value != null ) {
                        ret.push( value );
                    }
                }
            } else {
                for ( i in elems ) {
                    value = callback( elems[ i ], i, arg );
                    if ( value != null ) {
                        ret.push( value );
                    }
                }
            }
            return concat.apply( [], ret );
        }
    }
    //return k;


    //扩展字符串级数组
    if(String.trim === undefined){
        String.trim = function(){
            return this.replace(/^\s+|\s+$/,'');
        }
    }



    //jquery 的实例化
    $ = function(selector, dom){
        return new $.prototype.init(selector, dom);
    }
    $.prototype = {
        length: 0,
        constructor: $,
        init: function(selector, dom){
            var elems = [],dom = dom || doc, self = this;
            if(!selector){
                return self;
            }
            if(k.isFunction(selector)){
                k.ready(selector);
            }else if(k.isString(selector)){
                if( /^#.[\w-]+$/.test(selector)){
                    selector = selector.replace('#','');
                    elems = dom.getElementById(selector);
                    if(elems){
                        self[0] = elems;
                        self.length = 1;
                    }
                    return self;
                }else if(/^\.[\w-]+$/.test(selector) && dom.getElementsByClassName){
                    selector = selector.replace('.','');
                    elems = dom.getElementsByClassName(selector);
                }else if(/\s*<\w[^>]*>/.test(selector)){
                    var div = empltyElem;
                    div.innerHTML = selector;
                    elems = div.childNodes;
                }else{
                    elems = dom.querySelectorAll(selector);
                }
            }else if(selector.nodeType === 1){
                self[0] = selector;
                self.length = 1;
            }else if(k.isWindow(selector) || k.isDocument(selector)){
                elems[0] = selector;
            }else{
                elems = selector;
            }

//            self.context = dom;
//            self.selector = selector;
            return k.extend(this.constructor(), elems);
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
            return k.each(this, function(k,v){
                callback.call(this,k,v);
            });
        },
        find: function(str){
            var self = this;
            if(str.nodeType == 1){
                return $(str);
            }else{
                var arr = [];
                this.each(function(){
                    k.each(this.querySelectorAll(str),function(k,v){
                        arr.push(v);
                    });
                });
                return $(arr);
            }
        },
        has: function(selector){
            var arr = [],
            self = this;
            if(k.isString(selector)){
                var arr = [];
                this.each(function(){
                   if( $(this).find(selector).size() > 0 ){
                       arr.push(this);
                   }
                }) 
                return $(arr);
            }else if(k.isObject(selector) && k.nodeType === 1){
                var arr = [];
                this.each(function(){
                   arr = k.merge(arr, this.contains(selector));
                });
                return $(arr);
            }
        },
        map: function(callback){
            return k.merge(this.constructor(), k.map(this, function(elem, i){
                return callback.call(elem, i, elem);
            }));
        },
        addClass: function(classes){
            classes = classes.trim();
            return this.each(function(){
                var self = this;
                self.className = self.className.trim();
                classes.split(/\s+/).forEach(function(val){
                    if( !( self.className.indexOf(val) > -1 )){
                        if(self.className === ''){
                            self.className = val;    
                        }else{
                            self.className += ' '+val;
                        }
                    }
                })
            });
        },
        removeClass: function(classes){
            return this.each(function(){
                var self = this;
                classes.split(/\s+/).forEach(function(val){
                    self.className = self.className.trim();
                    if( self.className.indexOf(val) > -1 ){
                        self.className = self.className.replace(classes,'');
                        self.className = self.className.trim().replace(/\s+/g,' ');
                    }
                });
            });
        },
        toggleClass: function(classes){
            return this.each(function(){
                self = this;
                classes.split(/\s+/).forEach(function(val){
                    self.className = self.className.trim();
                    if( self.className.indexOf(val) > -1){
                        self.className = self.className.replace(classes,'');
                        self.className = self.className.trim().replace(/\s+/g,' ');
                    }else{
                        if(self.className === ''){
                            self.className = val;    
                        }else{
                            self.className += ' '+val;
                        }
                    }
                });
            });
        },
        attr: function(name, val){
            var result;
            if(val){
                return this.each(function(){
                    this.setAttribute(name, val);
                });
            }else{
                this.each(function(){
                    result = this.getAttribute(name);
                    if(result){ return result };
                });
                return result;
            }
        },
        removeAttr: function(name){
            return this.each(function(){
                this.removeAttribute(name);
            });
        },
        html: function(str){
            if(str === undefined){
                if(this.length > 0){
                    return this[0].innerHTML; 
                }else{
                    return null;
                }
            }else{
                return this.each(function(){
                    this.innerHTML = str;
                });
            }
        },
        val: function(val){
            if(val === undefined){
                if(this.length > 0){
                    return this[0].value; 
                }else{
                    return null;
                }
            }else{
                return this.each(function(){
                    this.setAttribute('value',val);
                });
            }
        },
        //css相关属性
        css: function(property, value){
            var camel;
            if(k.isString(property)){
                camel = toCamel(property);
                if(value || value === 0){
                    this.each(function (){
                        if(k.isNumber(value)){
                            this.style[camel] = cssNumber[camel]? value : (k.isNumber(value) ? value+'px' : value); 
                        }else{
                            this.style[camel] = value; 
                        }
                    });
                }else{
                    return this.length > 0 ? (this[0].style.camel || getComputedStyle(this[0], null)[camel]) :  null;
                }
            }else{
                if(k.isObject(property)){
                    return this.each(function(){
                        var _this = this;
                        k.each(property, function(key, val){
                            camel = toCamel(key);
                            if(k.isNumber(val)){
                                _this.style[camel] = cssNumber[camel]? val : (k.isNumber(val) ? val+'px' : val); 
                            }else{
                                _this.style[camel] = val; 
                            }
                        });
                    });
                }
           }

        },
        offset: function(){
            var left = 0,
            top = 0,
            _this;
            if(this.length > 0){
                _this = this[0];
                while (_this.offsetParent) {
                    left += _this.offsetLeft;
                    top += _this.offsetTop;
                    _this = _this.offsetParent;
                }
                return {
                    "left": left,
                    "top": top
                }
            }
        },
        offsetParent: function(){
            return this.map(function(){
                var offsetParent = this.offsetParent || doc;
                while ( offsetParent && $(offsetParent).css( "position" ) === "static" ) {
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent || doc;
            });
        },
        position: function(){
            if ( !this[ 0 ] ) {
                return;
            }
            var offsetParent, offset,
            elem = this[ 0 ],
            parentOffset = { top: 0, left: 0 };
            if ( $(elem).css( "position" ) === "fixed" ) {
                offset = elem.getBoundingClientRect();
            } else {
                offsetParent = this.offsetParent();
                offset = this.offset();
            }
            return {
                top: offset.top - parentOffset.top - $(elem).css( "margin-top" ),
                left: offset.left - parentOffset.left - $(elem).css( "margin-left" )
            };
        },
        scrollTop: function(){
            if(this.length <= 0){
                return;
            }
            return ('scrollTop' in this[0] ? this[0].scrollTop : this[0].scrollY / ( scale || 1));
        },
        scrollTo: function(val){
            if(k.isNumber(val)){
                val = val * (scale || 1);
                window.scrollTo(0, val);
            }
        },
        //dom操作
        after: function(){

        },
        before: function(){

        },
        append: function(){

        },
        appendTo: function(){

        },
        clone: function(){

        },
        remove: function(){
            
        },
        empty: function(){

        },
        insetAfter: function(){

        },
        insetBefore: function(){
            
        },
        prepend: function(){
            
        },
        prependTo: function(){

        },
        relaceAll: function(){
            
        },
        replaceWidth: function(){

        },
        text: function(){

        },
        wrap: function(){
            
        },
        wrapAll: function(){
            
        },
        unwrap: function(){

        },
        next: function(){

        },
        prev: function(){

        },
        siblings: function(){

        },
        children: function(){

        },
        parent: function(){

        },
        parents: function(){

        }


    }
    ;['height','width'].forEach(function(v){
        $.prototype[v] = function(val){
            var elem = this[0],
            upV = v.replace(/\w/, function(str){return str[0].toUpperCase()});
            if(elem && (k.isWindow(this[0]) || k.isDocument(this[0]))){
                return window['inner' + upV]/(scale || 1) || doc.documentElement['offset' + upV]/(scale || 1);
            }

            if(val || val === 0){
                return this.css(v,val);
            }else{
                return this && $(this[0]).css(v);
            }
        }
    });
    $.prototype.init.prototype = $.prototype;
    window.kiki = $;
    window.kiki.util = k;


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





