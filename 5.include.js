global.include = function() {
    var args = arguments,
        cnt = args.length - 1,
        path;
    if (cnt < 0) {
        return;
    }
    
    if(typeof(args[cnt]) == 'function') {
        if (! cnt) {
            args[cnt]();
            return;
        }
        
        include.data.funcs.push(args[cnt]); 
    }
    
    for(var i=0; i < cnt; i++) {
        path = arguments[i];
        if (include.data.cache[path]) {
            continue;
        }
        include.data.start += 1;
        include.data.cache[path] = 1;
        
        create_script(
            URL + path.replace(/\./ig, '/') + '.js',
            include.data.callback,
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
