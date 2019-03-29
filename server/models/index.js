var mongoose = require("mongoose");
mongoose.set("debug", true);
const config = require("config");
const winston = require('winston');
mongoose.connect(config.get('db.conn_str'), { useNewUrlParser: true });
mongoose.Promise = Promise;
module.exports = require("./app");
