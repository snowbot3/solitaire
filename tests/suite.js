// card tests
requirejs.config({
	baseUrl: '..',
	paths: {
		QUnit: '/js/qunit'
	},
	shim: {
		QUnit: {
			exports: 'QUnit',
			init: function() {
				QUnit.config.autoload = false;
				QUnit.config.autostart = false;
			}
		}
	}
});

require([
	'QUnit',
	'tests/utilTest',
	'tests/cardTest',
	'tests/deckTest'
],
function(QUnit, cardTest, deckTest) {
	QUnit.load();
	QUnit.start();
});
