"use strict";

var backgroundPickr = new Pickr({
  el: ".background-color-pickr",
  theme: "classic",
  default: "#333",
  swatches: ["rgba(244, 67, 54, 1)", "rgba(233, 30, 99, 0.95)", "rgba(156, 39, 176, 0.9)", "rgba(103, 58, 183, 0.85)", "rgba(63, 81, 181, 0.8)", "rgba(33, 150, 243, 0.75)", "rgba(3, 169, 244, 0.7)", "rgba(0, 188, 212, 0.7)", "rgba(0, 150, 136, 0.75)", "rgba(76, 175, 80, 0.8)", "rgba(139, 195, 74, 0.85)", "rgba(205, 220, 57, 0.9)", "rgba(255, 235, 59, 0.95)", "rgba(255, 193, 7, 1)"],
  components: {
    preview: true,
    opacity: true,
    hue: true,
    interaction: {
      input: true,
      save: true
    }
  }
});
var fontPickr = new Pickr({
  el: ".font-color-pickr",
  theme: "classic",
  default: "#939393",
  swatches: ["rgba(244, 67, 54, 1)", "rgba(233, 30, 99, 0.95)", "rgba(156, 39, 176, 0.9)", "rgba(103, 58, 183, 0.85)", "rgba(63, 81, 181, 0.8)", "rgba(33, 150, 243, 0.75)", "rgba(3, 169, 244, 0.7)", "rgba(0, 188, 212, 0.7)", "rgba(0, 150, 136, 0.75)", "rgba(76, 175, 80, 0.8)", "rgba(139, 195, 74, 0.85)", "rgba(205, 220, 57, 0.9)", "rgba(255, 235, 59, 0.95)", "rgba(255, 193, 7, 1)"],
  components: {
    preview: true,
    opacity: true,
    hue: true,
    interaction: {
      input: true,
      save: true
    }
  }
});
var preview = document.getElementById("preview");
var ctx = preview.getContext("2d");
var width = 1025;
var height = 576;
var title = "";
var body = "";
backgroundDraw(height, width, "#333");
backgroundPickr.on("save", function (color) {
  backgroundDraw(height, width, color.toRGBA());
  updateText();
});
fontPickr.on("save", function () {
  updateText();
});
/* methods */

function updateXY() {
  height = document.getElementById("height").value;
  width = document.getElementById("width").value;
}

function updateText() {
  title = document.getElementById("title").value;
  body = document.getElementById("body").value;
  ctx.clearRect(0, 0, preview.width, preview.height);
  backgroundDraw(width, height, backgroundPickr.getColor().toRGBA());
  generator(title, body, width, height, fontPickr.getColor().toRGBA(), ctx);
}

function backgroundDraw(width, height, color) {
  preview.width = width;
  preview.height = height;
  ctx.beginPath();
  ctx.rect(0, 0, width, height);
  ctx.fillStyle = "rgba(".concat(color[0], ",").concat(color[1], ",").concat(color[2], ", ").concat(color[3], ")");
  ctx.fill();
}