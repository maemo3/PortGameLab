var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var bodyParser = require("body-parser");
var flash = require("req-flash");

var sessionRouter = require("./routes/session");
var indexRouter = require('./routes/index');
//Auth
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");

var app = express();

//Pasang paling atas
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

// tambahkan ini
app.use(function (req, res, next) {
  res.setHeader(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  res.setHeader("Pragma", "no-cache");
  next();
});
// end

app.use(express.static(path.join(__dirname, "public")));

//folder views
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

//routes auth
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use('/', indexRouter);

module.exports = app;
