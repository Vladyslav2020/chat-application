function generateName() {
	let length = Math.floor(Math.random() * 5) + 4;
	let name = '';
	for (let i = 0; i < length; i++) {
		name += String.fromCodePoint(65 + Math.floor(Math.random() * 26));
	}
	name += String(Math.floor(Math.random() * 100));
	return name;
}

module.exports = generateName;
