// Solitaire Game

requirejs.config({
	paths: {
		jquery: 'http://code.jquery.com/jquery-2.1.4.min'
	}
});

require('jquery game'.split(' '), function($, Game) {
	$(function() {
		// Fix Dom Spacing
		$('.tableau').parent().each(function(){
			var div = $(this);
			var children = div.children();
			div.empty();
			children.each(function(){
				div.append(this);
			});
		});

		$('#play,.card').each(function() {
			$(this).attr('unselectable', 'on')
				.css('user-select', 'none')
				.on('selectstart', false);
		});

		// Start Game
		var game = window.currentGame = new Game('#play');

		// Controller Buttons
		$('<button type="button">Reload</button>')
			.appendTo('#controller').on('click', function() {
				location.reload();
			});
		$('<button type="button">AutoPlay</button>')
			.appendTo('#controller').on('click', function() {
				game.autoPlay().restart();
			});
		$('<button type="button">Stop AP</button>')
			.appendTo('#controller').on('click', function() {
				game.autoPlay().stop();
			});
		$('<button type="button">Faster</button>')
			.appendTo('#controller').on('click', function() {
				var speed = game.autoPlay().speed;
				speed = (speed > 100 ? speed - 50 : 50);
				game.autoPlay().speed = speed;
			});
		$('<button type="button">Slower</button>')
			.appendTo('#controller').on('click', function() {
				var speed = game.autoPlay().speed;
				speed = (speed < 400 ? speed + 50 : 450);
				game.autoPlay().speed = speed;
			});
		$('<button type="button">FullScreen</button>')
			.appendTo('#controller').on('click', function() {
				toggleFullScreen();
			});
	});
	function toggleFullScreen() {
		if (!document.fullscreenElement &&    // alternative standard method
				!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			} else if (document.documentElement.msRequestFullscreen) {
				document.documentElement.msRequestFullscreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullscreen) {
				document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		}
	}
});

function log(msg) {
	if (!log.div) { log.div = document.getElementById('log'); }
	var div = document.createElement('div');
	log.div.appendChild(div);
	div.textContent = msg;
}

