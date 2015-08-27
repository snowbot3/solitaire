define(function() {
	function randomInteger(max) { return Math.floor(Math.random() * max); }
	function shuffle(array, type, count) {
		if (typeof type == 'number') {
			count = type;
			type = undefined;
		}
		type = type || 'pull';
		count = count || 1;
		while (count > 0) {
			shuffle.types[type](array);
			count--;
		}
		return array;
	}
	shuffle.types = {
		'pull': function(array) {
			var parts = array.splice(0), ind;
			for (var len=parts.length; len > 0; len--) {
				ind = util.randInt(len);
				array.push(parts.splice(ind, 1)[0]);
			}
		}
	};

	var util = {
		randInt: randomInteger,
		shuffle: shuffle
	};
	return util;
});
