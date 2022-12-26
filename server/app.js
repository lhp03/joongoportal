var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

//router
var searchRouter = require("./routes/search");
var searchJoongonaraRouter = require("./routes/searchJoonggonara");
var searchBunjangRouter = require("./routes/searchbunjang");
var searchHelloMarketRouter = require("./routes/searchhello");
var searchNaverRouter = require("./routes/searchNaver");
var feedRouter = require("./routes/feed");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/search", searchRouter);
app.use("/api/searchjoonggonara", searchJoongonaraRouter);
app.use("/api/searchbunjang", searchBunjangRouter);
app.use("/api/searchhellomarket", searchHelloMarketRouter);
app.use("/api/searchnaver", searchNaverRouter);
app.use("/api/feed", feedRouter);

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
