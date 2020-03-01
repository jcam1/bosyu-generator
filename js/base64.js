function encode(...parts) {
	return new Promise(resolve => {
		const render = new FileReader();
		render.onload = () => {
			const offset = render.result.indexOf(",") + 1;
			resolve(render.result.slice(offset));
		};

		render.readAsDataURL(new Blob(parts));
	});
}

function decode(text, char) {
	return fetch(`data:text/plain;charset=${char};base64,` + text).then(
		response => {
			response.text();
		}
	);
}
