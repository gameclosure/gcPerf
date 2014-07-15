import src.views.BaseTestView as BaseTestView;

// TEST 0 CLASS
var Class0 = Class(function() {
	this.init = function() {
		this.propA = 0;
		this.propB = "stuff";
		this.propC = {};
		this.propD = [];
		this.propE = undefined;
	};

	this.reset = function() {
		this.propA = 1000;
		this.propB = "";
		this.propC.started = true;
		this.propD.push(1, 2, 3, 4, 5);
		this.propE = undefined;
	};
});

// TEST 1 CLASS
var Class1 = Class(function() {
	this.init = function() {
		this.propA = 0;
		this.propB = "stuff";
		this.propC = {};
		this.propD = [];
		this.propE = void(0);
	};

	this.reset = function() {
		this.propA = 1000;
		this.propB = "";
		this.propC.started = true;
		this.propD.push(1, 2, 3, 4, 5);
		this.propE = void(0);
	};
});

var TestView = exports = Class(BaseTestView, function(supr) {
	this.init = function(opts) {
		opts.hideViews = false;
		opts.disableLogs = false;
		// only available in native
		opts.useMicroseconds = true;

		// setup code if necessary
		opts.setupFunc = function() {};

		// number of times per tick to run the test function
		opts.testIters = 10000;

		// list of test functions
		opts.testFuncs = [
			// TEST 0
			function() {
				var obj0 = new Class0();
				obj0.reset();
				return obj0;
			},
			// TEST 1
			function() {
				var obj1 = new Class1();
				obj1.reset();
				return obj1;
			}
		];

		supr(this, 'init', arguments);
	};
});
