import mongoose from "mongoose";

const Schema = mongoose.Schema;

var stockSchema = new Schema(
	{
		stockName: String
	}
);


const stockModel = mongoose.model("stockModel", stockSchema);

export default stockModel;