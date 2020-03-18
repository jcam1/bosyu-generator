"use strict";

var titleSettings = {
  font: 'bold 73px "Nano Sans CJK JP"',
  lineHeight: 80
};
var bodySettings = {
  font: '35px "Nano Sans CJK JP"',
  lineHeight: 38
};
var padding = 80;
var margin = 40;

function generator(title, body, width, height, color, ctx) {
  var lineWidth = width - padding * 2;
  ctx.font = titleSettings.font;
  ctx.fillStyle = "rgba(".concat(color[0], ",").concat(color[1], ",").concat(color[2], ", ").concat(color[3], ")");
  var titleLines = splitByMeasureWidth(title, lineWidth, ctx);
  var titleLineCnt = titleLines.length;
  var titleHeight = titleLines.length * titleSettings.lineHeight;
  ctx.textBaseline = "top";

  for (var index = 0; index < titleLineCnt; index++) {
    var element = titleLines[index];
    ctx.fillText(element, padding, padding + titleSettings.lineHeight * index);
  }

  ctx.font = bodySettings.font;
  ctx.fillStyle = "rgba(".concat(color[0], ",").concat(color[1], ",").concat(color[2], ", ").concat(color[3], ")");
  var bodyLines = splitByMeasureWidth(body, lineWidth, ctx);
  var bodyLineCnt = bodyLines.length;

  for (var _index = 0; _index < bodyLineCnt; _index++) {
    var _element = bodyLines[_index];
    ctx.fillText(_element, padding, padding + (titleHeight + margin) + bodySettings.lineHeight * _index);
  }
}

function splitByMeasureWidth(str, maxWidth, context) {
  var chars = Array.from(str);
  var line = "";
  var lines = [];

  for (var index = 0; index < chars.length; index++) {
    if (maxWidth <= context.measureText(line + chars[index]).width) {
      lines.push(line);
      line = chars[index];
    } else {
      line += chars[index];
    }
  }

  lines.push(line);
  return lines;
}