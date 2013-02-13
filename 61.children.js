function Container(){};
Container.child_number = 1;
Container.prototype.children = {length:0};
Container.prototype._id = {};
Container.prototype.addChild = function(child){
    var self = this;
    if(!child._id)
        child._id = Container.child_number++;
    
    self.children[child._id] = child._id;
    self.children.length+=1;
    child.parent = self;
};

Container.prototype.removeChild = function(child){
    var self = this;
    if( self.children[child._id] ){
        self.children[child._id].parent = undefined;
        self.children[child._id] = undefined;
        self.children.length -= 1;
    }
}