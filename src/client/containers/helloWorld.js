import React from "react";
import {connect} from "react-redux";
import socketIOClient from "socket.io-client";

import HelloWorld from "../components/helloWorld";
import Buttons from "../components/button";
import checkSocket from "../reducers/actions/stock_actions";

class Hello extends React.Component {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		console.log("handleclick clicked");
		const socket = socketIOClient("http://127.0.0.1:3000");
		socket.emit("disconnect");
		this.props.checkSocket();
	}


	render(){
		return(
			<div>
				<HelloWorld />
				<Buttons handleClick={this.handleClick} />
			</div>
		);
	}
}

export default connect(null, { checkSocket })(Hello);