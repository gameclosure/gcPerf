import src.conf.globals;

exports = Class(GC.Application, function(supr) {
	this._settings = {
		alwaysRepaint: true,
		logsEnabled: true,
		showFPS: false
	};

	this.initUI = function() {};

	this.launchUI = function() {
		// Write your performance tests in TestView.js!
		controller.setRootView(this.view);
		controller.transitionToTest();
	};
});
