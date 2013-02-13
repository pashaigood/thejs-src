/*window.onerror=function(msg, url, linenumber){
//   alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber)
    console.log('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
     return true
    }*/
(function() {
    var scripts = document.getElementsByTagName('script'),
        path = scripts[scripts.length-1].src.split('?')[0];
        global.URL = path.split('/').slice(0, -1).join('/')+'/';
        // for debuging just uncomment
        global.URL += '../';
        
    function start_point(e)
    {
        if(start_point.onse) {
            return;
        }

        start_point.onse = true;
        var head_element = document.getElementsByTagName("head")[0],
            scr = document.createElement('script');
        scr.type="text/javascript";
        scr.src=URL+"index.js";
        /*scr.onload = function() {
            global.index();
        };*/
        
        head_element.appendChild(scr);
    }
    start_point.onse = false;
//Mozilla, Opera and webkit nightlies currently support this event
    if ( document.addEventListener ) {
        // Use the handy event callback
        document.addEventListener("DOMContentLoaded", start_point, false);
        
        // A fallback to window.onload, that will always work
//      window.addEventListener("load", start_point, false);
        
// If IE event model is used
    } else if ( document.attachEvent ) {
        // ensure firing before onload,
        // maybe late but safe also for iframes
        document.attachEvent("onreadystatechange", start_point);
        
        // A fallback to window.onload, that will always work
//      window.attachEvent("onload", start_point);
    }
})();