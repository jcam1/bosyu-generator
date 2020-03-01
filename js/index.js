const preview = document.getElementById("preview");

preview.width = 1025;
preview.height = 576;

const ctx = preview.getContext("2d");

ctx.beginPath();

ctx.rect(0, 0, 1025, 576);

ctx.fillStyle = "#333";

ctx.fill();
