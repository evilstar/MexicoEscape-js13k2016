$.CNV = {game: null, ui: null, crt: null}; // TODO: Remove for build
$.CTX = {game: null, ui: null, crt: null}; // TODO: Remove for build

$.G = -9.8 * 10 / 1.25;

$.canvases = ["game", "ui", "crt"];
$.canvasesToRedraw = ["game", "ui"];
$.init = function () {
  $.canvases.forEach(function (c) {
    $.CNV[c] = $.d.createElement("canvas");
    $.CNV[c].id = "cnv_" + c;
    $.CTX[c] = $.CNV[c].getContext('2d');

    $.CNV[c].mozImageSmoothingEnabled = false;
    $.CNV[c].webkitImageSmoothingEnabled = false;
    $.CNV[c].imageSmoothingEnabled = false;

    $.CNV[c].width = $.W;
    $.CNV[c].height = $.H;

    $.d.body.appendChild($.CNV[c]);
  });

  //$.resize();

  //$.w.addEventListener("resize", $.resize);

  $.KEYBOARD.init();

  $.CRT.init();

  $.unpackGFX(function () {
    $.loop();
  });
};

$.resize = function () {
  $.W = innerWidth;
  $.H = innerHeight;
  $.canvases.forEach(function (c) {
    $.CNV[c].width = $.W;
    $.CNV[c].height = $.H;
  });
};

$.lsts = 0;

$.loop = function () {
  requestAnimFrame($.loop);

  var ts = Date.now();
  if (!$.lsts) $.lsts = ts;
  var dt = (ts - $.lsts) / 1e3;
  $.lsts = ts;

  $.update(dt);
  $.render();
};
$.update = function (dt) {
  if($.DEAD && $.UI.menuShowing && $.KEYBOARD.KEYS[32] > $.KEYBOARD.STATE.UP) {
    $.PLAYER.revive();
  }

  $.UI.update(dt);

  $.PLAYER.update(dt);

  $.SPEED.update(dt);
  $.BACKGROUND.update(dt);

  if(Math.random() < $.LEVELS.glitch_spawn_chance[$.LEVEL]) $.GLITCHES.add();
  if(Math.random() < $.LEVELS.sombrero_spawn_chance[$.LEVEL]) $.SOMBREROS.add();

  $.GLITCHES.update(dt);
  $.SOMBREROS.update(dt);
  $.PEYOTES.update(dt);
};
$.render = function () {

  $.canvasesToRedraw.forEach(function (c) {
    $.CTX[c].clearRect(0, 0, innerWidth, innerHeight);
  });

  $.BACKGROUND.render($.CTX.game);
  $.PEYOTES.render($.CTX.game);
  $.SOMBREROS.render($.CTX.game);
  $.PLAYER.render($.CTX.game);
  $.GLITCHES.render($.CTX.game);
  $.UI.render($.CTX.ui);
};

$.w.onload = $.init;