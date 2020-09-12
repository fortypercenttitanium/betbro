function camelCase(string) {
	if (string.includes('_')) {
		return string
			.split('_')
			.map((word, i) => {
				if (i > 0 && word[0].match(/[a-zA-Z]/)) {
					word = word[0].toUpperCase() + word.slice(1);
				}
				return word;
			})
			.join('');
	} else {
		return string;
	}
}

module.exports = camelCase;
