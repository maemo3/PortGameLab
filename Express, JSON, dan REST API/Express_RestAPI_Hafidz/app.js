var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var bodyParser = require("body-parser");
var flash = require("req-flash");

//Router
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var productsRouter = require('./routes/product');
var JWTRouter = require('./routes/jwt');
var kelasRouter = require('./routes/kelas');

//Auth
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");

var app = express();

//Session
app.use(
  session({
    secret: "iniadalahkeyrahasiamu",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
  })
);

//Middleware Jam
app.use((req, res, next) => {
  const date = new Date();

  const formatData = (input) => {
    if (input > 9) {
      return input;
    } else return `0${input}`;
  };

  console.log(
    "Waktu Akses: ", formatData(date.getHours()) +":"+
    formatData(date.getMinutes())+":"+
    formatData(date.getSeconds())
  );
  next();
});

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));

//folder views
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

//Set Router
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use('/', indexRouter);
app.use('/check', userRouter);
app.use('/produk', productsRouter);
app.use('/api', JWTRouter);
app.use('/data', kelasRouter);

module.exports = app;