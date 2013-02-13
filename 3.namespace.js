global.namespace = function (ns, module) {
    var path = ns.replace(/\//g, '.').split('.'),
        l = path.length,
        i = 0,
        parent = global,
        class_name,
        class_constructor;
    
    for (i; i < l - 1; i++) {
        parent[path[i]] = parent[path[i]] || {};
        parent = parent[path[i]];
    }
    
    if (typeof(module) == 'function') {
        var requires = module.toString()
            .replace(/\s/g, '')
            .match(/require\s*:\s*\[(.*?)\]/)[1].split(',');
        
        requires.push(function() {
           module = module();
           delete module.require;
           namespace.create_module(module, parent, path, l); 
        });
        
        include.apply(global, requires);
    } else if (module.require !== undefined) {
        module.require.push(function() {
            delete module.require;
            
           namespace.create_module(module, parent, path, l); 
        });
        
        include.apply(global, module.require);
    } else {
        namespace.create_module(module, parent, path, l); 
    }
};

namespace.create_module = function(module, parent, path, length) {
    for (var class_name in module) {
        if (!module.hasOwnProperty(class_name)) continue;
        the.class_factory(module, class_name);
        parent[path[length-1]] = parent[path[length-1]] || {};
        parent[path[length-1]][class_name] = module[class_name];
    }
}
