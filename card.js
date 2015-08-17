define(function() {

function Card(face, suit) {
	this.faceValue = (typeof face == 'number' ? face : faces.indexOf(face));
	this.suitValue = (typeof suit == 'number' ? suit : suits.indexOf(suit));
}

Card.prototype = {
	face: function() {
		return Card.faces[this.faceValue];
	},
	suit: function() {
		return suits[this.suitValue];
	},
	elem: function() {
		var elem = document.createElement('span');
		elem.dataset.face = this.face();
		var suit = this.suit();
		elem.dataset.suit = suit;
		elem.classList.add('card');
		elem.classList.add('suit' + suit);
		return elem;
	},
	toString: function() {
		return this.face() + ' ' + this.suit();
	}
};

var suits = Card.suits = 'Joker Spade Heart Club Diamond'.split(' ');
var faces = Card.faces = 'Jk A 2 3 4 5 6 7 8 9 10 J Q K'.split(' ');


function createCardFromElement(element) {
	if (element.dataset) {
		var face = element.dataset.face,
			suit = element.dataset.suit;
		if ( face && suit && faces.indexOf(face) > -1
				&& suits.indexOf(suit) > -1) {
			return new Card(face, suit);
		}
		return null;
	}
}

Card.fromElem = createCardFromElement;


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

Card.Deck = Deck;


// zero inclusive to max exclusive
function randomInt(max) {
	return Math.floor(Math.random() * max);
}

var shuffles = Card.shuffles = {
	pull: function(deck) {
		var cards = deck.splice(0), ind;
		for (var len=cards.length; len > 0; len--) {
			ind = shuffles.randomInt(len);
			deck.push(cards.splice(ind, 1)[0]);
		}
		return deck; // little to no point in returning
	},
	randomInt: randomInt
};


return Card;

});
