const titleSettings = {
	font: 'bold 73px "Nano Sans CJK JP"',
	lineHeight: 80,
	color: "#333333"
};

const bodySettings = {
	font: '30px "Nano Sans CJK JP"',
	lineHeight: 38,
	color: "#666666"
};

const padding = 80;

function generator(title, body, width, height, ctx) {
	const lineWidth = width - padding * 2;

	ctx.font = titleSettings.font;

	const titleLines = splitByMeasureWidth(title, lineWidth, ctx);
	const titleLineCnt = titleLines.length;

	ctx.textBaseline = "top";

	ctx.fillStyle = titleSettings.color;
	ctx.font = titleSettings.font;

	for (let index = 0; index < titleLineCnt; index++) {
		const element = titleLines[index];
		ctx.fillText(
			element,
			padding,
			padding + titleSettings.lineHeight * index
		);
	}
}

function splitByMeasureWidth(str, maxWidth, context) {
	let chars = Array.from(str);
	let line = "";
	let lines = [];
	for (let index = 0; index < chars.length; index++) {
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
