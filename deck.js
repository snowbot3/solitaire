define(['card', 'util'], function(Card, util) {
	// Simple Deck
	function Deck() {};
	Deck.prototype = [];
	Deck.prototype.shuffle = function(type, count) {
		return util.shuffle(this, type, count);
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

	// Serializing
	Deck.prototype.serialize = function() {
		var result = "";
		for (var i=0, l=this.length; i<l; i++) {
			result += this[i].serialize();
		}
		return result;
	};

	function deckFromSerial(base36) {
		if (base36.length % 2 != 0) { throw 'bad serial'; }
		var deck = new Deck();
		for (var i=0, l=base36.length; i<l; i+=2) {
			var cur = base36.substr(i,2);
			deck.push(Card.fromSerial(cur));
		}
		return deck;
	}
	Deck.fromSerial = deckFromSerial;

	return Deck;
});
