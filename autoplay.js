define(['jquery'], function($) {
	function AutoPlay(game) {
		this.game = game;
		this.speed = 250;
	}
	AutoPlay.prototype = {
		start: function() {
			if (this.stopped) { return; }
			setTimeout(function(that){
				that.run()
			}, this.speed, this);
		},
		stop: function() {
			this.stopped = true;
		},
		restart: function() {
			this.stopped = false;
			this.start();
		},
		run: function() {
			if (this.phaseReveal()
					|| this.phaseFoundations()
					|| this.phaseKingSpace()
					|| this.phaseRemaining()) {
				this.start();
			} else {
				alert('All that I can do...');
			}
		},
		getBase: function(type, limit) {
			if (typeof type == 'string') {
				if (type.indexOf('card') > -1) {
					type = this.game.tableaux.find('.card:not(.down)');
				} else if (type.indexOf('found') > -1) {
					type = this.game.foundations;
				} else if (type.indexOf('table') > -1) {
					type = this.game.tableaux;
				} else {
					throw 'Error: something';
				}
			}
			if (limit) {
				type = type.filter(limit);
			}
			return type;
		},
		eachAny: function(elems, limit, fn, shuffle) {
			// or (elems, fn, shuffle) or (elems, fn)
			if ($.isFunction(limit)) {
				shuffle = fn;
				fn = limit;
				limit = undefined;
			}
			elems = this.getBase(elems, limit);
			elems = elems.get();
			if (shuffle) {
				if (typeof shuffle != 'number') {
					shuffle = 5;
				}
				arrayShuffle(elems, shuffle);
			}
			return elems.some(function(elem) {
				return fn.call(this, $(elem));
			}, this);
		},
		eachCard: function(limit, fn) {
			return this.eachAny('cards', limit, fn, 6);
		},
		eachFoundation: function(fn) {
			return this.eachAny('foundations', fn);
		},
		eachTableau: function(fn) {
			return this.eachAny('tableaux', fn, 2);
		},
		getCards: function(limit) {
			return this.getBase('cards', limit);
		},
		tryTableaux: function(limit) {
			return this.eachCard(limit,function(card) {
				if (card.is(':contains(K):first-child')) {
					console.log(card.data('Card').toString());
					throw "Error: First Child Kings should not be moved yet...";
				}
				return this.eachTableau(function(tableau) {
					return this.game.tryMoveCard(card,tableau);
				});
			});
		},
		isAllRevealed: function() {
			return this.getCards('.down + .card').length == 0;
		},
		phaseReveal: function() {
			return this.tryTableaux('.down + .card');
		},
		phaseFoundations: function() {
			return this.eachCard(':last-child', function(card) {
				return this.eachFoundation(function(foundation) {
					return this.game.tryMoveCard(card,foundation);
				});
			});
		},
		phaseKingSpace: function() {
			var kings = this.getCards(':not(:first-child):contains(K)');
			var tabs = this.game.tableaux.filter(':empty');
			if (kings.length > tabs.length) {
				return this.tryTableaux(':not(:contains(K)):first-child');
			}
			return this.tryTableaux(kings);
		},
		phaseRemaining: function() {
			return this.tryTableaux(':not(:first-child)');
		}
	};

	function specialIndex(node) {
		var children = node.parentNode.childNodes;
		var index = 1 + children.length - Array.prototype.indexOf.call(children, node);
		return Math.ceil(index);
	}

	function arrayShuffleOnce(arr) {
		var parts = arr.splice(0), ind;
		for (var len=parts.length; len > 0; len--) {
			ind = Math.floor(Math.random() * len);
			arr.push(parts.splice(ind, 1)[0]);
		}
	}
	function arrayShuffle(arr, count) {
		count = count || 1;
		while (count > 0) {
			arrayShuffleOnce(arr);
			count--;
		}
		return arr;
	};

	window.AutoPlay = AutoPlay;

	function AutoPlayV2(game) {
		this.game = game;
		this.cards = $().add(game.tableaux.find('.card'));
		this.bases = $().add(game.foundations).add(game.tableaux);
		this.states = {};
		this.moves;
	}
	AutoPlayV2.prototype = {
		start: function() {
			this.stopped = false;
			this.safeStart();
		},
		stop: function() {
			this.stopped = true;
		},
		safeStart: function() {
			if (this.stopped) { return; }
			setTimeout(function(that){
				that.run()
			}, this.speed, this);
		},
		run: function() {
			// where am i?
			// have i been here before?
			var stateId = makeStateId(this.game);
			if (stateId in this.states) {
				this.moves = this.states[stateId];
			} else {
				this.moves = this.findMoves();
				this.states[stateId] = this.moves;
			}
			// where have i not gone?
			var move = this.getBestMove();
			if (move && this.tryMove(move)) {
				this.safeStart();
			} else {
				alert('Done what I can!');
			}
		},
		tryMove: function(move) {
			return this.game.tryMoveCard(move.card, move.base);
		},
		getBestMove: function() {
			// pick a move order:
			//   revealling moves
			//   open king space if needed
			//   foundation moves
			//   remaining non-returnable moves
			//   lastly returnable moves
			//     eventually with a recursion check.
		},
		findMoves: function() {
			// look for allowed moves
			var moves = this.moves = [];
		},
		createMoveData: function(card, base) {
			return move = {
				card: card,
				base: base,
				foundation: base.is('.foundation'),
				returnable: this.checkReturnable(card)
			};
		},
		checkReturnable: function(card) {
			var prev = card.perv();
			if (prev.length > 0 && !prev.is('.down')) {
				card = card.data('Card');
				prev = prev.data('Card');
				return (prev.faceValue - 1 == card.faceValue && prev.red() != card.red());
			}
			return false;
		}
	};

	function makeStateId(game) {
		var results = [];
		game.tableaux.each(function(elem){
			results.push(makeStateIdPart($(elem)));
		});
		return results.join(',');
	}
	function makeStateIdPart(table) {
		var deck = new Deck();
		table.find('.card').each(function(elem) {
			deck.push($(elem).data('Card'));
		});
		return deck.serialize();
	}

			/*var game = this.game,
				ps = new PlayState(this.game);
			if (ps.hasMove()) {
				var move = ps.getMove();
				game.tryMoveCard(move.card, move.base);
			}*/

	return AutoPlay;
});
