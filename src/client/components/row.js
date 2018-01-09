import React from "react";

export default props => {
	return(
		<div className="col-3 sidebar">
			<div className="container d-flex flex-column justify-content-end">
				<ul className="nav nav-pills flex-column text-center">
					<li className="nav-item">
						<a className="nav-link active" href="#">Active</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#">Link</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#">Link</a>
					</li>
					<li className="nav-item">
						<a className="nav-link disabled" href="#">Disabled</a>
					</li>
				</ul>
				<div className="flex-column text-center">
					<input 
						type = "text"
						className="form-control" 
						name="search"
						onChange={ props.change }
						value = { props.value }

					/>
					<button 
						className="btn btn-block btn-primary"
						onClick = {props.handleClick}
					>
						Add Stock
					</button>
				</div>
			</div>
		</div>
	);
};
