import ui.View as View;

import src.lib.utils as utils;
import src.views.BaseTestView as BaseTestView;
var rollInt = utils.rollInt;

var LOOP_ITERS = 1000;

var Class0 = Class(function () {
	this.init = function (opts) {};

	var b = bind;
	this.reset = function(fn, ctx) {
		var f = b(ctx, fn);
		for (var i = 0; i < LOOP_ITERS; i++) {
			f(i);
		}
	};
});

var Class1 = Class(function () {
	this.init = function (opts) {};

	this.reset = function(fn, ctx) {
		var f = fn.bind(ctx);
		for (var i = 0; i < LOOP_ITERS; i++) {
			f(i);
		}
	};
});

var Class2 = Class(function () {
	this.init = function (opts) {};

	this.reset = function(fn, ctx) {
		var f = function(i) { fn.call(ctx, i); };
		for (var i = 0; i < LOOP_ITERS; i++) {
			f(i);
		}
	};
});

var Class3 = Class(function () {
	this.init = function (opts) {};

	this.reset = function(fn, ctx) {
		for (var i = 0; i < LOOP_ITERS; i++) {
			fn.call(ctx, i);
		}
	};
});

var inst0 = new Class0();
var inst1 = new Class1();
var inst2 = new Class2();
var inst3 = new Class3();

var TestView = exports = Class(BaseTestView, function(supr) {
	this.init = function(opts) {
		opts.hideViews = false;
		opts.disableLogs = true;
		opts.useMicroseconds = true;

		opts.setupFunc = function() {};

		opts.testIters = 50;

		opts.testFuncs = [
			function() {
				inst0.reset(function(i) {
					return i * i;
				}, this);
			},
			function() {
				inst1.reset(function(i) {
					return i * i;
				}, this);
			},
			function() {
				inst2.reset(function(i) {
					return i * i;
				}, this);
			},
			function() {
				inst3.reset(function(i) {
					return i * i;
				}, this);
			}
		];

		supr(this, 'init', arguments);
	};
});
