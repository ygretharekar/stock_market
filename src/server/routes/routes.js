"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _stocks = require("../Models/stocks");

var _stocks2 = _interopRequireDefault(_stocks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config({ silent: true });

const app = _express2.default.Router();

app.post("/api/fetchstock", (req, res) => {
	let { data } = req.body;

	_axios2.default.get("https://www.alphavantage.co/query", {
		params: {
			function: "TIME_SERIES_INTRADAY",
			symbol: data,
			interval: "1min",
			apikey: process.env.ALPHA_VANTAGE_API
		}
	}).then(resp => {
		//console.log(resp);
		res.status(200).json(resp.data);
	}).catch(err => {
		console.error(err);
		res.status(404).send("stocks not found");
	});
});

app.post("/api/fetchstocks", (req, res) => {
	let { data } = req.body;

	_axios2.default.get(`https://www.quandl.com/api/v3/datasets/WIKI/${data}/data.json`, {
		params: {
			api_key: process.env.QUANDL_API
		}
	}).then(resp => {
		//console.log(resp);
		res.status(200).json(resp.data);
	}).catch(err => {
		console.error(err);
		res.status(404).send("stocks not found");
	});
});

app.post("/api/stock", (req, res) => {
	_stocks2.default.find({}, (err, stocks, next) => {
		if (err) next(err);
		// console.log(stocks);
		return res.status(200).json(stocks);
	});
});

const _default = app;
exports.default = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(app, "app", "src/serverES6/routes/routes.js");

	__REACT_HOT_LOADER__.register(_default, "default", "src/serverES6/routes/routes.js");
}();

;