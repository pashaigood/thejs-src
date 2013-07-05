global.include = the.js = function() {
    var start_point = Array.prototype.pop.call(arguments);
    function run() {
        if (document.removeEventListener) {
            document.removeEventListener("DOMContentLoaded", run, false);
        } else if (document.detachEvent) {
            document.detachEvent("onreadystatechange", run);
        }
        start_point();
    }
    
    
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
the.cut;
global.include = the.js = function() {
    var args = arguments,
        cnt = args.length - 1,
        path,
        sub_requires;
        
    if (cnt < 0) {
        return;
    }
    
    if(typeof(args[cnt]) == 'function') {
        if (! cnt) {
            args[cnt]();
            return;
        }
        
        include.data.funcs.push(Array.prototype.pop.call(args)); 
    }
    
    var script = Array.prototype.shift.call(args);
    //TODO: make full sync script upload
    if (script) {
        if (include.data.cache[script]) {
            include.apply(global, args);
            return;
        }
        include.data.start += 1;
        include.data.cache[script] = 1;
        create_script(
            URL + script.replace(/\./ig, '/') + '.js',
            function() {
                if (args.length) {
                    include.apply(global, args);
                }
                include.data.callback();
            },
            include.data.callback
        );
    }
};

include.data = {start : 0, ready : 0, funcs : [], cache : {}};
include.data.callback = function() {
    include.data.ready += 1;
    if(include.data.ready == include.data.start) {
        var length = include.data.funcs.length,
            func;
        while((length -= 1) > -1){
            func = include.data.funcs.pop();
            func();
        }
    }
};
the.cut