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
		QUnit.equal(e1.tagName.toLowerCase(), 'span', 'tagName');
		QUnit.deepEqual(Object.keys(e1.dataset), ['face','suit'], 'dataset keys');
		QUnit.equal(e1.dataset.face, '2', 'dataset key face');
		QUnit.equal(e1.dataset.suit, 'Club', 'dataset key suit');
		QUnit.equal(e1.classList.length, 2, 'classList length');
		QUnit.equal(e1.classList[0], 'card', 'classList card');
		QUnit.equal(e1.classList[1], 'suitClub', 'classList suit');
	});

	QUnit.test('Card from element', function() {
		QUnit.equal(Card.fromElem({dataset:{}}), null, 'empty dataset');
		QUnit.equal(Card.fromElem({}), null, 'no dataset');
		QUnit.equal(Card.fromElem({dataset:{face:'3'}}), null, 'only face');
		QUnit.equal(Card.fromElem({dataset:{suit:'Spade'}}), null, 'only suit');
		QUnit.deepEqual(Card.fromElem({dataset:{face:'3', suit:'Spade'}}),
			new Card(3,1), 'good dataset');
		QUnit.equal(Card.fromElem({dataset:{face:'D', suit:'Spade'}}),
			null, 'bad face');
		QUnit.equal(Card.fromElem({dataset:{face:'3', suit:'Cat'}}),
			null, 'bad suit');
	});

	QUnit.test('Card Deck', function() {
		var deck = new Card.Deck();
		QUnit.equal(deck.length, 52, 'standard card deck (no joke)');
		QUnit.equal(deck[0].toString(), 'A Spade', 'Card Index 0');
		QUnit.equal(deck[1].toString(), '2 Spade', 'Card Index 1');
		QUnit.equal(deck[50].toString(), 'Q Diamond', 'Card Index 50');
		QUnit.equal(deck[51].toString(), 'K Diamond', 'Card Index 51');
	});

	QUnit.test('Deck Shuffle Pull', function() {
		var shuffle = Card.shuffles.pull;
		var indices;
		Card.shuffles.randomInt = function() {
			return indices.shift();
		};

		indices = [6,5,4,3,2,1,0];
		deepEqual(shuffle('ABCDEFG'.split('')), 'GFEDCBA'.split(''), 'pull reverse');
		indices = [3,5,1,3,0,1,0];
		deepEqual(shuffle('ABCDEFG'.split('')), 'DGBFAEC'.split(''), 'pull mix');
		indices = [0,0,0,0,0,0,0];
		deepEqual(shuffle('ABCDEFG'.split('')), 'ABCDEFG'.split(''), 'pull straight');
	});
});
