define('QUnit util'.split(' '), function(QUnit, util) {
	var old = {
		randInt: util.randInt
	};
	QUnit.module('Util', {
		teardown: function() {
			util.randInt = old.randInt;
		}
	});

	QUnit.test('Random Integer', function() {
		// randInt should be a number between 0 and given number,
		//		but random...
		var results = {0:0,1:0,2:0};
		for (var i=0; i < 10; i++) {
			results[util.randInt(3)] += 1;
		}
		QUnit.deepEqual(Object.keys(results), '0 1 2'.split(' '), 'Expected Outputs');
		QUnit.ok(results[0] > 0, 'At least 1 random hit of 0');
		QUnit.ok(results[1] > 0, 'At least 1 random hit of 1');
		QUnit.ok(results[2] > 0, 'At least 1 random hit of 2');
	});

	QUnit.test('Shuffle Pull', function() {
		var indices;
		util.randInt = function() {
			return indices.shift();
		};

		indices = [6,5,4,3,2,1,0];
		deepEqual(util.shuffle('ABCDEFG'.split('')), 'GFEDCBA'.split(''), 'pull reverse');
		indices = [3,5,1,3,0,1,0];
		deepEqual(util.shuffle('ABCDEFG'.split('')), 'DGBFAEC'.split(''), 'pull mix');
		indices = [0,0,0,0,0,0,0];
		deepEqual(util.shuffle('ABCDEFG'.split('')), 'ABCDEFG'.split(''), 'pull straight');
	});

});
