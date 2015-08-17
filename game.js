// Solitaire Game

requirejs.config({
	paths: {
		jquery: 'http://code.jquery.com/jquery-2.1.4.min.js'
	}
});

require('jquery card'.split(' '), function($, Card) {

function Game(foundations, tableaux) {
	this.foundations = $(foundations);
	this.tableaux = $(tableaux);
};
Game.prototype = {
	deal: function() {
		var deck = new Card.Deck();
		deck.shuffle(5);

		var count = [3, 4, 5, 6, 7, 8, 9, 10];
		while (count[7] > 0) {
			for (var index = 0; index < 8; index++) {
				if (count[index] > 0) {
					var card = deck.pop();
					var elem = card.elem();
					if (count[index] % 2 == 0) {
						elem.classList.add('facedDown');
					}
					this.tableaux[index].appendChild(elem);
					count[index] -= 1;
				}
			}
		}
	},
	setupEvents: function() {
		var game = this;
		//game.foundations.on('drag', '.card', function(ev) { });
	}
};

$(function() {
	var game = new Game('.CardFoundation', '.CardTableau');
	game.deal();
});

});
