define('QUnit deck'.split(' '), function(QUnit, Deck) {
	QUnit.module('Deck', {});

	QUnit.test('Deck Creation', function() {
		var deck = new Deck();
		QUnit.equal(deck.length, 0, 'default deck is empty');

		deck = Deck.full();
		QUnit.equal(deck.length, 52, 'standard card deck (no joke)');
		QUnit.equal(deck[0].toString(), 'A Spade', 'Card Index 0');
		QUnit.equal(deck[1].toString(), '2 Spade', 'Card Index 1');
		QUnit.equal(deck[50].toString(), 'Q Diamond', 'Card Index 50');
		QUnit.equal(deck[51].toString(), 'K Diamond', 'Card Index 51');
	});

	QUnit.test('Deck Serialize', function() {
		QUnit.equal((new Deck()).serialize(), '', 'empty deck');
		QUnit.equal(Deck.full().serialize(),
			'0f0g0h0i0j0k0l0m0n0o0p0q0r'
			+ '0t0u0v0w0x0y0z101112131415'
			+ '1718191a1b1c1d1e1f1g1h1i1j'
			+ '1l1m1n1o1p1q1r1s1t1u1v1w1x',
			'full deck');
	});

	QUnit.test('Deck From Serial', function() {
		var deck = Deck.fromSerial('');
		QUnit.equal(deck.length, 0, 'empty deck');

		deck = Deck.fromSerial('0f0t171l');
		QUnit.equal(deck.length, 4, 'aces only');
		QUnit.equal(deck[0].toString(), 'A Spade', 'A Spade');
		QUnit.equal(deck[1].toString(), 'A Heart', 'A Heart');
		QUnit.equal(deck[2].toString(), 'A Club', 'A Club');
		QUnit.equal(deck[3].toString(), 'A Diamond', 'A Diamond');
	});

});
