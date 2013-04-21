function create_script(path, callback, on_error) {
    var head_element = document.getElementsByTagName("head")[0],
        scr = document.createElement('script'),
        width_error = width_error || true;
    scr.type = "text/javascript";
    scr.src = path;
    the.cut;
    scr.src = path + "?rand=" + Math.round(Math.random() * 10000 * 10000);
    the.cut;
    scr.done = false;
    
    scr.onload = scr.onreadystatechange = function() {
      if ( !scr.done && (!global.readyState ||
                global.readyState === "loaded" || global.readyState === "complete") ) {
            scr.done = true;
            callback();
            scr.onload = scr.onreadystatechange = null;
        }
    };
    scr.onerror = on_error;
    head_element.appendChild(scr);
}