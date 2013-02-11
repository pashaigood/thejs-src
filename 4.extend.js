global.extend = function(Child, Parent) {
    var proto = Child.prototype, 
        prop,
        F = function() {};
        
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    
    for (prop in proto) {
        Child.prototype[prop] = proto[prop];
    }
    Child.superclass = Parent.prototype;
};
