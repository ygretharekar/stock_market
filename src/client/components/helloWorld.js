import React from "react";

class Header extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			clock: 0
		};
	}

	
	componentWillMount() {
		const dots = setInterval(
			() => {
				let str = "";
				switch (this.state.clock % 5) {
				case 0:
					str = ""; 
					break;
				case 1:
					str = "."; 
					break;
				case 2:
					str = ".."; 
					break;
				case 3:
					str = "..."; 
					break;
				case 4:
					str = "...."; 
					break;
				
				default:
					str=".....";
					break;
				}
				this.setState(
					{
						clock: this.state.clock + 1,
						string: str 
					}
				);
			},
			500
		);
		this.setState( {dots: dots} );
	}
	
	componentWillUnmount(){
		clearInterval(this.state.dots);
	}
	
	render(){
		return(
			<h1>
				searching
				{this.state.string}
			</h1>
		);
	}	
}

export default Header;

