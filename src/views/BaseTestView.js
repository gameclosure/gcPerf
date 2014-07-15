import ui.View as View;
import ui.ImageView as ImageView;
import ui.ScoreView as ScoreView;

// This class is inherited by TestView. Create and run your tests in TestView!

var TEST_NUM_Y = 300;
var TEST_NUM_WIDTH = BG_WIDTH / 3;
var TEST_NUM_HEIGHT = 64;
var TEST_NUM_DATA = {
	"0": { image: "resources/images/text_w_0.png" },
	"1": { image: "resources/images/text_w_1.png" },
	"2": { image: "resources/images/text_w_2.png" },
	"3": { image: "resources/images/text_w_3.png" },
	"4": { image: "resources/images/text_w_4.png" },
	"5": { image: "resources/images/text_w_5.png" },
	"6": { image: "resources/images/text_w_6.png" },
	"7": { image: "resources/images/text_w_7.png" },
	"8": { image: "resources/images/text_w_8.png" },
	"9": { image: "resources/images/text_w_9.png" }
};

var BaseTestView = exports = Class(View, function(supr) {
	var _stepCount = 0;
	var _iterCount = 0;
	var _step = 0;
	var _totals = [];
	var _startTime = 0;
	var _disableLogs = true;
	var _hideViews = true;
	var _timerFn = null;
	var _timerUnits = '';
	var _testFuncs = null;
	var _setupFunc = null;
	var _resultTestViews = [];
	var _resultAvgViews = [];
	var _resultIterViews = [];

	this.init = function(opts) {
		supr(this, 'init', arguments);

		_setupFunc = opts.setupFunc || function() {};
		_testFuncs = opts.testFuncs || [];
		_stepCount = _testFuncs.length || 0;
		_iterCount = opts.testIters || 10000;
		_disableLogs = opts.disableLogs || false;
		_hideViews = opts.hideViews || false;

		var useMicros = opts.useMicroseconds && NATIVE.getCurrentTimeMicroseconds;
		if (useMicros) {
			_timerFn = NATIVE.getCurrentTimeMicroseconds;
			_timerUnits = ' μs';
		} else {
			_timerFn = Date.now;
			_timerUnits = ' ms';
		}

		for (var t = 0; t < _stepCount; t++) {
			_totals.push([]);
		}

		!_hideViews && this.designView();
	};

	this.designView = function() {
		var s = this.style;

		this.background = new ImageView({
			parent: this,
			x: (s.width - BG_WIDTH) / 2,
			y: (s.height - BG_HEIGHT) / 2,
			width: BG_WIDTH,
			height: BG_HEIGHT,
			image: "resources/images/background.png"
		});

		var bgs = this.background.style;
		var offy = -bgs.y;

		this.testNumber = new ScoreView({
			parent: this.background,
			x: 0,
			y: TEST_NUM_Y,
			width: TEST_NUM_WIDTH,
			height: TEST_NUM_HEIGHT,
			characterData: TEST_NUM_DATA
		});

		this.avgNumber = new ScoreView({
			parent: this.background,
			x: TEST_NUM_WIDTH,
			y: TEST_NUM_Y,
			width: TEST_NUM_WIDTH,
			height: TEST_NUM_HEIGHT,
			characterData: TEST_NUM_DATA
		});

		this.itersNumber = new ScoreView({
			parent: this.background,
			x: 2 * TEST_NUM_WIDTH,
			y: TEST_NUM_Y,
			width: TEST_NUM_WIDTH,
			height: TEST_NUM_HEIGHT,
			characterData: TEST_NUM_DATA
		});

		var resultHeight = (768 - (TEST_NUM_Y - offy)) / _stepCount;
		resultHeight = Math.min(TEST_NUM_HEIGHT, resultHeight);
		for (var t = 0; t < _stepCount; t++) {
			_resultTestViews.push(new ScoreView({
				parent: this.background,
				x: 0,
				y: TEST_NUM_Y + t * resultHeight,
				width: TEST_NUM_WIDTH,
				height: resultHeight,
				characterData: TEST_NUM_DATA,
				visible: false,
				canHandleEvents: false
			}));

			_resultAvgViews.push(new ScoreView({
				parent: this.background,
				x: TEST_NUM_WIDTH,
				y: TEST_NUM_Y + t * resultHeight,
				width: TEST_NUM_WIDTH,
				height: resultHeight,
				characterData: TEST_NUM_DATA,
				visible: false,
				canHandleEvents: false
			}));

			_resultIterViews.push(new ScoreView({
				parent: this.background,
				x: 2 * TEST_NUM_WIDTH,
				y: TEST_NUM_Y + t * resultHeight,
				width: TEST_NUM_WIDTH,
				height: resultHeight,
				characterData: TEST_NUM_DATA,
				visible: false,
				canHandleEvents: false
			}));
		}
	};

	this.resetView = function() {};
	this.constructView = function() {};
	this.deconstructView = function() {};

	this.onInputStart = function() {
		// tapping the screen steps through the tests
		_step++;
		if (_step > _stepCount) {
			_step = 0;
			if (!_hideViews) {
				for (var t = 0; t < _stepCount; t++) {
					var testView = _resultTestViews[t];
					testView.setText(t);
					testView.style.visible = true;
					var avgView = _resultAvgViews[t];
					avgView.setText(this.getSum(t));
					avgView.style.visible = true;
					var iterView = _resultIterViews[t];
					iterView.setText(_totals[t].length);
					iterView.style.visible = true;
				}
			}
			!_disableLogs && logger.log("Resting...");
			for (var i = 0; i < _stepCount; i++) {
				this.logResult("~~~ test_" + i, i);
			}
		} else {
			if (!_hideViews) {
				for (var t = 0; t < _stepCount; t++) {
					var testView = _resultTestViews[t];
					testView.style.visible = false;
					var avgView = _resultAvgViews[t];
					avgView.style.visible = false;
					var iterView = _resultIterViews[t];
					iterView.style.visible = false;
				}
			}
		}
	};

	this.tick = function(dt) {
		// run the current test once per tick
		if (_step > 0) {
			var elapsed = 0;
			var adjStep = _step - 1;
			var name = "~~~ test_" + adjStep;
			var testFunction = _testFuncs[adjStep];

			_setupFunc();

			this.startMicroTimer();
			for (var i = 0; i < _iterCount; i++) {
				testFunction();
			}
			elapsed = this.stopMicroTimer();

			if (elapsed > 0) {
				_totals[adjStep].push(elapsed);
				this.logResult(name, adjStep);
			}
		}
	};

	this.getSum = function(step) {
		var sum = 0;
		var list = _totals[step];
		for (var i = 0, len = list.length; i < len; i++) {
			sum += list[i];
		}
		return ~~(sum / len);
	};

	this.logResult = function(name, step) {
		var avg = this.getSum(step);
		var list = _totals[step];
		var len = list.length;

		// log results
		!_disableLogs && logger.log(name, avg + _timerUnits, len);

		// update display
		!_hideViews && this._updateViews(avg, len);
	};

	var _displayStep = -1;
	var _displayAvg = -1;
	var _displayIters = -1;
	this._updateViews = function(avg, iters) {
		var step = _step - 1;
		if (step < 0) {
			this.testNumber.style.visible = false;
			this.avgNumber.style.visible = false;
			this.itersNumber.style.visible = false;
		} else {
			this.testNumber.style.visible = true;
			this.avgNumber.style.visible = true;
			this.itersNumber.style.visible = true;
			if (_displayStep !== step) {
				_displayStep = step;
				this.testNumber.setText(_displayStep);
			}
			if (_displayAvg !== avg) {
				_displayAvg = avg;
				this.avgNumber.setText(avg);
			}
			if (_displayIters !== iters) {
				_displayIters = iters;
				this.itersNumber.setText(iters);
			}
		}
	};

	this.startMicroTimer = function() {
		_startTime = _timerFn();
	};

	this.stopMicroTimer = function() {
		return _timerFn() - _startTime;
	};
});
