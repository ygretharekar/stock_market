import express from "express";
import dotenv from "dotenv";

import appConfig from "./config/middlewares";


const app = express();

dotenv.config();

appConfig(app);

app.listen(
	3000,
	err => {
		if(err) throw err;
		else{
			console.log("Server is listening port 3000");
		}
	}
);