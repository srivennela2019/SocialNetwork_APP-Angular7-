var express = require("express"),
  app = express(),
  bodyParser = require("body-parser");
var cors = require("cors");
var appRoutes = require("./routes/apps");
app.use(cors());
var winston = require("winston");
winston.add(winston.transports.File, { filename: "./log/logfile.log" });
app.use(bodyParser.json());
winston.log("error","winston test");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/social", appRoutes);
app.listen(3000, function() {
  console.log("port running");
});
