import React from "react";

export default props => {

	return(
		<div className="col-3 sidebar">
			<div className="container d-flex flex-column justify-content-between">
				<ul className="nav nav-pills flex-column text-center"  style={{marginTop: "20px"}}  >	
					{
						props.stocks.length > 0 &&
						props.stocks.map(
							(s, i) => (
								<li key={i}>
									<button 
										className={ "btn btn-block btn-secondary" }
										style={{marginTop: "5px"}}
										onClick={() => props.delete(s)}
									>
										{s}
									</button>
								</li>
							)
						)
					}
				</ul>
				<div className="flex-column text-center">
					<input 
						type = "text"
						className="form-control" 
						name="search"
						onChange={ props.change }
						value = { props.value }
						placeholder="stock symbol...."
					/>
					<button 
						className="btn btn-block btn-primary"
						onClick = {props.handleClick}
						style = {{margin: "5px 0"}}
					>
						Add Stocks
					</button>
				</div>
			</div>
		</div>
	);
};
