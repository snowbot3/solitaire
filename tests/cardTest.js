define('QUnit card'.split(' '), function(QUnit, Card) {
	QUnit.module('Card', {});

	QUnit.test('Card Instance', function() {
		var c1 = new Card(1,2)
		QUnit.equal(c1.faceValue, 1, 'faceValue');
		QUnit.equal(c1.suitValue, 2, 'suitValue');
		QUnit.equal(c1.face(), 'A', 'face()');
		QUnit.equal(c1.suit(), 'Heart', 'suit()');
		QUnit.equal(c1.toString(), 'A Heart', 'toString()');
		QUnit.equal('' + c1, 'A Heart', 'concat to string');
	});

	QUnit.test('Card make element', function() {
		var e1 = new Card(2,3).elem();
		QUnit.equal(e1.tagName.toLowerCase(), 'span', 'tagname');
		QUnit.equal(e1.className, 'card', 'classname');
		QUnit.equal(e1.textContent, '2 ', 'textcontent');
		var s1 = e1.children[0];
		QUnit.equal(s1.tagName.toLowerCase(), 'span', 'suit tagname');
		QUnit.equal(s1.className, 'suitClub', 'suit classname');

		var div = document.createElement('div');
		div.appendChild(e1);
		QUnit.equal('<span class=\"card\">2 <span class=\"suitClub\"></span></span>',
			div.innerHTML, 'as html');
	});

	QUnit.test('Card Serial', function() {
		QUnit.equal(new Card(1,1).serialize(), '0f', 'A Spade');
		QUnit.equal(new Card(2,1).serialize(), '0g', '2 Spade');
		QUnit.equal(new Card(3,1).serialize(), '0h', '3 Spade');
		QUnit.equal(new Card(4,1).serialize(), '0i', '4 Spade');
		QUnit.equal(new Card(5,1).serialize(), '0j', '5 Spade');
		QUnit.equal(new Card(6,1).serialize(), '0k', '6 Spade');
		QUnit.equal(new Card(7,1).serialize(), '0l', '7 Spade');
		QUnit.equal(new Card(8,1).serialize(), '0m', '8 Spade');
		QUnit.equal(new Card(9,1).serialize(), '0n', '9 Spade');
		QUnit.equal(new Card(10,1).serialize(), '0o', '10 Spade');
		QUnit.equal(new Card(11,1).serialize(), '0p', 'J Spade');
		QUnit.equal(new Card(12,1).serialize(), '0q', 'Q Spade');
		QUnit.equal(new Card(13,1).serialize(), '0r', 'K Spade');

		QUnit.equal(new Card(1,2).serialize(), '0t', 'A Heart');
		QUnit.equal(new Card(2,2).serialize(), '0u', '2 Heart');
		QUnit.equal(new Card(3,2).serialize(), '0v', '3 Heart');
		QUnit.equal(new Card(4,2).serialize(), '0w', '4 Heart');
		QUnit.equal(new Card(5,2).serialize(), '0x', '5 Heart');
		QUnit.equal(new Card(6,2).serialize(), '0y', '6 Heart');
		QUnit.equal(new Card(7,2).serialize(), '0z', '7 Heart');
		QUnit.equal(new Card(8,2).serialize(), '10', '8 Heart');
		QUnit.equal(new Card(9,2).serialize(), '11', '9 Heart');
		QUnit.equal(new Card(10,2).serialize(), '12', '10 Heart');
		QUnit.equal(new Card(11,2).serialize(), '13', 'J Heart');
		QUnit.equal(new Card(12,2).serialize(), '14', 'Q Heart');
		QUnit.equal(new Card(13,2).serialize(), '15', 'K Heart');

		QUnit.equal(new Card(1,3).serialize(), '17', 'A Club');
		QUnit.equal(new Card(2,3).serialize(), '18', '2 Club');
		QUnit.equal(new Card(3,3).serialize(), '19', '3 Club');
		QUnit.equal(new Card(4,3).serialize(), '1a', '4 Club');
		QUnit.equal(new Card(5,3).serialize(), '1b', '5 Club');
		QUnit.equal(new Card(6,3).serialize(), '1c', '6 Club');
		QUnit.equal(new Card(7,3).serialize(), '1d', '7 Club');
		QUnit.equal(new Card(8,3).serialize(), '1e', '8 Club');
		QUnit.equal(new Card(9,3).serialize(), '1f', '9 Club');
		QUnit.equal(new Card(10,3).serialize(), '1g', '10 Club');
		QUnit.equal(new Card(11,3).serialize(), '1h', 'J Club');
		QUnit.equal(new Card(12,3).serialize(), '1i', 'Q Club');
		QUnit.equal(new Card(13,3).serialize(), '1j', 'K Club');

		QUnit.equal(new Card(1,4).serialize(), '1l', 'A Diamond');
		QUnit.equal(new Card(2,4).serialize(), '1m', '2 Diamond');
		QUnit.equal(new Card(3,4).serialize(), '1n', '3 Diamond');
		QUnit.equal(new Card(4,4).serialize(), '1o', '4 Diamond');
		QUnit.equal(new Card(5,4).serialize(), '1p', '5 Diamond');
		QUnit.equal(new Card(6,4).serialize(), '1q', '6 Diamond');
		QUnit.equal(new Card(7,4).serialize(), '1r', '7 Diamond');
		QUnit.equal(new Card(8,4).serialize(), '1s', '8 Diamond');
		QUnit.equal(new Card(9,4).serialize(), '1t', '9 Diamond');
		QUnit.equal(new Card(10,4).serialize(), '1u', '10 Diamond');
		QUnit.equal(new Card(11,4).serialize(), '1v', 'J Diamond');
		QUnit.equal(new Card(12,4).serialize(), '1w', 'Q Diamond');
		QUnit.equal(new Card(13,4).serialize(), '1x', 'K Diamond');
	});

	QUnit.test('Card From Serial', function() {
		QUnit.equal(new Card.fromSerial('0f').toString(), 'A Spade', 'A Spade');
		QUnit.equal(new Card.fromSerial('0g').toString(), '2 Spade', '2 Spade');
		QUnit.equal(new Card.fromSerial('0h').toString(), '3 Spade', '3 Spade');
		QUnit.equal(new Card.fromSerial('0i').toString(), '4 Spade', '4 Spade');
		QUnit.equal(new Card.fromSerial('0j').toString(), '5 Spade', '5 Spade');
		QUnit.equal(new Card.fromSerial('0k').toString(), '6 Spade', '6 Spade');
		QUnit.equal(new Card.fromSerial('0l').toString(), '7 Spade', '7 Spade');
		QUnit.equal(new Card.fromSerial('0m').toString(), '8 Spade', '8 Spade');
		QUnit.equal(new Card.fromSerial('0n').toString(), '9 Spade', '9 Spade');
		QUnit.equal(new Card.fromSerial('0o').toString(), '10 Spade', '10 Spade');
		QUnit.equal(new Card.fromSerial('0p').toString(), 'J Spade', 'J Spade');
		QUnit.equal(new Card.fromSerial('0q').toString(), 'Q Spade', 'Q Spade');
		QUnit.equal(new Card.fromSerial('0r').toString(), 'K Spade', 'K Spade');

		QUnit.equal(new Card.fromSerial('0t').toString(), 'A Heart', 'A Heart');
		QUnit.equal(new Card.fromSerial('0u').toString(), '2 Heart', '2 Heart');
		QUnit.equal(new Card.fromSerial('0v').toString(), '3 Heart', '3 Heart');
		QUnit.equal(new Card.fromSerial('0w').toString(), '4 Heart', '4 Heart');
		QUnit.equal(new Card.fromSerial('0x').toString(), '5 Heart', '5 Heart');
		QUnit.equal(new Card.fromSerial('0y').toString(), '6 Heart', '6 Heart');
		QUnit.equal(new Card.fromSerial('0z').toString(), '7 Heart', '7 Heart');
		QUnit.equal(new Card.fromSerial('10').toString(), '8 Heart', '8 Heart');
		QUnit.equal(new Card.fromSerial('11').toString(), '9 Heart', '9 Heart');
		QUnit.equal(new Card.fromSerial('12').toString(), '10 Heart', '10 Heart');
		QUnit.equal(new Card.fromSerial('13').toString(), 'J Heart', 'J Heart');
		QUnit.equal(new Card.fromSerial('14').toString(), 'Q Heart', 'Q Heart');
		QUnit.equal(new Card.fromSerial('15').toString(), 'K Heart', 'K Heart');

		QUnit.equal(new Card.fromSerial('17').toString(), 'A Club', 'A Club');
		QUnit.equal(new Card.fromSerial('18').toString(), '2 Club', '2 Club');
		QUnit.equal(new Card.fromSerial('19').toString(), '3 Club', '3 Club');
		QUnit.equal(new Card.fromSerial('1a').toString(), '4 Club', '4 Club');
		QUnit.equal(new Card.fromSerial('1b').toString(), '5 Club', '5 Club');
		QUnit.equal(new Card.fromSerial('1c').toString(), '6 Club', '6 Club');
		QUnit.equal(new Card.fromSerial('1d').toString(), '7 Club', '7 Club');
		QUnit.equal(new Card.fromSerial('1e').toString(), '8 Club', '8 Club');
		QUnit.equal(new Card.fromSerial('1f').toString(), '9 Club', '9 Club');
		QUnit.equal(new Card.fromSerial('1g').toString(), '10 Club', '10 Club');
		QUnit.equal(new Card.fromSerial('1h').toString(), 'J Club', 'J Club');
		QUnit.equal(new Card.fromSerial('1i').toString(), 'Q Club', 'Q Club');
		QUnit.equal(new Card.fromSerial('1j').toString(), 'K Club', 'K Club');

		QUnit.equal(new Card.fromSerial('1l').toString(), 'A Diamond', 'A Diamond');
		QUnit.equal(new Card.fromSerial('1m').toString(), '2 Diamond', '2 Diamond');
		QUnit.equal(new Card.fromSerial('1n').toString(), '3 Diamond', '3 Diamond');
		QUnit.equal(new Card.fromSerial('1o').toString(), '4 Diamond', '4 Diamond');
		QUnit.equal(new Card.fromSerial('1p').toString(), '5 Diamond', '5 Diamond');
		QUnit.equal(new Card.fromSerial('1q').toString(), '6 Diamond', '6 Diamond');
		QUnit.equal(new Card.fromSerial('1r').toString(), '7 Diamond', '7 Diamond');
		QUnit.equal(new Card.fromSerial('1s').toString(), '8 Diamond', '8 Diamond');
		QUnit.equal(new Card.fromSerial('1t').toString(), '9 Diamond', '9 Diamond');
		QUnit.equal(new Card.fromSerial('1u').toString(), '10 Diamond', '10 Diamond');
		QUnit.equal(new Card.fromSerial('1v').toString(), 'J Diamond', 'J Diamond');
		QUnit.equal(new Card.fromSerial('1w').toString(), 'Q Diamond', 'Q Diamond');
		QUnit.equal(new Card.fromSerial('1x').toString(), 'K Diamond', 'K Diamond');
	});
});
