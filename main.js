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
		new Game('.foundation', '.tableau');
	});
});
