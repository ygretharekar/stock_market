"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _socket = require("socket.io");

var _socket2 = _interopRequireDefault(_socket);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _middlewares = require("./config/middlewares");

var _middlewares2 = _interopRequireDefault(_middlewares);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

const server = _http2.default.Server(app);
const io = new _socket2.default(server);

(0, _middlewares2.default)(app, io);

server.listen(3000, err => {
	if (err) throw err;
	console.log("[INFO] Listening on *: 3000");
});
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(app, "app", "src/serverES6/server.js");

	__REACT_HOT_LOADER__.register(server, "server", "src/serverES6/server.js");

	__REACT_HOT_LOADER__.register(io, "io", "src/serverES6/server.js");
}();

;