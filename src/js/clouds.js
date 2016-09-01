$.CLOUDS = {
  list: []
};

$.CLOUD = function() {
  this.x = $.W;
  this.y = Math.random() * $.H / 2.5 + 10;
  this.velX = Math.random() * (-50);
  this.type = Math.floor(Math.random() * 2);
  this.alpha = Math.random() * 0.5 + 0.5;
};

$.CLOUD.prototype.update = function(dt) {
  this.x += this.velX * dt;
};

$.CLOUD.prototype.render = function() {
  $.CTX.game.save();
  $.CTX.game.globalAlpha = this.alpha;
  $.CTX.game.drawImage($.GFX["cloud_" + this.type].canvas, this.x, this.y);
  $.CTX.game.restore();
};

$.CLOUDS.add = function() {
  $.CLOUDS.list.push(new $.CLOUD());
};

$.CLOUDS.update = function(dt) {
  $.CLOUDS.list.forEach(function(cloud) {
    cloud.update(dt);
  });
};

$.CLOUDS.render = function(dt) {
  $.CLOUDS.list.forEach(function(cloud) {
    cloud.render(dt);
  });
};