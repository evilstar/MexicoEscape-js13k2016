$.BACKGROUND = {
  layers: 3,
  offset: [0, 0, 0]
};

$.BACKGROUND.update = function(dt) {
  for(var i = 0;i < $.BACKGROUND.layers ; i++) {
    $.BACKGROUND.offset[i] += $.LEVELS.bg_layer_speed[i][$.LEVEL] * dt;
    $.BACKGROUND.offset[i] += $.BACKGROUND.offset[i] <= -$.W ? $.W : 0;
  }
};
$.BACKGROUND.render = function() {
  var grd = $.CTX.game.createLinearGradient(0, 0, 0, $.H);
  grd.addColorStop(0, "#749dc8");
  grd.addColorStop(1, "#d5c3b2");
  $.CTX.game.fillStyle = grd;
  $.CTX.game.fillRect(0, 0, $.W, $.H);

  for(var i = 0;i < $.BACKGROUND.layers ; i++) {
    $.CTX.game.drawImage($.GFX["bg_layer_" + (i + 1)].canvas, $.BACKGROUND.offset[i] + $.W, $.H - $.GFX["bg_layer_" + (i + 1)].h);
    $.CTX.game.drawImage($.GFX["bg_layer_" + (i + 1)].canvas, $.BACKGROUND.offset[i]      , $.H - $.GFX["bg_layer_" + (i + 1)].h);
  }
};