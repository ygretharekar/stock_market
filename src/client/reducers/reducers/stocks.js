const stocksReducer = (state = [], action) => {
	switch (action.type) {
	case "CHECK_DB":
		return action.data; 

	case "ADD_STOCK":
		return [...state, action.stockData];
	
	case "REMOVE_STOCK":
		return action.list;
	default:
		return state;
	}
};

export default stocksReducer;