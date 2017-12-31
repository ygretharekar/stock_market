const NODE_ENV = "dev";
if(NODE_ENV === "prod") module.exports = require("./store.prod");
else module.exports = require("./store.dev");