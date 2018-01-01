import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config({silence: true});

const db = mongoose.connection.openUri(process.env.MLAB_URI);

db.on(
	"error",
	err => {
		console.log("Connection failed!");
		console.error(err);
	}
);

db.once(
	"open",
	() => console.log("Connected to mongodb")
);

export default db;