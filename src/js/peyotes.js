$.PEYOTES = {
  list: []
};

$.PEYOTE = function() {
  this.scale = Math.random() * 1.5 + 1;
  this.x = $.W;
  this.y = $.H - 10 - 5 * (1 - this.scale / 2.5);
  this.yOffset = $.GFX["peyote"].h * this.scale;

  this.collisionBox = new $.RECT(this.x, this.y - this.yOffset, $.GFX["peyote"].w * this.scale, $.GFX["peyote"].h * this.scale)

  this.destroyed = false;
};

$.PEYOTE.prototype.update = function(dt) {
  this.x += $.LEVELS.peyote_speed[$.LEVEL] * dt;

  this.collisionBox.x = this.x;

  if(this.collisionBox.collidesWith($.PLAYER.collisionBox)) {
    if($.LEVEL < $.LEVEL_MAX - 1) $.LEVEL++;
    else $.DEAD = true;

    this.destroyed = true;
  }

  if(this.x < -$.GFX.peyote.w * this.scale) {
    this.destroyed = true;
    $.PLAYER.score += Math.round(12 * this.scale);
  }
};

$.PEYOTE.prototype.render = function() {
  if(!this.destroyed) {
    $.CTX.game.save();
    $.CTX.game.translate(this.x, this.y - this.yOffset);
    $.CTX.game.scale(this.scale, this.scale);

    $.CTX.game.save();
    $.CTX.game.globalAlpha = this.scale / 2.5 * 0.5;
    $.CTX.game.fillStyle = "#000";
    $.CTX.game.beginPath();
    $.CTX.game.ellipse($.GFX["peyote"].w / 2, 23, 15 * this.scale / 2.5, 4 * this.scale / 2.5, 0, Math.PI * 2, false);
    $.CTX.game.fill();
    $.CTX.game.restore();

    $.CTX.game.drawImage($.GFX["peyote"].canvas, 0, 0);
    $.CTX.game.restore();

    /*$.CTX.ui.strokeStyle = "cyan";
    $.CTX.ui.strokeRect(
      this.collisionBox.x,
      this.collisionBox.y,
      this.collisionBox.w,
      this.collisionBox.h
    );*/
  }
};

$.PEYOTES.add = function() {
  $.PEYOTES.list.push(new $.PEYOTE());
};

$.PEYOTES.time = 1;
$.PEYOTES.timer  = 0;

$.PEYOTES.update = function(dt) {

  if(!$.DEAD) {
    $.PEYOTES.timer += dt;
    if($.PEYOTES.timer >= $.PEYOTES.time) {
      $.PEYOTES.timer -= $.PEYOTES.time;

      $.PEYOTES.time = (Math.random() + 1) * $.LEVELS.peyote_spawn_time_multiplier[$.LEVEL] * (Math.random() < 0.005 ? 0.5 : 1);

      $.PEYOTES.add();
    }
  }

  for(var i=0;i<$.PEYOTES.list.length;i++) {
    if($.PEYOTES.list[i].destroyed) $.PEYOTES.list.splice(i--, 1);
    else $.PEYOTES.list[i].update(dt);
  }
};

$.PEYOTES.render = function(dt) {
  $.PEYOTES.list.forEach(function(peyote) {
    peyote.render(dt);
  });
};