import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Hello from "../containers/helloWorld";

class App extends React.Component {
	render(){
		return(
			<Router>
				<div>
					<Switch>
						<Route exact path="/" component= {Hello} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;