const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const registerRouter = require('./routes/register');
const mainRouter = require('./routes/main');
const userConfigRouter = require('./routes/userConfig')
const chatRouter = require('./routes/chat');
const userFriends = require('./routes/userFriends');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'dovakin', resave: false, saveUninitialized: true}));

app.use('/', mainRouter);
app.use('/main', mainRouter);
app.use('/index', indexRouter);
app.use('/user/:id', userRouter);
app.use('/user/:id/config', userConfigRouter);
app.use('/user/:id/chat', chatRouter);
app.use('/user/:id/friends', userFriends);
app.use('/register', registerRouter);



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

// app.listen(3000);

module.exports = app;
