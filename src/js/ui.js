$.UI = {};
$.UI.render = function() {
  $.CTX.ui.strokeStyle = $.CTX.ui.fillStyle = "#fff";

  $.CTX.ui.save();

    $.CTX.ui.translate(40,20);
    $.CTX.ui.scale(2, 2);

    $.CTX.ui.lineWidth = 2;
    $.CTX.ui.strokeRect(0, 0, 100, 8);
    $.CTX.ui.stroke();

    $.CTX.ui.clearRect(-1, -1, 2, 2);
    $.CTX.ui.clearRect(-1, 7, 2, 2);
    $.CTX.ui.clearRect(99, -1, 2, 2);
    $.CTX.ui.clearRect(99, 7, 2, 2);

    $.CTX.ui.beginPath();
    $.CTX.ui.fillRect(
      2,
      2,
      $.DEAD ? 0 : 96 / $.LEVEL_MAX * ($.LEVEL_MAX - $.LEVEL),
      4);
    $.CTX.ui.fill();

    $.CTX.ui.font = "bold 7px sans-serif";
    $.CTX.ui.fillText("SANITY", 1, 16);

  $.CTX.ui.restore();

  $.CTX.ui.save();

    $.CTX.ui.translate($.W - 250,20);
    $.CTX.ui.scale(2, 2);

    $.CTX.ui.lineWidth = 2;
    $.CTX.ui.strokeRect(0, 0, 100, 8);
    $.CTX.ui.stroke();

    $.CTX.ui.clearRect(-1, -1, 2, 2);
    $.CTX.ui.clearRect(-1, 7, 2, 2);
    $.CTX.ui.clearRect(99, -1, 2, 2);
    $.CTX.ui.clearRect(99, 7, 2, 2);

    $.CTX.ui.textAlign = "right";

    $.CTX.ui.font = "bold 7px sans-serif";
    $.CTX.ui.fillText("SCORE", 98, 16);

    $.CTX.ui.font = "bold 7px sans-serif";
    $.CTX.ui.fillText("" + $.PLAYER.score, 98, 6.5);

  $.CTX.ui.restore();
};