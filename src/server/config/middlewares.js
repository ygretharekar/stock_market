"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _expressHistoryApiFallback = require("express-history-api-fallback");

var _expressHistoryApiFallback2 = _interopRequireDefault(_expressHistoryApiFallback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _default = app => {
	app.use((0, _expressHistoryApiFallback2.default)(_path2.default.join(__dirname, "../../../dist/index.html")));
};

exports.default = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(_default, "default", "src/serverES6/config/middlewares.js");
}();

;