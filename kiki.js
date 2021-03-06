(function(win , scale){
    "use strict";
    var global = this,
    doc = document,
    slice = Array.prototype.slice,
    objectPrototype = Object.prototype,
    toString = objectPrototype.toString,
    concat = Array.prototype.concat,
    filter = Array.prototype.filter,
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
    uniq = function(array){
        return filter.call(array, function(value, key){
            return array.indexOf(value) == key;
        });
    },
    strToNode = function(str){
        var elems;
        if(k.isString(str)){
            empltyElem.innerHTML = str;
            elems = empltyElem.childNodes;
            return elems;
        }else{
            return str;
        }
    },
    nodeEach = function(node, callback){
        var cloneNode = null;
        k.each(node, function(){
             cloneNode = this.cloneNode(true);
             callback.call(cloneNode);
        })
    },
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
                    value = callback.call( elems[ i ], elems[i], i, arg );
                    if ( value != null ) {
                        ret.push( value );
                    }
                }
            } else {
                for ( i in elems ) {
                    value = callback.call( elems[ i ], elems[i], i, arg );
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



    //jquery 的实例化 dom操作库
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
                    elems = strToNode(selector);
                }else{
                    elems = dom.querySelectorAll(selector);
                }
            }else if(selector.nodeType === 1){
                self[0] = selector;
                self.length = 1;
                return self;
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
        not: function( str ){
            var arr = [], strArr, len;
            if(str && str.nodeType == 1){
                arr = filter.call(this, function(value){
                    if(value != str){ 
                        return true;
                    }else{
                        return false;
                    }
                })
                return $(arr);
            }else if(k.isString(str)){
                strArr = $(str),len = strArr.length;
                arr = filter.call(this, function(val){
                    for(var i = 0; i < len; i++){
                        if(strArr[i] === val){
                            return false;
                        }
                    }
                    return true;
                })
                return $(arr);
            }
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
        after: function(str){
            var elem,
            _this,
            node = strToNode(str);
            this.each(function(){
                _this = this;
                elem = this.nextSibling;
                if(elem){
                    nodeEach(node, function(){
                        elem.parentNode.insertBefore(this , elem);
                    })
                }else{
                    nodeEach(node, function(){
                        _this.parentNode.appendChild(this);
                    })
                }
            });
            return this;
        },
        before: function(str){
            var elem,
            _this = this,
            cloneNode = null,
            node = strToNode(str);
            this.each(function(){
                _this = this;
                if(_this){
                    nodeEach(node, function(){
                        _this.parentNode.insertBefore(this,_this);
                    })
                }
            });
            return this;
        },
        append: function(str){
            var elems = null, _this;
            return this.each(function(){
                if(str.nodeType === 1){
                    this.appendChild(str)
                }else{
                    _this = this;
                    elems = $(str);
                    nodeEach(elems, function(){
                        _this.appendChild(this);
                    })
                }
            });
        },
        appendTo: function(elem){
            $(elem).append(this);
            return this;
        },
        prepend: function(str){
            var _this = null,
            firstChild = null;
            return this.each(function(){
                _this = this;
                firstChild = _this.childNodes[0];
                if(firstChild){
                    $(str).each(function(){
                        _this.insertBefore(this, firstChild);
                    })
                }else{
                    $(_this).append(str);
                }
            });
        },
        prependTo: function(elem){
            $(elem).prepend(this);
            return this;
        },
        clone: function(){
            return this.map(function(){
                return this.cloneNode(true);
            })
        },
        remove: function(){
            return this.each(function(){
                if(this.parentNode){
                    this.parentNode.removeChild(this);
                }
            })
        },
        empty: function(){
            return this.each(function(){
                this.innerHTML = '';
            })
        },
        insertAfter: function(elem){
            var self = this,
            _this = null,
            parent = null,
            nextSibling = null;
            $(elem).each(function(){
                _this = this;
                nextSibling = _this.nextSibling;
                parent = _this.parentNode;
                if(parent && parent.lastChild == _this){
                    parent.appendChild(this);
                    self.each(function(){
                        parent.appendChild(this);
                    })
                }else{
                    self.each(function(){
                        parent.insertBefore(this, nextSibling);
                    })
                }
            })
            return this;
        },
        insertBefore: function(elem){
            var self = this,
            _this = null;
            if(elem && elem.nodeType === 1){
                return self.each(function( k , v ){
                    elem.parentNode && elem.parentNode.insertBefore(this, v);
                })
            }else if(k.isString(elem)){
                return self.each(function(){
                    _this = this;
                    k.each($(elem), function( k , v ){
                        this.parentNode && this.parentNode.insertBefore(_this, v);
                    })
                })
            }else{
                return this;
            }
        },
        replaceWith: function(elem){
            var node = strToNode(elem),
            _this = null;
            return this.each(function(){
               _this = this;
                nodeEach(node, function(){
                   _this.parentNode.insertBefore(this, _this);
                });
                this.parentNode.removeChild(_this);
            });
        },
        replaceAll: function(elem){
            var _this = null,
            self = this;
            $(elem).each(function(){
                _this = this;
                self.each(function(){
                    _this.parentNode.insertBefore(this, _this);
                });
                _this.parentNode.removeChild(_this);
            })
            return this;
        },
        text: function(str){
            if(str && str != ''){
                return this.each(function(){
                    this.innerText = str;
                })
            }else{
                return this &&this[0].innerText;
            }
        },
        wrapAll: function(elem){
            var child = null,
            wrap = strToNode(elem);
            this[0] && this[0].parentNode.insertBefore(child = wrap[0],this[0]);
            while(child.children[0]){
                child = child.children[0];
            }
            child.appendChild(this[0]);
            return this;
        },
        wrap: function(elem){
            return this.each(function(){
                $(this).wrapAll(elem);
            });
        },
        unwrap: function(){
            return this.each(function(){
                $(this.parentNode).replaceWith(this.parentNode.children);
            })
        },
        next: function(){
            return this.map(function(){
                return this.nextElementSibling;
            })
        },
        prev: function(){
            return this.map(function(val){
                return this.previousElementSibling;
            })
        },
        siblings: function(){
            var arr = [],siblings;
            return this.map(function(){
                siblings = this.privousElementSibing;
                while(siblings){
                    arr.push.siblings;
                    siblings = siblings.privousElementSibing;
                }
                siblings = this.nextElementSibling;
                while(siblings){
                    arr.push(siblings);
                    siblings = siblings.nextElementSibing;
                }
                return arr;
            });
        },
        children: function(){
            return this.map(function(){
                if(this.children){
                    return k.map(this.children,function(){
                        return this;
                    })
                }
            })
        },
        parent: function(){
            return this.map(function(){
               return this.parentNode;
            });
        },
        parents: function(str){
            var arr,
            parent;
            return this.map(function(){
                arr = [];
                parent = this.parentNode;
                if(str && str != ''){
                    while(parent && (parent == $(str)[0])){
                        arr.push(parent);
                        parent = parent.parentNode;
                    }
                }else{
                    while(parent){
                        arr.push(parent);
                        parent = parent.parentNode;
                    }
                }
                return arr;
            });
        }


    }
    //获取元素的高度，不包括padding以及border
    ;['height','width'].forEach(function(v){
        $.prototype[v] = function(val){
            var elem = this[0],
            cssStyle = 0,
            offsetStyle = 0,
            clientStyle = 0,
            upV = v.replace(/\w/, function(str){return str[0].toUpperCase()});
            if(elem && (k.isWindow(this[0]) || k.isDocument(this[0]))){
                return window['inner' + upV]/(scale || 1) || doc.documentElement['offset' + upV]/(scale || 1);
            }

            if(val || val === 0){
                return this.css(v,val);
            }else{
                cssStyle = $(this[0]).css(v);
                if(this && cssStyle){
                    return cssStyle;
                }else{
                    clientStyle = this[0]['client' + upV] - $(this[0]).css('padding-' + upV);
                    return clientStyle >= 0 ? clientStyle : this[0]['offset' + upV] - $(this[0]).css('padding-' + upV);
                }
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
    windowWidth = document.documentElement && 
    document.documentElement.clientWidth || 
    document.body.clientWidth || 
    window.innerWidth,
    scale = parseFloat(windowWidth / 320);
    $wrapper.style.zoom = scale;
    $body.style.display = 'block';
    return scale;
})());





