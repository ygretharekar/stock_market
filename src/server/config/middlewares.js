"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _expressHistoryApiFallback = require("express-history-api-fallback");

var _expressHistoryApiFallback2 = _interopRequireDefault(_expressHistoryApiFallback);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _expressSession = require("express-session");

var _expressSession2 = _interopRequireDefault(_expressSession);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _connectMongo = require("connect-mongo");

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _database = require("./database");

var _database2 = _interopRequireDefault(_database);

var _stocks = require("../Models/stocks");

var _stocks2 = _interopRequireDefault(_stocks);

var _routes = require("../routes/routes");

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mongoConnect = (0, _connectMongo2.default)(_expressSession2.default);

const _default = (app, io) => {
	app.use(_express2.default.static("dist"));
	app.use((0, _expressHistoryApiFallback2.default)(_path2.default.join(__dirname, "../../../dist/index.html")));
	app.use(_bodyParser2.default.urlencoded({ extended: true }));
	app.use(_bodyParser2.default.json());
	app.use(_routes2.default);
	app.use((0, _expressSession2.default)({
		secret: "secret",
		resave: true,
		secure: false,
		saveUninitialized: true,
		store: new mongoConnect({
			mongooseConnection: _database2.default
		})
	}));

	io.on("connection", socket => {
		console.log("new client connected with id: ", socket.id);

		socket.on("disconnect", () => console.log("Client disconnected.."));

		socket.on("addStock", data => {
			const stock = new _stocks2.default({
				stockName: data.toUpperCase()
			});

			stock.save((err, res) => {
				if (err) console.error(err);
				console.log(`Added new stock ${data.toUpperCase()}`);
			});
			socket.broadcast.emit("added stock", stock);
		});

		socket.on("deleteStock", data => {
			_stocks2.default.remove({
				stockName: data
			}, (err, res) => {
				if (err) console.error(err);else {
					console.log("====================================");
					console.log(`Removed stock ${data}`);
					console.log("====================================");
					console.log(res);
				}
			});

			socket.broadcast.emit("removed stock", data);
		});
	});
};

exports.default = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(mongoConnect, "mongoConnect", "src/serverES6/config/middlewares.js");

	__REACT_HOT_LOADER__.register(_default, "default", "src/serverES6/config/middlewares.js");
}();

;