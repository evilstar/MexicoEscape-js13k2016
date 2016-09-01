$.PLAYER = {
  score: 0,
  baseX: 100,
  x: 100,
  y: 0,
  velY: 0,
  yOffset: 0,
  yOffsetSpeed: 10,
  yOffsetDir: 1,
  yOffsetMax: 10,
  inAir: false,
  collisionBox: new $.RECT(100, 0, $.GFX.player.w - 7, $.GFX.player.h - 10)
};

$.PLAYER.getScreenY = function() {
  return $.PLAYER.y - $.PLAYER.yOffset + $.H - $.GFX.player.h - 10;
};

$.PLAYER.update = function(dt) {
  if($.KEYBOARD.KEYS[38] == $.KEYBOARD.STATE.PRESSED && !$.PLAYER.inAir) {
    $.PLAYER.inAir = true;
    $.PLAYER.velY = -25;
  }

  if($.PLAYER.inAir)
    $.PLAYER.velY -= $.G * dt;

  $.PLAYER.y += $.PLAYER.velY;

  if($.PLAYER.inAir) {
    if($.PLAYER.y > 0) {
      $.PLAYER.velY = 0;
      $.PLAYER.y = 0;
      $.PLAYER.inAir = false;
    }
  }

  $.PLAYER.collisionBox.y = $.PLAYER.getScreenY();

  $.PLAYER.yOffset += $.PLAYER.yOffsetSpeed * $.PLAYER.yOffsetDir * dt;
  if($.PLAYER.yOffset >= $.PLAYER.yOffsetMax) {
    $.PLAYER.yOffset = $.PLAYER.yOffsetMax;
    $.PLAYER.yOffsetDir = -1;
  } else if($.PLAYER.yOffset <= 0) {
    $.PLAYER.yOffset = 0;
    $.PLAYER.yOffsetDir = 1;
  }

  if($.DEAD) {
    if(this.x > -$.GFX.player.w)
      this.x -= 200 * dt;
  }
};

$.PLAYER.render = function() {
  var scale = $.UTILS.clamp(1 - $.PLAYER.y / -100, 0, 1);
  //console.clear();
  //console.log(scale);
  $.CTX.game.save();
  $.CTX.game.globalAlpha = scale * 0.25;
  $.CTX.game.fillStyle = "#000";
  $.CTX.game.beginPath();
  $.CTX.game.ellipse(this.x + 10, $.H - 10, 25 * scale, 7 * scale, 0, Math.PI * 2, false);
  $.CTX.game.fill();
  $.CTX.game.restore();

  $.CTX.game.drawImage($.GFX.player.canvas, this.x, $.PLAYER.getScreenY(), $.GFX.player.w, $.GFX.player.h);

  /*$.CTX.ui.strokeStyle = "blue";
  $.CTX.ui.strokeRect(
    $.PLAYER.collisionBox.x,
    $.PLAYER.collisionBox.y,
    $.PLAYER.collisionBox.w,
    $.PLAYER.collisionBox.h
  );*/
};