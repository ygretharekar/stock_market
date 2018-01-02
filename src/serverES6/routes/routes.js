import express from "express";
import dotenv from "dotenv";
import axios from "axios";

import stockModel from "../Models/stocks";

dotenv.config({silent: true});

const app = express.Router();

app.post(
	"/api/fetchstock",
	(req, res) => {
		let { data } = req.body;

		axios
			.get(
				"https://www.alphavantage.co/query", 
				{
					params: {
						function: "TIME_SERIES_INTRADAY",
						symbol: data,
						interval: "1min",
						apikey: process.env.ALPHA_VANTAGE_API
					}
				}
			)
			.then(
				resp => {
					//console.log(resp);
					res.status(200).json(resp.data);
				}
			)
			.catch(err => {
				console.error(err);
				res.status(404).send("stocks not found");
			});
	}
);

app.post(
	"/api/stock",
	(req, res) => {
		stockModel.find(
			{},
			(err, stocks, next) => {
				if(err) next(err);
				// console.log(stocks);
				return res.status(200).json(stocks);
			}
		);
	}
);

export default app;

