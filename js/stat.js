'use strict';


const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const CLOUD_GAP = 10;
const RECT_X = 100;
const RECT_Y = 180;
const GAP = 50;
const FONT_GAP = 15;
const BAR_WIDTH = 40;
const BAR_HEIGHT = 150 - GAP;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};


var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getColumnColor = function (player) {
  if (player === 'Вы') {
    return 'rgb(255, 0, 0)';
  } else {
    return 'hsl(240, ' + Math.random(30, 100) * 100 + '%, 50%)';
  }
};

window.renderStatistics = function (ctx, player, times) {
  renderCloud(
      ctx,
      CLOUD_X + CLOUD_GAP,
      CLOUD_Y + CLOUD_GAP,
      'rgba(0, 0, 0, 0.3)');

  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      '#fff'
  );

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP * 2);


  var maxTime = getMaxElement(times);


  for (var i = 0; i < player.length; i++) {
    ctx.fillStyle = getColumnColor(player[i]);
    ctx.fillRect(
        RECT_X + GAP + (BAR_WIDTH + GAP) * i,
        RECT_Y + GAP,
        BAR_WIDTH,
        -(BAR_HEIGHT * times[i]) / maxTime
    );

    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(
        player[i],
        CLOUD_X + GAP + (BAR_WIDTH + GAP) * i,
        CLOUD_HEIGHT - FONT_GAP
    );

    ctx.fillText(
        Math.round(times[i]),
        RECT_X + GAP + (BAR_WIDTH + GAP) * i,
        -(BAR_HEIGHT * times[i]) / maxTime + GAP * 4);
  }
};
