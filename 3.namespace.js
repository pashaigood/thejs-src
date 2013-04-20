/**
 * 
 * The function creates a new namespace with its description
 * @param {String} ns_name the way to the current space
 * @param {Object} module description of the space
 */
global.namespace = global.ns = function (ns_name, module) {
    var path = ns_name.replace(/\//g, '.').split('.'),
        l = path.length,
        i,
        parent = global,
        class_name,
        class_constructor;
    
    for (i = 0; i < l - 1; i++) {
        parent[path[i]] = parent[path[i]] || {};
        parent = parent[path[i]];
    }
    
    the.cut;
    //if namespace require libs
    if (typeof(module) == 'function') {
        var requires = module.toString()
            .replace(/\s/g, '')
            .match(/require\s*:\s*\[(.*?)\]/)[1].replace(/['"]/g, '').split(',');
        
        requires.push(function() {
           module = module();
           delete module.require;
           ns.cns(module, parent, path, l); 
        });
        
        include.apply(global, requires);
        return;
    } else if (module.require !== undefined) {
        module.require.push(function() {
            delete module.require;
           ns.cns(module, parent, path, l); 
        });
        
        include.apply(global, module.require);
        return;
    }
    the.cut;
    
    ns.cns(module, parent, path, l); 
};

/**
 *  
 * functoin create_namespace
 * @param {Object} module
 * @param {Object} parent
 * @param {Array} path
 * @param {Number} length
 */
ns.cns = function(module, parent, path, length) {
    for (var class_name in module) {
        if (!module.hasOwnProperty(class_name)) continue;
        
        the.class_factory(module, class_name);
        parent[path[length-1]] = parent[path[length-1]] || {};
        
        the.cut;
        //super kostil
        var test;
        var str_path = path.join('.') + "." + class_name;
        var function_body = str_path + " = function() {" +
            "the.extend(this, new this.constructor(arguments))}; " +
            str_path + ".toString = function() {return '" + str_path + "'};" +
            "return " + str_path;
        var temp = Function(function_body );
        test = temp();
        test.prototype.constructor = module[class_name];
        the.extend(test, module[class_name], true);
        module[class_name] = test;
        the.cut;
        
        parent[path[length-1]][class_name] = module[class_name];
    }
}
