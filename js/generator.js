const titleSettings = {
	font: 'bold 73px "Nano Sans CJK JP"',
	lineHeight: 80
};

const bodySettings = {
	font: '35px "Nano Sans CJK JP"',
	lineHeight: 38
};

const padding = 80;
const margin = 40;

function generator(title, body, width, height, color, ctx) {
	const lineWidth = width - padding * 2;

	ctx.font = titleSettings.font;
	ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]}, ${color[3]})`;

	const titleLines = splitByMeasureWidth(title, lineWidth, ctx);
	const titleLineCnt = titleLines.length;
	const titleHeight = titleLines.length * titleSettings.lineHeight;

	console.log(titleHeight);

	ctx.textBaseline = "top";

	for (let index = 0; index < titleLineCnt; index++) {
		const element = titleLines[index];
		ctx.fillText(
			element,
			padding,
			padding + titleSettings.lineHeight * index
		);
	}

	ctx.font = bodySettings.font;
	ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]}, ${color[3]})`;

	const bodyLines = splitByMeasureWidth(body, lineWidth, ctx);

	const bodyLineCnt = bodyLines.length;

	for (let index = 0; index < bodyLineCnt; index++) {
		const element = bodyLines[index];
		ctx.fillText(
			element,
			padding,
			padding + (titleHeight + margin) + bodySettings.lineHeight * index
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
