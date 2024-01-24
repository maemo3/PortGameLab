var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser')
var flash = require('req-flash')

var sessionRouter = require('./routes/session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var kelasRouter = require('./routes/kelas');
var productRouter = require('./routes/product');

//Auth
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');

var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(session({
  secret: "iniadalahkeyrahasiamu",
  saveUninitialized: true,
  resave:false,
  cookie: {
    maxAge: 60 * 60 * 1000
  }
}));

app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());

// tambahkan ini
app.use(function(req, res, next) {
  res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.setHeader('Pragma', 'no-cache');
  next();
});
// end

app.use(express.static(path.join(__dirname, 'public')));
//folder views
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/kelas', kelasRouter);
app.use('/session', sessionRouter);
//routes auth
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/product', productRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
