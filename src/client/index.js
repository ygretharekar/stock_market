import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./Routes/routes";

import configureStore from "./store/store";


const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);