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
    
    if (! module) {
        return parent[path[i]];
    }
    
    the.cut;
    if (module.require != undefined) {
        var require = module.require;
        delete module.require;
        require.push(function() {
            ns.cns(module, parent, path, l); 
        });
        include.apply(global, require);
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
        
        if (
            typeof(module[class_name]) == 'object'
                &&
            module[class_name][class_name]
        ) {
            the.class_factory(module, class_name, path.join('.'));
        }
        
        the.cut; 
        if (module[class_name].prototype) {
            module[class_name].prototype.log = function() {
                var temp = {};
                the.extend(temp, this)
                console.group(path.join('.') + '.' + class_name);
                console.log(temp);
                console.groupEnd();
                temp = undefined;
            }
        }
        the.cut;
         
        parent[path[length-1]] = parent[path[length-1]] || {};
        parent[path[length-1]][class_name] = module[class_name];
    }
}
