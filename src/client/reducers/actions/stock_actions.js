import axios from "axios";
import socketIOClient from "socket.io-client";

//actions

const CHECK_DB = "CHECK_DB";
const ADD_STOCK = "ADD_STOCK";
const REMOVE_STOCK = "REMOVE_STOCK";

//action creators

export const getDB = data => (
	{
		type: CHECK_DB,
		data
	}
);

export const addStock = stockData => (
	{
		type: ADD_STOCK,
		stockData
	}
);

export const removeStock = list => (
	{
		type: REMOVE_STOCK,
		list
	}
);

//async actions

export const checkDB = 
	stock =>
		dispatch => 
			axios
				.get("/api/stock")
				.then(
					res => {
						console.log(res);
					}
				)
				.catch(
					err => console.error(err)
				);

//

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


export const checkSocket =
	() =>
		dispatch => {
			const socket = socketIOClient("http://127.0.0.1:3000");
			socket.emit("disconnect");
			return delay(2000).then(
				() => {
					dispatch(getDB([]));
				}
			);
		};
//
