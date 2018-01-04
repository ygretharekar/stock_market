import axios from "axios";
import socketIOClient from "socket.io-client";

//actions

const UPDATE_DB = "UPDATE_DB";
const ADD_STOCK = "ADD_STOCK";
const REMOVE_STOCK = "REMOVE_STOCK";

//action creators

export const getDB = data => (
	{
		type: UPDATE_DB,
		data
	}
);

export const addStock = stockData => (
	{
		type: ADD_STOCK,
		stockData
	}
);

export const removeStock = name => (
	{
		type: REMOVE_STOCK,
		name
	}
);

//async actions

export const updateDB = 
	stock =>
		dispatch => 
			axios
				.post("/api/stock")
				.then(
					res => {
						// console.log(res);
						// console.log("stocks ", stock.stocks[0]["Meta Data"]["2. Symbol"]);
						if(res.data.length > stock.stocks.length){
							res.data.forEach(
								item => {
									let flag = true;
									stock.stocks.forEach(element => {
										if(element["Meta Data"]["2. Symbol"] == item.stockName)
											flag = false;
									});
									if(flag) {
										console.log("====================================");
										console.log("more stocks in database");
										console.log("====================================");
										dispatch(fetchStock(item.stockName));
									}
								}
							);
						}
						else if(res.data.length < stock.stocks.length){

							let newStocks = [];

							console.log("====================================");
							console.log(res.data);
							console.log("====================================");

							stock.stocks.forEach(el => {
								res.data.forEach(e => {
									if(el["Meta Data"]["2. Symbol"] == e.stockName)
										newStocks = [ ...newStocks, el];
									else {
										console.log("====================================");
										console.log("Less stocks in state");
										console.log("====================================");
									}
								});
							});

							dispatch(getDB(newStocks));
						}
						else {
							console.log("====================================");
							console.log( "stocks are equal" );
							console.log("====================================");
						}
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

export const fetchStock = 
	stockName =>
		dispatch =>
			axios
				.post(
					"/api/fetchstocks", 
					{
						data: stockName
					}
				)
				.then(
					res => {
						console.log(res.data);
						dispatch(addStock(res.data));
						//console.log(JSON.stringify(res.data));
						/* const socket  = new socketIOClient("http://127.0.0.1:3000");
						socket.emit("addStock", stockName); */ 
					}
				)
				.catch(err => console.error(err));	
				
//

export const newStock = 
	(stockName, socket) =>
		dispatch => {
			socket.emit("addStock", stockName);
			dispatch(fetchStock(stockName));
		};

//

export const deleteStock = 
	(stockName, socket) => 
		dispatch => {
			socket.emit("deleteStock", stockName);
			dispatch(removeStock(stockName));
		};

//