$.w = window;
$.d = document;

$.CNV = {game: null, ui: null, crt: null}; // TODO: Remove for build
$.CTX = {game: null, ui: null, crt: null}; // TODO: Remove for build

$.W = 640;
$.H = 360;

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
  /*
   * Update player
   * Update enemies
   * Update post-processing
   * */

  $.PLAYER.update(dt);

  $.BACKGROUND.update(dt);


  if(Math.random() < $.LEVELS.glitch_spawn_chance[$.LEVEL]) $.GLITCHES.add();
  //if(Math.random() < 0.005) $.CLOUDS.add();
  if(Math.random() < $.LEVELS.sombrero_spawn_chance[$.LEVEL]) $.SOMBREROS.add();

  $.GLITCHES.update(dt);
  $.SOMBREROS.update(dt);
  $.CLOUDS.update(dt);
  $.PEYOTES.update(dt);
};
$.render = function () {
  /*
   * Render bg
   * Render player
   * Render enemies
   * Render UI
   * Apply post-processing
   * */

  $.canvasesToRedraw.forEach(function (c) {
    $.CTX[c].clearRect(0, 0, innerWidth, innerHeight);
  });

  // Render bg
  //$.CTX.game.drawImage($.GFX.bg.canvas, 0, 0, $.W, $.H);
  $.BACKGROUND.render();

  // Render peyotes
  $.PEYOTES.render();

  // Render SOMBREROS
  $.SOMBREROS.render();

  // Render player
  $.PLAYER.render();

  // Render clouds
  $.CLOUDS.render();

  // Apply post-processing
  $.GLITCHES.render();

  $.UI.render();
};

$.w.onload = $.init;