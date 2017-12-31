import path from "path";
import fallback from "express-history-api-fallback";
import express from "express";


export default app => {
	app.use(express.static("dist"));
	app.use(fallback(path.join(__dirname, "../../../dist/index.html")));
};
