var child_number = 1;

Object.prototype.children = {length:0};
Object.prototype._id = {};

Object.prototype.addChild = function(child){
    var self = this;
    if(!child._id)
        child._id = child_number++;
    
    self.children[child._id] = child._id;
    self.children.length+=1;
    child.parent = self;
};

Object.prototype.removeChild = function(child){
    var self = this;
    if( self.children[child._id] ){
        self.children[child._id].parent = undefined;
        self.children[child._id] = undefined;
        self.children.length -= 1;
    }
}