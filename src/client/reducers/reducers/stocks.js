const stocksReducer = (state = {stocks: [], done: false}, action) => {
	switch (action.type) {
	
	case "UPDATE_DB":
		return { 
			stocks: [
				...state.stocks,
				action.data
			],
			done: state.done
		};

	case "ADD_STOCK":
		return { 
			stocks: [
				...state.stocks,
				action.stockData
			],
			done: state.done
		};

	case "REMOVE_STOCK":
		return { 
			stocks: state.stocks.filter(
				stock => stock.stockName !== action.name
			),
			done: state.done
		};
	
	case "GET_STOCK":
		return state;

	case "DONE":
		return {
			stocks: state.stocks,
			done: action.payload
		};

	default:
		return state;
	}
};



export default stocksReducer;