import React from "react";
import {connect} from "react-redux";
import socketIOClient from "socket.io-client";
import { fetchStock, updateDB, deleteStock, newStock } from "../reducers/actions/stock_actions";

import Buttons from "../components/button";
import D3 from "../components/d3Comp";
import HelloWorld from "../components/helloWorld";
import Sidebar from "../components/row";
import ChartName from "../components/chartName";

class Hello extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			width: 0, 
			height: 0,
			search: "",
			submit: true,
			stocks: [],
			searching: false,
			socket: null,
			done: false
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleDB = this.handleDB.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	handleClick(){
		
		console.log("handleclick clicked...");

		this.setState(
			{
				submit: true,
				searching: true
			}
		);

		this.props.newStock(this.state.search, this.state.socket);

	}

	handleDB(){
		console.log("handleDB clicked");
		this.props.updateDB(this.props.stocks);
	}

	handleDelete(stock){
		console.log("handleDelete clicked");
		this.props.deleteStock(stock, this.state.socket);
	}

	componentWillMount(){
		let socket = new socketIOClient("http://127.0.0.1:3000");
		this.setState(
			{
				socket
			}
		);
		this.props.updateDB(this.props.stocks);

	}

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener("resize", this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateWindowDimensions);
	}

	componentWillReceiveProps(nextProps){
		this.setState(
			{
				searching: false,
				stocks: nextProps.stocks.stocks.map(
					stock => stock.stockName
				),
				done: nextProps.done
			}
		);

		console.log("====================================");
		console.log("stocks are here ", this.state.stocks);
		console.log("====================================");
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
						delete = {this.handleDelete}
						handleClick={this.handleClick}
						stocks = {this.state.stocks}
					/>


					<div className="col-9" style={{background: "rgb(215, 242, 243)"}}>

						<div className="container">
							{
								this.props.done || this.state.searching ?
									<ChartName />:
									<HelloWorld />
							}
						
							<Buttons handleClick={this.handleDB} />
							<Buttons handleClick={this.handleDelete} />
							<Buttons handleClick={this.printStocks} />
							{
								this.props.stocks.stocks.length > 0 &&
								this.state.submit &&
								!this.state.searching &&
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
		stocks: state.stocks,
		done: state.done
	}
);

export default connect(mapStateToProps, { fetchStock, updateDB, deleteStock, newStock })(Hello);