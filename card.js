
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

	// Simple Deck
	function Deck() {
		for (var suit=4; suit > 0; suit--) {
			for (var face=13; face > 0; face--) {
				this.unshift(new Card(face,suit));
			}
		}
	};
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
