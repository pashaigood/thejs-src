function EventDispatcher(){}
(function(EventDispatcher){

var prototype = EventDispatcher.prototype;
prototype.on = function(event, handler){
    var self = this;
    self._listener = self._listener || {};
    self._listener[event] = self._listener[event] || [];
    self._listener[event].push(handler);
};

prototype.off = function(event) {
    delete self._listener[event];
}

prototype.play = function(event){
    var self = this,
        args = Array.prototype.slice.call(arguments),
        toReturn = true,
        tmpReturn;
    args.shift();
    
    if (self._listener != undefined && self._listener[event] != undefined) {
        var l = self._listener[event].length;
        while( (l -= 1) >= 0){
            tmpReturn = self._listener[event][l].apply(self, args);
            if (typeof(tmpReturn) == "boolean" && typeof(toReturn) == "boolean"){
                toReturn = Boolean(toReturn & tmpReturn);
            } else {
                toReturn = typeof(toReturn) == "boolean" ? [] : toReturn;
                toReturn.push(tmpReturn);
            }
        }
    }
    
    return toReturn;
};
})(EventDispatcher);