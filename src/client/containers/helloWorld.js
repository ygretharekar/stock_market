import React from "react";
import {connect} from "react-redux";
import socketIOClient from "socket.io-client";
import { fetchStock, updateDB, deleteStock } from "../reducers/actions/stock_actions";

import Buttons from "../components/button";
import D3 from "../components/d3Comp";
import HelloWorld from "../components/helloWorld";

class Hello extends React.Component {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleDB = this.handleDB.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.printStocks = this.printStocks.bind(this);
	}


	handleClick(){
		console.log("handleclick clicked");

		this.props.fetchStock("MSFT");
	}

	handleDB(){
		console.log("handleDB clicked");
		this.props.updateDB(this.props.stocks);
	}

	handleDelete(){
		console.log("handleDelete clicked");
		let socket = new socketIOClient("http://127.0.0.1:3000");
		this.props.deleteStock("MSFT", socket);
	}

	printStocks(){
		console.log("====================================");
		console.log( this.props.stocks );
		console.log("====================================");
	}

	render(){
		return(
			<div>
				<HelloWorld />
				<Buttons handleClick={this.handleClick} />
				<Buttons handleClick={this.handleDB} />
				<Buttons handleClick={this.handleDelete} />
				<Buttons handleClick={this.printStocks} />
				{
					this.props.stocks.stocks.length > 0 &&
					<D3 stocks = { this.props.stocks} />  
				}
			</div>
		);
	}
}

const mapStateToProps = state => (
	{
		stocks: state
	}
);


export default connect(mapStateToProps, { fetchStock, updateDB, deleteStock })(Hello);