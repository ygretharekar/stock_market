import React from "react";

import {scaleTime} from "d3-scale";

import {ChartCanvas, Chart} from "react-stockcharts";
import {AreaSeries, LineSeries} from "react-stockcharts/lib/series";
import {XAxis, YAxis} from "react-stockcharts/lib/axes";
import {fitWidth} from "react-stockcharts/lib/helper";

import {format} from "d3-format";
import {timeFormat} from "d3-time-format";

import {LabelAnnotation, Label, Annotate} from "react-stockcharts/lib/annotation";
import {discontinuousTimeScaleProvider} from "react-stockcharts/lib/scale";
import {HoverTooltip} from "react-stockcharts/lib/tooltip";
import {OHLCTooltip, MovingAverageTooltip} from "react-stockcharts/lib/tooltip";
import {ema} from "react-stockcharts/lib/indicator";
import {last} from "react-stockcharts/lib/utils";

import {CrossHairCursor, EdgeIndicator, CurrentCoordinate, MouseCoordinateX, MouseCoordinateY} from "react-stockcharts/lib/coordinates";


export default props => {

	let numberFormat = format(".2f");
	let dateFormat = timeFormat("%Y-%m-%d");

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

				if(array.length > 1500) array.splice(1500);

				console.log("more than 1");
				
				if(array.length >= dataset.data.dataset_data.data.length){
					dataset.data.dataset_data.data.forEach(
						(info, i) => {
							let dt = new Date(info[0]).getTime();
							console.log("array is bigger...");
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
									console.log("found 1....");
									
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
	
	let arr = array.reverse();
	
	console.log("====================================");
	console.log( "data is ", arr, "symbols ", symbols );
	console.log("====================================");

	let tooltipContent = 
	ys => 
		({ currentItem, xAccessor }) => (
			{
				x: dateFormat(xAccessor(currentItem)),
				y: [
					{
						label: "open",
						value: currentItem[3] && numberFormat( currentItem[3] )
					}
				]
					.concat(
						ys.map(
							each => (
								{
									label: each.label,
									value: each.value(currentItem),
									stroke: each.stroke
								}
							)
						)
					)
					.filter(line => line.value)
			}
		);
	
	const ema20 = 
	ema()
		.id(0)
		.options({ windowSize: 20 })
		.merge((d, c) => {
			d.ema20 = c;
		})
		.accessor(d => d.ema20);

	const ema50 = ema()
		.id(0)
		.options({ windowSize: 50 })
		.merge((d, c) => {d.ema50 = c;})
		.accessor(d => d.ema50);
	

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
					fontSize= {30} text="Chart stock market" />

				{/* <Chart 
					id={0}
					yPan yExtents={[d => [d.high, d.low], ema20.accessor(), ema50.accessor()]}
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

					<Label x={(600) / 2} y={ 455}
						fontSize={12} text="Something" />

					<YAxis axisAt="left" orient="left" />


					{
						symbols.map(
							(sym, i) => {
								return(
									<div key={i}>
										<LineSeries 
											yAccessor={d => d[sym][4]} 
											stroke={"pink"} 
											highlightOnHover 
										/>
									</div>
								);
							}
						)
					}

					<HoverTooltip
						yAccessor={d => d.info[1]}
						tooltipContent={tooltipContent([
							{
								label: "FB",
								value: d => d.info[1],
								stroke: "red"
							}
						])}
						fontSize={15}
					/>
				</Chart> */}

				{/* {
					symbols.map(
						(s, i) => {
							return(
								<Chart
									key={i}
									id={i}
									yPan yExtents={d => d[s][4]}
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

									<Label x={(600) / 2} y={ 455}
										fontSize={12} text={ s } />

									<YAxis axisAt="left" orient="left" />

									<LineSeries 
										yAccessor={d => d[s][4]} 
										stroke={"#" + i*111 + 333} 
										highlightOnHover
									/>
								</Chart>
							);
						}
					)
				} */
				
				<Chart
					id={0}
					yPan yExtents={
						d => {
							return( d[symbols[0]][4] );

						}
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

					<Label x={(600) / 2} y={ 455}
						fontSize={12} text={ s } />

					<YAxis axisAt="left" orient="left" />

					<LineSeries 
						yAccessor={d => d[s][4]} 
						stroke={"#" + i*111 + 333} 
						highlightOnHover
					/>
				</Chart>

				
			</ChartCanvas>
		</div>
	);
};

/* let array = data[0] ? data[0]: [];

	console.log("====================================");
	console.log( array );
	console.log("====================================");
	*/


/* let stockData = props.stocks.stocks.map(
		s => {
			console.log("====================================");
			console.log(s);
			console.log("====================================");
		}
	); */



/* let data = props.stocks.stocks[0].dataset_data.data.map(element => {
	console.log("====================================");
	console.log((new Date(element[0])).toDateString());
	console.log("===================================="); 

	return { date: new Date(element[0]).getTime(), info: element };
}); */


{/* <Chart id={0} yExtents={d => d.info[1]}>
	<XAxis axisAt="bottom" orient="bottom" ticks={10}/>
	<MouseCoordinateX
		at="bottom"
		orient="bottom"
		displayFormat={timeFormat("%Y-%m-%d")} />
	<MouseCoordinateY
		at="right"
		orient="right"
		displayFormat={format(".2f")} />

	<Label x={(600) / 2} y={ 455}
		fontSize={12} text="XAxis Label here" />

	<YAxis axisAt="left" orient="left" />
	<AreaSeries yAccessor={ d => d.info[1]}/>

	<HoverTooltip
		yAccessor={ema50.accessor()}
		tooltipContent={tooltipContent([
			{
				label: "MSFT",
				value: d => d.info[1],
				stroke: ema20.stroke()
			}
		])}
		fontSize={15}
</Chart> */}

{/* <Chart id={1} yExtents={d => d.info[4]}>
	<XAxis axisAt="bottom" orient="bottom" ticks={10}/>
	<MouseCoordinateX
		at="bottom"
		orient="bottom"
		displayFormat={timeFormat("%Y-%m-%d")} />
	<MouseCoordinateY
		at="right"
		orient="right"
		displayFormat={format(".2f")} />

	<Label x={(600) / 2} y={ 455}
		fontSize={12} text="XAxis Label here" />

	<YAxis axisAt="left" orient="left" />

	<LineSeries yAccessor={ d => d.info[4]} stroke={ema20.stroke()} highlightOnHover />
	

	<HoverTooltip
		yAccessor={ema50.accessor()}
		tooltipContent={tooltipContent([
			{
				label: "MSFT",
				value: d => d.info[1],
				stroke: ema20.stroke()
			}
		])}
		fontSize={15}
	/>


</Chart> */}

// s => {
// 				{/* console.log(JSON.stringify(s["Time Series (1min)"])); */
// 				}

// 				let arr = [];

// 				for (let obj in s["Time Series (1min)"]) {
// 								/* console.log( obj.slice(11), " : ", JSON.stringify(s["Time Series (1min)"][obj]) );

// 				console.log("====================================");
// 				console.log(
// 					(
// 						new
// 						Date(
// 							0,
// 							0,
// 							0,
// 							parseInt(obj.slice(11, 13)),
// 							parseInt(obj.slice(14, 16))
// 						)
// 					)
// 						.getTime()
// 						.toString()
// 				);
// 				console.log("===================================="); */

// 								let date = (new Date(0, 0, 0, parseInt(obj.slice(11, 13)), parseInt(obj.slice(14, 16)))).getTime();

// 								let close = s["Time Series (1min)"][obj]["4. close"];

// 								arr = [
// 												...arr, {
// 																date,
// 																close
// 												}
// 								];

// 				}

// 				arr.sort((a, b) => a > b
// 								? -1
// 								: a < b
// 												? 1
// 												: 0);

// 				return arr;
// }