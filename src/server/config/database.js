"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config({ silence: true });

const db = _mongoose2.default.connection.openUri(process.env.MLAB_URI);

db.on("error", err => {
	console.log("Connection failed!");
	console.error(err);
});

db.once("open", () => console.log("Connected to mongodb"));

const _default = db;
exports.default = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(db, "db", "src/serverES6/config/database.js");

	__REACT_HOT_LOADER__.register(_default, "default", "src/serverES6/config/database.js");
}();

;