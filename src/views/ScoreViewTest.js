import src.views.BaseTestView as BaseTestView;

import src.utils as utils;

import .ScoreView1 as ScoreView1;
import .ScoreView2 as ScoreView2;

var TestView = exports = Class(BaseTestView, function(supr) {

	var rollFloat = utils.rollFloat;

	var rolledFloats = [];
	var rolledFloatIndex = 0;
	var rollFloat2 = function() {
		if ((++rolledFloatIndex) >= 1000) rolledFloatIndex = 0;
		return rolledFloats[rolledFloatIndex];
	}

	this.init = function(opts) {
		opts.hideViews = false;
		opts.disableLogs = false;
		// only available in native
		opts.useMicroseconds = true;

		// setup code if necessary
		opts.setupFunc = function() {
		};

		// number of times per tick to run the test function
		opts.testIters = 1000;

		// list of test functions
		opts.testFuncs = [
			// WORST
			function() {
				scoreView1.setText(~~(random() * 100000));
			},
			function() {
				scoreView2.setText(~~(random() * 100000));
			},
			// BEST
			function() {
				scoreView1.setText('12345');
			},
			function() {
				scoreView2.setText('12345');
			},
			// COUNTER
			function() {
				scoreView1.setText(++testNumber);
			},
			function() {
				scoreView2.setText(++testNumber);
			},
			// TEST 1
			function() {
				testNumber = 0;
			}
		];

		supr(this, 'init', arguments);

		var svOpts = {
			parent: this,
			x: 10,
			y: 20,
			width: 576 / 2,
			height: 75,
			characterData: {
				"0": { "image": "resources/images/text/score_0.png" },
				"1": { "image": "resources/images/text/score_1.png" },
				"2": { "image": "resources/images/text/score_2.png" },
				"3": { "image": "resources/images/text/score_3.png" },
				"4": { "image": "resources/images/text/score_4.png" },
				"5": { "image": "resources/images/text/score_5.png" },
				"6": { "image": "resources/images/text/score_6.png" },
				"7": { "image": "resources/images/text/score_7.png" },
				"8": { "image": "resources/images/text/score_8.png" },
				"9": { "image": "resources/images/text/score_9.png" },
				",": { "image": "resources/images/text/score_comma.png" },
				":": { "image": "resources/images/text/score_colon.png" }
			}
		};
		var scoreView1 = new ScoreView1(merge({y: 0}, svOpts));
		var scoreView2 = new ScoreView2(merge({y: 50}, svOpts));
		var random = Math.random;
		var testNumber = 0;
	};
});
