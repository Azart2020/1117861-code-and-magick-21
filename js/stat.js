'use strict';

const Cloud = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10,
  GAP: 10,
  SHADOW_COLOR: 'rgba(0, 0, 0, 0.3)',
  BACKGROUND_COLOR: '#fff'
};
const Rect = {
  X: 100,
  Y: 180
}

const GAP = 50;
const FONT_GAP = 15;

const Bar = {
  WIDTH: 40,
  HEIGHT: 150 - GAP
}
const Player = {
  NAME: 'Вы',
  COLOR: 'rgb(255, 0, 0)'
}

const Saturation = {
  MIN: 30,
  MAX: 100
}

const Font = {
  TYPE: '16px PT Mono',
  STYLE: '#000',
  BASELINE: 'hanging'
}
const Text = {
  FIRST: 'Ура вы победили!',
  SECOND: 'Список результатов:'
}

let renderCloud = function(ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};


let getMaxElement = function(elements) {
  let maxElement = elements[0];

  for (var i = 1; i < elements.length; i++) {
    maxElement = Math.max(maxElement, elements[i]);
  }
  return maxElement;
};

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let getRandomColumnColor = function() {
  return 'hsl(240, ' + getRandomNumber(Saturation.MIN, Saturation.MAX) + '%, 50%)';
}

let getColumnColor = function(player) {
  return player === Player.NAME ? Player.COLOR : getRandomColumnColor()
};

let renderText = function(ctx, text, x, y) {
  ctx.fillStyle = Font.STYLE;
  ctx.font = Font.TYPE;
  ctx.textBaseline = Font.BASELINE;
  ctx.fillText(text, x, y)
}

window.renderStatistics = function(ctx, player, times) {

  renderCloud(
    ctx,
    Cloud.X + Cloud.GAP,
    Cloud.Y + Cloud.GAP,
    Cloud.WIDTH,
    Cloud.HEIGHT,
    Cloud.SHADOW_COLOR
  );

  renderCloud(
    ctx,
    Cloud.X,
    Cloud.Y,
    Cloud.WIDTH,
    Cloud.HEIGHT,
    Cloud.BACKGROUND_COLOR);

  renderText(
    ctx,
    Text.FIRST,
    Cloud.X + FONT_GAP,
    Cloud.Y + FONT_GAP);

  renderText(
    ctx,
    Text.SECOND,
    Cloud.X + FONT_GAP,
    Cloud.Y + FONT_GAP * 2);

  let maxTime = getMaxElement(times);

  for (var i = 0; i < player.length; i++) {

    ctx.fillStyle = getColumnColor(player[i]);

    let barX = Rect.X + GAP + (Bar.WIDTH + GAP) * i;
    let barY = Rect.Y + GAP;
    let barHeight = -(Bar.HEIGHT * times[i]) / maxTime;
    let barPlayerY = Cloud.HEIGHT - FONT_GAP;
    let barPlayerX = Cloud.X + GAP + (Bar.WIDTH + GAP) * i;
    let barTimeY = -(Bar.HEIGHT * times[i]) / maxTime + GAP * 4;

    ctx.fillRect(
      barX,
      barY,
      Bar.WIDTH,
      barHeight
    );

    renderText(
      ctx,
      player[i],
      barPlayerX,
      barPlayerY
    );

    renderText(
      ctx,
      Math.round(times[i]),
      barX,
      barTimeY
    );
  }
};
