var global = window || global, the = {};

(function(){
    var scripts = document.getElementsByTagName('script'),
        script = scripts[scripts.length-1],
        path = script.src.split('?')[0];
        global.APP_PATH = script.getAttribute('path') || path.split('/').slice(0, -1).join('/')+'/';
})();
        