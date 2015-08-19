// Solitaire Game

define('jquery card'.split(' '), function($, Card) {
	function DragDrop(draggable, droppable, success) {
		var dragElem = null, drags = this.drags = $(draggable),
			drops = this.drops = $(droppable),
			options = this.options = {};
		this.success = success;
		drags.prop('draggable',true).on('dragstart',function(ev){
			if (options.stopDragClass && this.classList.contains(options.stopDragClass)) {
				ev.stopPropagation();
				return false;
			}
			var dt = ev.dataTransfer || ev.originalEvent.dataTransfer;
			var drag = $(this);
			dt.setData('text/plain', 'dragging');
			setTimeout(function() {
				drag.addClass('dragging');
			},1);
			dragElem = drag;
		}).on('dragend',function(ev){
			$(this).removeClass('dragging');
			dragElem = null;
		});
		drops.on('dragover',function(ev){
			ev.preventDefault();
			return false;
		}).on('drop', function(ev) {
			ev.stopPropagation();
			success.call(this,dragElem,$(this));
			return false;
		});
	}
	DragDrop.prototype = {
		activateClick: function() {
			var activeElem = null,
				drags = this.drags,
				drops = this.drops,
				options = this.options,
				success = this.success;
			function setActive(elem) {
				if (options.stopDragClass && elem[0].classList.contains(options.stopDragClass)) {
					return false;
				}
				activeElem = elem;
				activeElem.addClass('active');
			}
			function nullActive() {
				activeElem.removeClass('active');
				activeElem = null;
			}
			function defer(fn) {
				var args = Array.prototype.slice.call(arguments,1);
				args.unshift(10);
				args.unshift(fn);
				setTimeout.apply(this,args);
			}
			drags.on('click',function(ev){
				if (activeElem) {
					if (activeElem[0] == this) {
						nullActive();
						return false; // hopefully stop bubbling
					} else {
						defer(function(elem) {
							if (!activeElem) {
								setActive(elem);
							}
						},$(this));
					}
				} else {
					setActive($(this));
					return false;
				}
			});
			drops.on('click',function(ev){
				if (activeElem) {
					if (success.call(this,activeElem,$(this))) {
						defer(function() {
							nullActive();
						});
					} else {
						nullActive();
					}
				}
			});
		}
	};
	function startGame(game) {
		setTimeout(function() {
			game.deal();
			//setupDragDrop(game);
			var drops = $().add(game.foundations)
				.add(game.tableaux);
			var drags = $().add(game.tableaux.find('.card'));
			var ddset = new DragDrop(drags,drops,function(drag,drop){
				return game.tryMoveCard(drag,drop);
			});
			ddset.options.stopDragClass='down';
			ddset.activateClick();
		},1);
	}

	var Deck = Card.Deck;
	function Game(jqFoundation, jqTableau) {
		this.foundations = $(jqFoundation);
		this.tableaux = $(jqTableau);
		startGame(this);
	}
	Game.prototype = {
		deal: function() {
			var deck = new Deck();
			deck.shuffle(5);
			var count = [3, 4, 5, 6, 7, 8, 9, 10];
			while (count[7] > 0) {
				for (var index = 0; index < 8; index++) {
					if (count[index] > 0) {
						var card = deck.pop();
						var elem = $(card.elem());
						elem.data('Card', card);
						if (count[index] % 2 == 0) {
							elem.addClass('down');
						}
						this.tableaux.eq(index).append(elem);
						count[index] -= 1;
					}
				}
			}
		},
		tryMoveCard: function(elem, base) {
			if (this.allowMove(elem,base)) {
				this.moveCard(elem, base);
				return true;
			}
			return false;
		},
		allowMove: function(elem, base) {
			var card = elem.data('Card'),
				isFoundation = base.is('.foundation'),
				isEmpty = base.is(':empty'),
				isLast = elem.is(':last-child');
			if (elem.is('.down')) { return false; }
			if (base.find(elem).length > 0) { return false; }
			if (isEmpty) {
				if (isFoundation) {
					return isLast && card.face() == 'A';
				} else {
					return card.face() == 'K';
				}
			} else {
				var last = base.children('.card:last-child').data('Card');
				if (isFoundation) {
					return isLast && (last.suitValue == card.suitValue
						&& (last.faceValue + 1) == card.faceValue);
				} else {
					return (last.red() != card.red()
						&& (last.faceValue - 1) == card.faceValue);
				}
			}
			return false;
		},
		moveCard: function(elem, base) {
			var old = elem.parent('.tableau'),
				prev = elem.prev()
				next = elem.next();
			while (elem.length > 0) {
				next = elem.next();
				base.append(elem);
				elem = next;
			}
			prev.removeClass('down'); // might be no element
			this.checkLength(base);
			this.checkLength(old);
		},
		checkLength: function(base) {
			// should go by pixel height...
			base.removeClass('long').removeClass('extra');
			if (base.height() > 300) {
				base.addClass('long');
			}
			if (base.height() > 300) {
				base.addClass('extra');
			}
		}
	};
	return Game;
});
