
define(function() {
	// Simple Card
	function Card(face, suit) {
		this.faceValue = face;
		this.suitValue = suit;
	}
	Card.prototype = {
		face: function() {
			return Card.faces[this.faceValue];
		},
		suit: function() {
			return suits[this.suitValue];
		},
		elem: function() {
			var element = createElement(this);
			this.elem = function() {
				return element;
			};
			return element;
		},
		red: function() {
			return this.suitValue == 2 || this.suitValue == 4 || false;
		},
		toString: function() {
			return this.face() + ' ' + this.suit();
		},
		valueOf: function() {
			return (this.suitValue) * 14 + this.faceValue;
		}
	};
	var suits = Card.suits = 'Joker Spade Heart Club Diamond'.split(' ');
	var faces = Card.faces = 'Jk A 2 3 4 5 6 7 8 9 10 J Q K'.split(' ');
	function createElement(card) {
		var span = $('<span>');
		span.addClass('card');
		span.text(card.face() + ' ');
		if (card.red()) {
			span.addClass('red');
		}
		var suit = $('<span>');
		suit.addClass('suit' + card.suit());
		span.append(suit);
		span.data('Card', card);
		return span;
	}
	function cardFromValue(value) {
		var face = (value % 14);
		var suit = Math.floor(value / 14);
		return new Card(face, suit);
	}
	Card.fromValue = cardFromValue;

	// Simple Deck
	function Deck() {};
	Deck.prototype = [];
	Deck.prototype.shuffle = function(type, count) {
		count = (typeof count == 'number' ? count :
			(typeof type == 'number' ? type : 1));
		type = (typeof type == 'string' && type in shuffles ? type : 'pull');
		while (count > 0) {
			shuffles[type].call(this, this);
			count--;
		}
	};

	function createFullDeck() {
		var deck = new Deck();
		for (var suit=4; suit > 0; suit--) {
			for (var face=13; face > 0; face--) {
				deck.unshift(new Card(face,suit));
			}
		}
		return deck;
	}
	Deck.full = createFullDeck;

	function createDeckFromSerial(base36) {
		var deckValue = parseInt(base36, 36);
		var deck = new Deck();
		while (deckValue > 0) {
			var cardValue = deckValue % 70;
			deckValue -= cardValue;
			deckValue /= 70;
			deck.push(Card.fromValue(cardValue));
		}
		return deck;
	}
	Deck.fromSerial = createDeckFromSerial;

	// Serializing
	Deck.prototype.serialize = function() {
		var deckValue = 0;
		for (var i = 0, l = this.length; i < l; i++) {
			if (i > 0) { deckValue *= 70; }
			deckValue += this[i].valueOf();
		}
		return deckValue.toString(36);
	};

	// zero inclusive to max exclusive
	function randomInt(max) { return Math.floor(Math.random() * max); }
	var shuffles = {
		pull: function(deck) {
			var cards = deck.splice(0), ind;
			for (var len=cards.length; len > 0; len--) {
				ind = randomInt(len);
				deck.push(cards.splice(ind, 1)[0]);
			}
		}
	};
	Card.Deck = Deck;

	// return
	return Card;
});
