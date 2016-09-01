$.SOMBREROS = {
  list: []
};

$.SOMBRERO = function() {
  var yOffset = 30;

  this.x = $.W;
  this.y = Math.random() * 30 + yOffset;
  this.velX = Math.random() * (-100) - 50;
  this.type = Math.floor(Math.random() * 2);

  this.scale = (this.y - yOffset) / 30 * 0.4 + 0.2;

  this.destroyed = false;
};

$.SOMBRERO.prototype.update = function(dt) {
  this.x += this.velX * dt;

  if(this.x < -$.GFX.sombrero.w * this.scale) {
    this.destroyed = true;
  }
};

$.SOMBRERO.prototype.render = function() {
  $.CTX.game.save();
  $.CTX.game.translate(this.x, this.y);
  $.CTX.game.scale(this.scale, this.scale);
  $.CTX.game.globalAlpha = $.UTILS.clamp(this.scale * 2.5, 0, 1);
  $.CTX.game.drawImage($.GFX["sombrero"].canvas, this.x, this.y);
  $.CTX.game.restore();
};

$.SOMBREROS.add = function() {
  $.SOMBREROS.list.push(new $.SOMBRERO());
};

$.SOMBREROS.update = function(dt) {
  for(var i=0;i<$.SOMBREROS.list.length;i++) {
    if($.SOMBREROS.list[i].destroyed) $.SOMBREROS.list.splice(i--, 1);
    else $.SOMBREROS.list[i].update(dt);
  }
};

$.SOMBREROS.render = function() {
  $.SOMBREROS.list.forEach(function(sombrero) {
    sombrero.render();
  });
};

/*
*
* The mexicans started their mission to abduct all thr chilly in the world. The bravest of all the chillies tries to escape the invasion. Help the little chilly to achieve it's goal.
*
*
* */