import express from "express";
import socketIO from "socket.io";
import http from "http";

import appConfig from "./config/middlewares";

const app = express();

const server = http.Server(app);
const io = new socketIO(server);


appConfig(app, io);


server.listen(
	3000,
	err => {
		if(err) throw err;
		console.log("[INFO] Listening on *: 3000");
	}
);
