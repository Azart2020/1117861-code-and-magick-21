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
};

const GAP = 50;
const FONT_GAP = 15;

const Bar = {
  WIDTH: 40,
  HEIGHT: 150 - GAP
};
const Player = {
  NAME: 'Вы',
  COLOR: 'rgb(255, 0, 0)'
};

const Saturation = {
  MIN: 30,
  MAX: 100
};

const Font = {
  TYPE: '16px PT Mono',
  STYLE: '#000',
  BASELINE: 'hanging'
};
const Texts = {
  FIRST: 'Ура вы победили!',
  SECOND: 'Список результатов:'
};

const renderCloud = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};


const getMaxElement = function (elements) {
  let maxElement = elements[0];

  for (let i = 1; i < elements.length; i++) {
    maxElement = Math.max(maxElement, elements[i]);
  }
  return maxElement;
};

const getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomColumnColor = function () {
  return 'hsl(240, ' + getRandomNumber(Saturation.MIN, Saturation.MAX) + '%, 50%)';
};

const getColumnColor = function (player) {
  return player === Player.NAME
    ? Player.COLOR
    : getRandomColumnColor();
};

const renderText = function (ctx, text, x, y) {
  ctx.fillStyle = Font.STYLE;
  ctx.font = Font.TYPE;
  ctx.textBaseline = Font.BASELINE;
  ctx.fillText(text, x, y);
};

const renderBar = function (ctx, player, time, maxTime, index) {
  ctx.fillStyle = getColumnColor(player);

  const barX = Rect.X + GAP + (Bar.WIDTH + GAP) * index;
  const barY = Rect.Y + GAP;
  const barHeight = -(Bar.HEIGHT * time) / maxTime;
  const barPlayerY = Cloud.HEIGHT - FONT_GAP;
  const barPlayerX = Cloud.X + GAP + (Bar.WIDTH + GAP) * index;
  const barTimeY = -(Bar.HEIGHT * time) / maxTime + GAP * 4;

  ctx.fillRect(
      barX,
      barY,
      Bar.WIDTH,
      barHeight
  );

  renderText(
      ctx,
      player,
      barPlayerX,
      barPlayerY
  );

  renderText(
      ctx,
      Math.round(time),
      barX,
      barTimeY
  );
};

const renderBars = function (ctx, players, times) {
  const maxTime = getMaxElement(times);

  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    const time = times[i];

    renderBar(ctx, player, time, maxTime, i);
  }
};

window.renderStatistics = function (ctx, players, times) {
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
      Cloud.BACKGROUND_COLOR
  );

  renderText(
      ctx,
      Texts.FIRST,
      Cloud.X + FONT_GAP,
      Cloud.Y + FONT_GAP
  );

  renderText(
      ctx,
      Texts.SECOND,
      Cloud.X + FONT_GAP,
      Cloud.Y + FONT_GAP * 2
  );

  renderBars(ctx, players, times);
};
