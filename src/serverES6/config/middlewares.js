import path from "path";
import fallback from "express-history-api-fallback";
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import MongoStore from "connect-mongo";

import db from "./database";
import stockModel from "../Models/stocks";
import routes from "../routes/routes";

const mongoConnect = MongoStore(session);

export default (app, io) => {
	app.use(express.static("dist"));
	app.use(fallback(path.join(__dirname, "../../../dist/index.html")));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(routes);
	app.use(
		session(
			{
				secret: "secret",
				resave: true,
				secure: false,
				saveUninitialized: true,
				store: new mongoConnect(
					{
						mongooseConnection: db
					}
				)
			}
		)
	);


	io.on(
		"connection",
		socket => {
			console.log("new client connected with id: ", socket.id);
			
			socket.on(
				"disconnect",
				() => console.log("Client disconnected..")
			);

			socket.on(
				"addStock",
				data => {
					const stock = new stockModel({
						stockName: data.toUpperCase()
					});

					stock.save(
						(err, res) => {
							if(err) console.error(err);
							console.log(`Added new stock ${data.toUpperCase()}`);
							
						}
					);
				}
			);

			socket.on(
				"deleteStock",
				data => {
					stockModel.remove(
						{
							stockName: data
						},
						(err, res) => {
							if(err) console.error(err);

							else {
								console.log("====================================");
								console.log(`Removed stock ${data}`);
								console.log("====================================");
								console.log(res);
							}
						}
					);
				}
			);		
		}
	);
};
