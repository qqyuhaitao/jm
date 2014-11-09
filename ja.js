
function error(msg,url,line){
    var REPORT_URL = "xxxx/cgi"; // 收集上报数据的信息
    var m =[msg, url, line, navigator.userAgent, +new Date];// 收集错误信息，发生错误的脚本文件网络地址，用户代理信息，时间
    var url = REPORT_URL + m.join('||');// 组装错误上报信息内容URL
    var img = new Image;
    img.onload = img.onerror = function(){
        img = null;
    };
    img.src = url;// 发送数据到后台cgi
}
window.onerror = function(msg,url,line){
    error(msg,url,line);
}



function _performance(){
    var REPORT_URL = "xxxx/cgi?perf=";
    var perf = (window.webkitPerformance ? window.webkitPerformance : window.msPerformance ),
    points = ['navigationStart','unloadEventStart','unloadEventEnd','redirectStart','redirectEnd','fetchStart','domainLookupStart','connectStart','requestStart','responseStart','responseEnd','domLoading','domInteractive','domContentLoadedEventEnd','domComplete','loadEventStart','loadEventEnd'];
    var timing = pref.timing;
    perf = perf  ? perf : window.performance;
    if( perf  && timing ) {
        var arr = [];
        var navigationStart = timing[points[0]];
        for(var i=0,l=points.length;i<l;i++){
            arr[i] = timing[points[i]] - navigationStart;
        }
        var url = REPORT_URL + arr.join("-");
        var img = new Image;
        img.onload = img.onerror = function(){
            img=null;
        }
        img.src = url;
    }







    <script>var cssLoadStart = +new Date</script>
    <link rel="stylesheet" href="xxx.css" type="text/css" media="all">
    <link rel="stylesheet" href="xxx1.css" type="text/css" media="all">
    <link rel="stylesheet" href="xxx2.css" type="text/css" media="all">
    <sript>
    var cssLoadTime = (+new Date) - cssLoadStart;
    var jsLoadStart = +new Date;
    </script>
    <script type="text/javascript" src="xx1.js"></script>
    <script type="text/javascript" src="xx2.js"></script>
    <script type="text/javascript" src="xx3.js"></script>
    <script>
    var jsLoadTime = (+new Date) - jsLoadStart;
    var REPORT_URL = 'xxx/cgi?data='
    var img = new Image;
    img.onload = img.onerror = function(){
        img = null;
    };
    img.src = REPORT_URL + cssLoadTime + '-' + jsLoadTime;
    </script>
