const stocksReducer = (state = [], action) => {
	switch (action.type) {
	case "UPDATE_DB":
		return action.data; 

	case "ADD_STOCK":
		return [...state, action.stockData];

	case "REMOVE_STOCK":
		return state.filter(
			stock => stock["Meta Data"]["2. Symbol"] !== action.name
		);
	
	default:
		return state;
	}
};

export default stocksReducer;