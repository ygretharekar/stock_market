import React from "react";

import {scaleTime} from "d3-scale";

import {ChartCanvas, Chart} from "react-stockcharts";
import { LineSeries} from "react-stockcharts/lib/series";
import {XAxis, YAxis} from "react-stockcharts/lib/axes";

import {format} from "d3-format";
import {timeFormat} from "d3-time-format";

import {Label} from "react-stockcharts/lib/annotation";
import {HoverTooltip} from "react-stockcharts/lib/tooltip";

import {MouseCoordinateX, MouseCoordinateY} from "react-stockcharts/lib/coordinates";

export default props => {

	let dateFormat = timeFormat("%Y-%m-%d");

	let colors = ["red", "orange", "yellow", "green", "blue", "violet", "purple"];
	let symbols = [];
	let array = [];
	props.stocks.stocks.forEach( 
		dataset => {

			symbols.push(dataset.stockName);

			if( array.length === 0 ){
				array = dataset.data.dataset_data.data.map(
					element => (
						{ 
							date: new Date(element[0]).getTime(),
							[dataset.stockName]: element
						}
					)		
				);
			}

			else {

				if(array.length > 1000) array.splice(1000);
				
				if(array.length >= dataset.data.dataset_data.data.length){
					dataset.data.dataset_data.data.forEach(
						(info, i) => {
							let dt = new Date(info[0]).getTime();
							array.forEach(element => {
								if(element.date === dt){
									array[i] = {
										...array[i],
										[dataset.stockName]: info
									};
								}
							});
						}
					);
					array.splice(dataset.data.dataset_data.data.length - 1);
				}

				else if(array.length < dataset.data.dataset_data.data.length){
					console.log("array is smaller...");

					array.forEach(
						(info, i) => {
							let dt = info.date;

							dataset.data.dataset_data.data.forEach(element => {
								if(new Date(element[0]).getTime() === dt){
									array[i] = {
										...array[i],
										[dataset.stockName]: element
									};
								}
							});
						}
					);
				}
			}
		}
	);	

	let arr = array.filter(
		stock => Object.keys(stock).length === symbols.length + 1
	).reverse();
	
	console.log("====================================");
	console.log( "data is ", arr, "symbols ", symbols );
	console.log("====================================");

	let tooltipContent = 
		() => 
			({ currentItem, xAccessor }) => (
				{
					x: dateFormat(xAccessor(currentItem)),
					y: symbols.map(
						sym => (
							{
								label: sym,
								value: currentItem[sym][4],
								stroke: "black"
							}
						)
					)
				}
			);

	return(
		<div className="container">
			<ChartCanvas 
				ratio={props.width/props.height} 
				width={props.width * 0.7} 
				height={props.height * 0.4}
				margin={{ left: 50, right: 50, top:10, bottom: 30 }}
				seriesName="Chart stock market"
				data={arr} type="svg"
				displayXAccessor={ d => d.date }
				xAccessor={d => d.date} xScale={scaleTime()}
				xExtents={[new Date(1986, 3, 13), new Date(2018, 1, 3)]}
			>
				<Label x={300} y={30}
					fontSize= {30} text="Stock close value" />

				<Chart
					id={0}
					yPan yExtents={
						d => symbols.map(
							s => d[s][4]
						)
					}
				>
					<XAxis axisAt="bottom" orient="bottom" ticks={6}/>
					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")} />
					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")} />

					<YAxis axisAt="left" orient="left" />
				
					{
						symbols.map(
							(sym, i) => {
								return (
									<LineSeries
										key={i}
										yAccessor={ d => d[sym][4] }
										stroke={ colors[Math.floor(Math.random()*7)]}
										highlightOnHover
									/>
								);
							}
						)
					}

					<HoverTooltip
						tooltipContent={tooltipContent()}
						fontSize={15}
					/>
				</Chart>
			</ChartCanvas>
		</div>
	);
};