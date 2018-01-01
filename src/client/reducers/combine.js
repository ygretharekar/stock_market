import { combineReducers  } from "redux";

import stocks from "./reducers/stocks";

export default combineReducers(
	{
		stocks
	}
);