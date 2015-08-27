define(['jquery','deck'], function($, Deck) {
	function AutoPlayV2(game) {
		this.game = game;
		this.bases = $().add(game.foundations).add(game.tableaux);
		this.speed = 250;
		var that = this;
		game.bind('move',function() {
			that.clearHint();
		});
	}
	AutoPlayV2.prototype = {
		start: function() {
			this.stopped = false;
			this.states = {};
			this.moves = [];
			this.safeStart();
			this.round = 0;
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
		hint: function() {
			var that = this;
			that.states = {};
			that.moves = that.findAllMoves();
			var move = that.getBestMove();
			if (move) {
				move.card.addClass('hint');
				move.base.addClass('hint');
				that.hintTimer = setTimeout(function() {
					that.clearHint();
				}, 10000);
			} else {
				window.alert('No moves left');
			}
		},
		clearHint: function() {
			if (this.hintTimer) {
				this.hintTimer = clearTimeout(this.hintTimer);
				$('.hint').removeClass('hint');
			}
		},
		run: function() {
			// where am i?
			// have i been here before?
			var stateId = makeStateId(this.game);
			if (stateId in this.states) {
				this.moves = this.states[stateId];
			} else {
				this.moves = this.findAllMoves();
				this.states[stateId] = this.moves;
			}
			// where have i not gone?
			var move = this.getBestMove();
			if (move && this.tryMove(move)) {
				this.round++;
				if (move.foundation || !move.returnable) {
					// non-returnables should change all future states.
					this.states = {};
					this.moves = undefined;
				}
				this.safeStart();
			} else {
				alert('Done what I can! ' + this.round + ' moves!');
			}
		},
		tryMove: function(move) {
			return this.game.tryMoveCard(move.card, move.base);
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
		getCards: function(limit) {
			return this.getBase('cards', limit);
		},
		getBestMove: function() {
			// pick a move order:
			//   revealling moves
			//   open king space if needed
			//   foundation moves
			//   remaining non-returnable moves
			//   lastly returnable moves
			//     eventually with a recursion check.
			return this.getUseKingSpaceMove() ||
				this.getRevealMove() ||
				this.getOpenKingSpaceMove() ||
				this.getFoundationMove() ||
				this.getOtherMove() ||
				this.getReturnableMove();
		},
		findAllMoves: function() {
			// look for allowed moves
			var moves = [];
			this.eachAny('cards', function(card) {
				this.findMovesForCard(card, moves);
			});
			return moves;
		},
		findMovesForCard: function(card, moves) {
			this.eachAny('foundation', function(found) {
				if (this.game.allowMove(card, found)) {
					moves.push(this.createMoveData(card,found));
				}
			});
			this.eachAny('tableaux', function(found) {
				if (this.game.allowMove(card, found)) {
					moves.push(this.createMoveData(card,found));
				}
			});
		},
		createMoveData: function(card, base) {
			return {
				card: card,
				base: base,
				foundation: base.is('.foundation'),
				returnable: this.checkReturnable(card),
				firstchild: card.is(':first-child'),
				king: card.data('Card').face() == 'K',
				reveal: this.checkReveal(card)
			};
		},
		checkReturnable: function(card) {
			var prev = card.prev();
			if (prev.length > 0 && !prev.is('.down')) {
				card = card.data('Card');
				prev = prev.data('Card');
				return (prev.faceValue - 1 == card.faceValue && prev.red() != card.red());
			}
			return false;
		},
		checkReveal: function(card) {
			var prev = card.prev();
			return prev.length > 0 && prev.is('.down');
		},
		getBestMoveFilter(filter, shuffle) {
			var moves = this.moves.slice(0), i, l = moves.length;
			if (shuffle) {
				if (typeof shuffle != 'number') {
					shuffle = 5;
				}
				arrayShuffle(moves, shuffle);
			}
			for (i=0; i<l; i++) {
				if (filter(moves[i])) {
					return moves[i];
				}
			}
		},
		getRevealMove: function() {
			return this.getBestMoveFilter(function(move) {
				return move.reveal;
			});
		},
		getOtherMove: function() {
			return this.getBestMoveFilter(function(move) {
				return !move.foundation && !move.returnable && !move.firstchild;
			});
		},
		getOpenKingSpaceMove: function() {
			var kings = this.getBase('cards', ':not(:first-child):contains(K)');
			var tabs = this.getBase('tableaux', ':empty');
			if (kings.length > tabs.length) {
				return this.getBestMoveFilter(function(move) {
					return move.firstchild && !move.king;
				});
			}
		},
		getUseKingSpaceMove: function() {
			var kings = this.getBase('cards', ':not(:first-child):contains(K)');
			var tabs = this.getBase('tableaux', ':empty');
			if (kings.length > 0 && tabs.length > 0) {
				return this.getBestMoveFilter(function(move) {
					return move.king && !move.firstchild;
				});
			}
		},
		getFoundationMove: function() {
			return this.getBestMoveFilter(function(move) {
				return move.foundation;
			});
		},
		getReturnableMove: function() {
			// TODO: Make this smarter about returnable paths.
			return this.getBestMoveFilter(function(move) {
				return !move.foundation && move.returnable;
			}, true);
		}
	};

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

	function makeStateId(game) {
		var results = [];
		game.tableaux.each(function(){
			results.push(makeStateIdPart($(this)));
		});
		return results.join(',');
	}
	function makeStateIdPart(table) {
		var deck = new Deck();
		table.find('.card').each(function() {
			var card = $(this).data('Card');
			deck.push(card);
		});
		return deck.serialize();
	}

			/*var game = this.game,
				ps = new PlayState(this.game);
			if (ps.hasMove()) {
				var move = ps.getMove();
				game.tryMoveCard(move.card, move.base);
			}*/

	return AutoPlayV2;
});
