global.include = function() {
    var args = arguments,
        cnt = args.length - 1,
        path,
        i = 0;
    for (i; i < cnt; i++) {
        path = args[i].replace(/\./g, PS);
        require(APP_PATH + path);
    }
    
    if (typeof(args[cnt]) == 'function') {
        args[cnt]();
    }
};
