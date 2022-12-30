var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

//router
var searchRouter = require("./routes/search");
var feedRouter = require("./routes/feed");
var priceRouter = require("./routes/price");
/*
var searchJoongonaraRouter = require("./routes/searchJoonggonara");
var searchBunjangRouter = require("./routes/searchbunjang");
var searchHelloMarketRouter = require("./routes/searchhello");
var searchNaverRouter = require("./routes/searchNaver");
*/

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/search", searchRouter);
app.use("/api/feed", feedRouter);
app.use("/api/price", priceRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
