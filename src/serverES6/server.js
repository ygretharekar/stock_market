import express from "express";

import appConfig from "./config/middlewares";

const app = express();

appConfig(app);

app.listen(
	3000,
	err => {
		if(err) throw err;
		else{
			console.log("Server is listening on port 3000");
		}
	}
);