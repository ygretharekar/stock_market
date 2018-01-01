import path from "path";
import fallback from "express-history-api-fallback";
import express from "express";
import bodyParser from "body-parser";

export default (app, io) => {
	app.use(express.static("dist"));
	app.use(fallback(path.join(__dirname, "../../../dist/index.html")));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());

	io.on(
		"connection",
		socket => {
			console.log("new client connected with id: ", socket.id);

			socket.on(
				"disconnect",
				() => console.log("Client disconnected..")
			);
		}
	);

};
