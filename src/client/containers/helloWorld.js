import React from "react";
import {connect} from "react-redux";
import socketIOClient from "socket.io-client";
import { fetchStock, updateDB, deleteStock } from "../reducers/actions/stock_actions";

import Buttons from "../components/button";
import D3 from "../components/d3Comp";
import HelloWorld from "../components/helloWorld";
import Sidebar from "../components/row";

class Hello extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			width: 0, 
			height: 0,
			search: "",
			submit: false,
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleDB = this.handleDB.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.printStocks = this.printStocks.bind(this);
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	handleClick(){
		console.log("handleclick clicked");

		this.setState(
			{
				submit: true
			}
		);

		this.props.fetchStock(this.state.search);
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


	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener("resize", this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateWindowDimensions);
	}



	updateWindowDimensions() {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}


	handleChange(e){
		
		this.setState(
			{
				search: e.target.value,
				submit: false
			}
		);
	}

	render(){
		return( 
			<div className="container">
				<div className="row">
					<Sidebar 
						change = {this.handleChange}
						value = {this.state.search}
						handleClick={this.handleClick.bind(this) }
					/>
					<div className="col-9" style={{background: "rgb(215, 242, 243)"}}>
						<div className="container">
							<HelloWorld />
							{/* <Buttons handleClick={this.handleClick} /> */}
							<Buttons handleClick={this.handleDB} />
							<Buttons handleClick={this.handleDelete} />
							<Buttons handleClick={this.printStocks} />
							{
								this.props.stocks.stocks.length > 0 &&
								this.state.submit &&
								<D3 
									stocks = {this.props.stocks}
									width = {this.state.width}
									height = {this.state.width}
								/>
							}
						</div>
					</div>
				</div>
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