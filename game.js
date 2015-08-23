// Solitaire Game

define('jquery card autoplay'.split(' '), function($, Card, AutoPlay) {
	function DragDrop(draggable, droppable, success) {
		var that = this,
			drags = that.drags = $(draggable),
			drops = that.drops = $(droppable);
		that.success = success;
		that.options = { stopdrag: '.down' };
		drags.prop('draggable',true).on('dragstart', function(ev) {
			log('dragstart event');
			return that.onDragStart(ev, $(this));
		}).on('dragend', function(ev) {
			return that.onDragEnd(ev, $(this));
		});
		drops.on('dragover', function(ev) {
			return that.onDragOver(ev, $(this));
		}).on('drop', function(ev) {
			log('drop event');
			return that.onDrop(ev, $(this));
		});
	}
	DragDrop.prototype = {
		allowDrag: function(el) {
			var selector = this.options.stopdrag;
			return (selector && el.is(selector));
		},
		onDragStart: function(ev, el) {
			log('onDragStart call');
			if (this.allowDrag(el)) {
				ev.stopPropagation();
				return false;
			}
			var dt = ev.dataTransfer || ev.originalEvent && ev.originalEvent.dataTransfer;
			var drag = $(el);
			dt && dt.setData('text/plain', 'dragging');
			setTimeout(function() {
				el.addClass('dragging');
			}, 1);
			this.dragElem = el;
		},
		onDragEnd: function(ev, el) {
			el.removeClass('dragging');
			this.dragElem = null;
		},
		onDragOver: function(ev, el) {
			ev.preventDefault();
			return false;
		},
		onDrop: function(ev, el) {
			ev.stopPropagation();
			this.success.call(this, this.dragElem, el);
			return false;
		}
	};
	function ClickMove(draggable, droppable, success) {
		var that = this,
			drags = that.drags = $(draggable),
			drops = that.drops = $(droppable);
		that.success = success;
		that.activeElem = null;
		that.options = { stopmove: '.down' };
		drags.on('click', function(ev) {
			return that.onClick(ev, $(this));
		}).on('dblclick', function(ev) {
			return that.onDblClick(ev, $(this));
		});
		drops.on('click', function(ev) {
			return that.onDropClick(ev, $(this));
		});
	}
	ClickMove.prototype = {
		setActive: function(el) {
			var selector = this.options.stopdrag;
			if (selector && el.is(selector)) { return false; }
			this.activeElem = el;
			el.addClass('active');
		},
		clearActive: function() {
			this.activeElem.removeClass('active');
			this.activeElem = null;
		},
		onClick: function(ev, el) {
			if (this.activeElem) {
				if (this.activeElem.is(el)) {
					this.clearActive();
					return false;
				} else {
					this.defer(function() {
						if (!this.activeElem) {
							this.setActive(el);
						}
					});
				}
			} else {
				this.setActive(el);
				return false;
			}
		},
		onDblClick: function(ev, el) {
			log('onDblClick');
			var that = this;
			var moved = false;
			that.drops.each(function() {
				return !(moved = that.success.call(that,el,$(this)));
			});
			return moved;
		},
		onDropClick: function(ev, el) {
			if (this.activeElem) {
				if (this.success.call(this, this.activeElem, el)) {
					this.defer(function() {
						this.clearActive();
					});
				} else {
					this.clearActive();
				}
			}
		},
		defer: function(fn) {
			var that = this;
			setTimeout(function() {
				fn.call(that);
			}, 10);
		}
	};

	function TouchMove(draggable, droppable, success) {
		var that = this;
			drags = that.drags = $(draggable),
			drops = that.drops = $(droppable);
		that.success = success;
		that.activeElem = null;
		that.moving = false;
		that.options = { stopmove: '.down' };
		// touchstart touchend touchcancel touchleave touchmove
		// dragstart dragend dragover drop
		drags.on('touchstart', function(ev) {
			return that.onTouchStart(ev, $(this));
		}).on('touchend', function(ev) {
			return that.onTouchEnd(ev, $(this));
		}).on('touchmove', function(ev) {
			return that.onTouchMove(ev, $(this))
		});
	}
	TouchMove.prototype = {
		onTouchStart: function(ev, el) {
			log('touchstart event');
			this.activeElem = el;
			this.moving = false;
		},
		onTouchEnd: function(ev, el) {
			log('touchend event');
			if (this.moving) {
				this.checkDrop(ev);
				return el.triggerHandler('dragend');
			}
			// click should happen naturally
			log('p1');
			var now = performance.now();
			log('p2');
			if (this.last && now - this.last < 1000) {
				log('trigger');
				el.triggerHandler('dblclick');
				this.last = null;
			} else {
				log('now: ' + now);
				this.last = now;
			}
		},
		onTouchMove: function(ev, el) {
			if (!this.moving) {
				log('touchmove first: ' + this.moving);
				this.moving = true;
				this.activeElem.triggerHandler('dragstart');
			}
			this.x = ev.originalEvent.touches[0].clientX;
			this.y = ev.originalEvent.touches[0].clientY;
			this.checkDragOver(ev);
		},
		checkDragOver: function(ev) {
			// nothing yet
		},
		checkDrop: function(ev) {
			ev = ev.originalEvent;
			var elem = $(document.elementFromPoint(this.x, this.y));
			if (!elem.is(this.drops)) {
				elem = elem.parents(this.drops);
			}
			if (elem.length > 0) {
				log('trying to trigger?');
				elem.triggerHandler('drop');
			}
		}
	};

	function log(msg) {
		if (!log.div) { log.div = document.getElementById('log'); }
		var div = document.createElement('div');
		log.div.appendChild(div);
		div.textContent = msg;
	}

	function setupGameControls(game) {
		var drags = $().add(game.tableaux.find('.card')),
			drops = $().add(game.foundations).add(game.tableaux),
			fn = function(elem, base) {
				return game.tryMove(elem, base);
			};
		var ddset = new DragDrop(drags, drops, fn);
		ddset.options.stopdrag = '.down';
		var cmset = new ClickMove(drags, drops, fn);
		cmset.options.stopmove = '.down';
		var tmset = new TouchMove(drags, drops, fn);
		//tmset.options.stopmove = '.down';
	}

	function startGame(game) {
		setTimeout(function() {
			game.deal();
			setupGameControls(game);
		},1);
	}

	var Deck = Card.Deck;
	function Game(jqPlay) {
		var area = this.play = $(jqPlay);
		this.foundations = area.find('.foundation');
		this.tableaux = area.find('.tableau');
		startGame(this);
	}
	Game.prototype = {
		deal: function(deck) {
			if (!deck) {
				deck = Deck.full();
				deck.shuffle(5);
			}
			this.hash = deck.serialize();
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
						if (randBool()) {
							elem.addClass('flip');
						}
						this.tableaux.eq(index).append(elem);
						count[index] -= 1;
					}
				}
			}
		},
		clear: function() {
			$().add(this.foundations).add(this.tableaux).find('.card').remove();
		},
		redeal: function() {
			this.clear();
			var deck = Deck.fromSerial(this.hash);
			this.deal(deck);
		},
		tryMove: function(elem, base) {
			if (this.allowMove(elem,base)) {
				this.moveCard(elem, base);
				return true;
			}
			return false;
		},
		tryMoveCard: function(elem) {
			var that = this;
			var moved = false;
			drops.each(function() {
				return !(moved = that.tryMove(elem, $(this)));
			});
			return moved;
		},
		allowMove: function(elem, base) {
			var card = elem.data('Card'),
				isFoundation = base.is(this.foundations);
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
				if (!last) {
					throw 'Error: No card data';
				}
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
		moveCard: function(first, base) {
			var old = first.parent(this.tableaux),
				prev = first.prev(),
				current = $(first),
				next;// = first.next();
			while (current.length > 0) {
				next = current.next();
				base.append(current);
				current = next;
			}
			prev.removeClass('down'); // might be no element
			this.checkLength(base);
			this.checkLength(old);
			// should move check length to event
			this.trigger('move', first, base, old);
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
		},
		autoPlay: function(start) {
			if (!this.ap) { this.ap = new AutoPlay(this); }
			if (start) { this.ap.start(); }
			return this.ap;
		},
		bind: function(name, fn) {
			var evname = "Card" + properCase(name);
			this.play.bind(evname, ev);
		},
		trigger: function(name) {
			var evname = "Card" + properCase(name);
			this.play.trigger(evname);
		}
	};
	function randBool() {
		return Math.random() < 0.5;
	}
	function properCase(str) {
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	};

	return Game;
});
