the.cut
function start_point() {
    function run(e)
    {
        if(start_point.onse) {
            return;
        }

        start_point.onse = true;
        var head_element = document.getElementsByTagName("head")[0],
            scr = document.createElement('script');
        scr.type="text/javascript";
        scr.src=APP_PATH+"index.js";
        head_element.appendChild(scr);
    }
    
    start_point.onse = false;
    //Mozilla, Opera and webkit nightlies currently support this event
    if ( document.addEventListener ) {
        // Use the handy event callback
        document.addEventListener("DOMContentLoaded", run, false);
        
        // A fallback to window.onload, that will always work
        // window.addEventListener("load", start_point, false);
        
        // If IE event model is used
    } else if ( document.attachEvent ) {
        // ensure firing before onload,
        // maybe late but safe also for iframes
        document.attachEvent("onreadystatechange", run);
        
        // A fallback to window.onload, that will always work
        // window.attachEvent("onload", start_point);
    }
}
start_point();
the.cut