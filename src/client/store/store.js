const NODE_ENV = "prod";
if(NODE_ENV === "prod") module.exports = require("./store.prod");
else module.exports = require("./store.dev");