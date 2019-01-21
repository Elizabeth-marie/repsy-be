var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var doctorsRouter = require(`./routes/doctors`)
var conditionsRouter = require('./routes/conditions')
var indexRouter = require('./routes/index');
var medsRouter = require(`./routes/meds`)
var specialtiesRouter = require(`./routes/specialties`)
var repsRouter = require('./routes/reps')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(`/`, tablenameRouter)

app.use('/', indexRouter);
app.use('/doctors', doctorsRouter);
app.use('/conditions', conditionsRouter);
app.use('/meds', medsRouter)
app.use('/specialties', specialtiesRouter)
app.use('/reps', repsRouter)

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
  res.render('error');
});

module.exports = app;
