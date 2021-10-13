require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

var userRouter = require('./routes/user/userRouter');
var todoRouter = require('./routes/todo/todoRouter');

mongoose.connect(process.env.MONGO_DB)
  .then(() => {
    console.log("MONGODB CONNECTED")
  })
  .catch((error) => {
    console.log(error)
  })

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/todo', todoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: "ERROR", err })
});

module.exports = app;
