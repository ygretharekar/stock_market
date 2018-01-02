import React from "react";
import {connect} from "react-redux";
import socketIOClient from "socket.io-client";

import HelloWorld from "../components/helloWorld";
import Buttons from "../components/button";
import { fetchStock, updateDB } from "../reducers/actions/stock_actions";

class Hello extends React.Component {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleDB = this.handleDB.bind(this);
	}


	handleClick(){
		console.log("handleclick clicked");

		this.props.fetchStock("MSFT");
	}
	handleDB(){
		console.log("handleDB clicked");
		this.props.updateDB(this.props.stocks);
	}

	render(){
		return(
			<div>
				<HelloWorld />
				<Buttons handleClick={this.handleClick} />
				<Buttons handleClick={this.handleDB} />
			</div>
		);
	}
}

const mapStateToProps = state => (
	{
		stocks: state
	}
);

export default connect(mapStateToProps, { fetchStock, updateDB })(Hello);