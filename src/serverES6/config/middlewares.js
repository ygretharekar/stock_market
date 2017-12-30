import path from "path";
import fallback from "express-history-api-fallback";


export default app => {
	app.use(fallback(path.join(__dirname, "../../../dist/index.html")));
};