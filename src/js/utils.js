window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();

$.UTILS = {};
$.UTILS.clamp = function(v, min, max) {
    return v < min ? min : (v > max ? max : v);
};