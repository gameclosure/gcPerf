import ui.View as View;

import src.lib.animate1 as animate1;
import src.lib.animate2 as animate2;
import src.views.BaseTestView as BaseTestView;

var TestView = exports = Class(BaseTestView, function (supr) {
	this.init = function (opts) {
		var view1 = new View({
			parent: GC.app.view,
			width: 20,
			height: 20
		});

		var obj1 = {
			x: 0,
			y: 0
		};

		var view2 = new View({
			parent: GC.app.view,
			width: 20,
			height: 20
		});

		var obj2 = {
			x: 0,
			y: 0
		};

		opts.hideViews = false;
		opts.disableLogs = true;
		opts.useMicroseconds = true;

		opts.setupFunc = function () {};

		opts.testIters = 10000;

		opts.testFuncs = [
			function () {
				animate1(view1)
					.now({ x: 2500, y: 2500 }, 50, animate1.easeIn)
					.then({ x: 0, y: 0 }, 50, animate1.easeOut)
					.then(function() {});

				animate1(obj1)
					.now({ x: 2500, y: 2500 }, 50, animate1.easeIn)
					.then({ x: 0, y: 0 }, 50, animate1.easeOut)
					.then(function() {});
			},
			function () {
				animate2(view2)
					.now({ x: 2500, y: 2500 }, 50, animate2.easeIn)
					.then({ x: 0, y: 0 }, 50, animate2.easeOut)
					.then(function() {});

				animate2(obj2)
					.now({ x: 2500, y: 2500 }, 50, animate2.easeIn)
					.then({ x: 0, y: 0 }, 50, animate2.easeOut)
					.then(function() {});
			}
		];

		supr(this, 'init', arguments);
	};
});
