"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

var stockSchema = new Schema({
	stockName: String
});

const stockModel = _mongoose2.default.model("stockModel", stockSchema);

const _default = stockModel;
exports.default = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(Schema, "Schema", "src/serverES6/Models/stocks.js");

	__REACT_HOT_LOADER__.register(stockSchema, "stockSchema", "src/serverES6/Models/stocks.js");

	__REACT_HOT_LOADER__.register(stockModel, "stockModel", "src/serverES6/Models/stocks.js");

	__REACT_HOT_LOADER__.register(_default, "default", "src/serverES6/Models/stocks.js");
}();

;