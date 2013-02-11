global.namespace = function (ns, module) {
    var path = ns.split('.'),
        l = path.length,
        i = 0,
        parent = global,
        class_name,
        class_constructor;
    
    for (i; i < l - 1; i++) {
        parent[path[i]] = parent[path[i]] || {};
        parent = parent[path[i]];
    }
    
    
    if (module.require !== undefined) {
        
        module.require.push(function() {
            delete module.require;
            
            for (class_name in module) {
                if (!module.hasOwnProperty(class_name)) continue;
                class_factory(module, class_name);
                parent[path[l-1]] = parent[path[l-1]] || {};
                parent[path[l-1]][class_name] = module[class_name];
            }
        });
        
        include.apply(global, module.require);
    } else {
        for (class_name in module) {
            if (!module.hasOwnProperty(class_name)) continue;
            class_factory(module, class_name);
            parent[path[l-1]] = parent[path[l-1]] || {};
            parent[path[l-1]][class_name] = module[class_name];
        }
    }
};