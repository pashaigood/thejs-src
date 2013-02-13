the.extend = function(Child, Parent) {
    var proto = Child.prototype, 
        prop,
        F = function() {};
        
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    
    for (prop in proto) {
        Child.prototype[prop] = proto[prop];
    }
    
    if (typeof(Parent) == 'function') {
        Child.prototype._supers = Child.prototype._supers || [];
        Child.prototype._supers.push(Parent);
    }
    
    Child.prototype.Super = the.extend.Super; 
};

the.extend.Super = function() {
    var length = this._supers.length;
    while(--length > -1) {
        this._supers[length].apply(this, arguments);
    }
};

