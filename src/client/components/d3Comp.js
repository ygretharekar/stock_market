import React from "react";

import {scaleTime} from "d3-scale";

import {ChartCanvas, Chart} from "react-stockcharts";
import {AreaSeries} from "react-stockcharts/lib/series";
import {XAxis, YAxis} from "react-stockcharts/lib/axes";
import {fitWidth} from "react-stockcharts/lib/helper";

import {format} from "d3-format";
import {timeFormat} from "d3-time-format";

import {LabelAnnotation, Label, Annotate} from "react-stockcharts/lib/annotation";
import {discontinuousTimeScaleProvider} from "react-stockcharts/lib/scale";
import {OHLCTooltip, MovingAverageTooltip} from "react-stockcharts/lib/tooltip";
import {ema} from "react-stockcharts/lib/indicator";
import {last} from "react-stockcharts/lib/utils";

import {CrossHairCursor, EdgeIndicator, CurrentCoordinate, MouseCoordinateX, MouseCoordinateY} from "react-stockcharts/lib/coordinates";


export default props => {
	/* let stockData = props.stocks.stocks.map(
		s => {
			console.log("====================================");
			console.log(s);
			console.log("====================================");
		}
	); */



	let data = props.stocks.stocks[0].dataset_data.data.map(element => {
		/* console.log("====================================");
		console.log((new Date(element[0])).toDateString());
		console.log("===================================="); */

		return { date: new Date(element[0]).getTime(), info: element[1] };
	});


	data = data.reverse();

	console.log("====================================");
	console.log( data );
	console.log("====================================");

	/* let array = data[0] ? data[0]: [];

	console.log("====================================");
	console.log( array );
	console.log("====================================");
 */
	return(
		<div>
			<ChartCanvas ratio={0.5} width={700} height={400}
				margin={{ left: 50, right: 50, top:10, bottom: 30 }}
				seriesName="MSFT"
				data={data} type="svg"
				displayXAccessor={ d => d.date }
				xAccessor={d => d.date} xScale={scaleTime()}
				xExtents={[new Date(1986, 3, 13), new Date(2018, 1, 3)]}
			>
				<Label x={(700 - 50 - 50) / 2} y={30}
					fontSize= {30} text="MSFT" />
				<Chart id={0} yExtents={d => d.info}>
					<XAxis axisAt="bottom" orient="bottom" ticks={10}/>
					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")} />
					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")} />

					<YAxis axisAt="left" orient="left" />
					<AreaSeries yAccessor={ d => d.info}/>
				</Chart>
			</ChartCanvas> 
		</div>
	);


};

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