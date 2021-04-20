let ID = 0;
function generateId() {
	ID++;
	let id = '';
	for (let i = 0; i < 15; i++) {
		id += String.fromCodePoint(40 + Math.floor(Math.random() * 70));
	}
	id += String(ID);
	return id;
}

module.exports = generateId;
