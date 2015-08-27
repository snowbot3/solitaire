
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
		serialize: function() {
			// 70 options base 36
			var result = ((this.suitValue) * 14 + this.faceValue).toString(36);
			if (result.length < 2) { result = "0" + result; }
			return result;
		}
	};
	var suits = Card.suits = 'Joker Spade Heart Club Diamond'.split(' ');
	var faces = Card.faces = 'Jk A 2 3 4 5 6 7 8 9 10 J Q K'.split(' ');

	function createElement(card) {
		var span = document.createElement('span');
		span.classList.add('card');
		span.textContent = card.face() + ' ';
		if (card.red()) {
			span.classList.add('red');
		}
		var suit = document.createElement('span');
		suit.classList.add('suit' + card.suit());
		span.appendChild(suit);
		return span;
	}

	function cardFromSerial(string) {
		var value = parseInt(string, 36);
		var face = (value % 14);
		var suit = Math.floor(value / 14);
		return new Card(face, suit);
	}
	Card.fromSerial = cardFromSerial;

	// return
	return Card;
});
