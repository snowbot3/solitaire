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

require('QUnit tests/cardTest'.split(' '), function(QUnit, cardTest) {
	QUnit.load();
	QUnit.start();
});
