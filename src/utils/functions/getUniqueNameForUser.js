const generateName = require('./generateName');

let names = new Set(['Echo bot', 'Spam bot', 'Reverse bot', 'Ignore bot']);
function getUniqueNameForUser() {
	let name;
	do {
		name = generateName();
	} while (names.has(name));
	names.add(name);
	return name;
}

module.exports = getUniqueNameForUser;
