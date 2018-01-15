import axios from "axios";

//actions

const UPDATE_DB = "UPDATE_DB";
const ADD_STOCK = "ADD_STOCK";
const REMOVE_STOCK = "REMOVE_STOCK";
const GET_STOCK = "GET_STOCK";
const DONE = "DONE";

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

export const getStock = () => (
	{
		type: GET_STOCK
	}
);

export const done = payload => (
	{
		type: DONE,
		payload
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
						dispatch(done(false));
						if(res.data.length > stock.stocks.length){
							res.data.forEach(
								item => {
									let flag = true;
									stock.stocks.forEach(element => {
										if(element.stockName == item.stockName)
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
									if(el.stockName == e.stockName)
										newStocks = [ ...newStocks, el];
									else {
										console.log("====================================");
										console.log("Less stocks in database");
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
							dispatch(done(true));
						}
					}
				)
				.catch(
					err => console.error(err)
				);

		
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
						dispatch(done(false));
						let data = { stockName, data: res.data };
						console.log(data);
						dispatch(addStock(data));
						return true;	
					}
				)
				.then(data => dispatch(done(data)))
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