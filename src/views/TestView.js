import src.views.BaseTestView as BaseTestView;
import src.conf.enums as enums;

from src.conf.enums import *;

var rand2 = Math.random;

var Class0 = Class(function() {
	this.init = function() {
		this.stuff = 0;
	};
	this.reset = function() {
		for (var i = 0; i < 10; i++) {
			this.stuff += rand0();
		}
		return this.stuff;
	};
});

var Class1 = Class(function() {
	this.init = function() {
		this.stuff = 0;
	};
	this.reset = function() {
		for (var i = 0; i < 10; i++) {
			this.stuff += rand1();
		}
		return this.stuff;
	};
});

var Class2 = Class(function() {
	this.init = function() {
		this.stuff = 0;
	};
	this.reset = function() {
		for (var i = 0; i < 10; i++) {
			this.stuff += rand2();
		}
		return this.stuff;
	};
});

var Class3 = Class(function() {
	var rand3 = Math.random;
	this.init = function() {
		this.stuff = 0;
	};
	this.reset = function() {
		for (var i = 0; i < 10; i++) {
			this.stuff += rand3();
		}
		return this.stuff;
	};
});

var Class4 = Class(function() {
	this.init = function() {
		this.stuff = 0;
	};
	this.reset = function() {
		var rand4 = Math.random;
		for (var i = 0; i < 10; i++) {
			this.stuff += rand4();
		}
		return this.stuff;
	};
});

var Class5 = Class(function() {
	this.init = function() {
		this.stuff = 0;
	};
	this.reset = function() {
		for (var i = 0; i < 10; i++) {
			this.stuff += enums.rand1();
		}
		return this.stuff;
	};
});

var TestView = exports = Class(BaseTestView, function(supr) {
	this.init = function(opts) {
		opts.hideViews = false;
		opts.disableLogs = false;
		opts.useMicroseconds = true;

		opts.setupFunc = function() {};

		opts.testIters = 10000;

		opts.testFuncs = [
			function() {
				var obj = new Class0();
				obj.reset();
				return obj;
			},
			function() {
				var obj = new Class1();
				obj.reset();
				return obj;
			},
			function() {
				var obj = new Class2();
				obj.reset();
				return obj;
			},
			function() {
				var obj = new Class3();
				obj.reset();
				return obj;
			},
			function() {
				var obj = new Class4();
				obj.reset();
				return obj;
			},
			function() {
				var obj = new Class5();
				obj.reset();
				return obj;
			}
		];

		supr(this, 'init', arguments);
	};
});
