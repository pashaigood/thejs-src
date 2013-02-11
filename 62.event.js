Object.prototype.on = function(event, handler){
    var self = this;
    self._listener = self._listener || {};
    self._listener[event] = self._listener[event] || [];
    self._listener[event].push(handler);
};

Object.prototype.play = function(event){
    var self = this,
        args = Array.prototype.slice.call(arguments);
    args.shift();
    
    if (self._listener != undefined && self._listener[event] != undefined) {
        var l = self._listener[event].length;
        while( (l -= 1) >= 0){
            self._listener[event][l].apply(self, args);
        }
    }
};