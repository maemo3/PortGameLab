var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var bodyParser = require("body-parser");
var flash = require("req-flash");
// const jwt = require('jsonwebtoken');

//Router
var sessionRouter = require("./routes/session");
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var productsRouter = require('./routes/product');
var JWTRouter = require('./routes/jwt');

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

//Set Router
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use('/', indexRouter);
app.use('/check', userRouter);
app.use('/produk', productsRouter);
app.use ('/api', JWTRouter);

// //auth JWT
// app.post("api/token", (req, res) => {
//   const user = {
//     id: Date.now(),
//     userEmail: "user@localhost.com",
//     password: "localhost",
//   };

//   jwt.sign({ user }, "secretkey", (err, token) => {
//     res.json({
//       token,
//     });
//   });
// });

// app.get("api/auth", verifyToken, (req, res) => {
//   jwt.verify(req.token, "secretkey", (err, authData) => {
//     if (err) {
//       res.sendStatus(403).json ({
//         error: "Data anda tidak terdaftar"
//       });
//     } else {
//       res.json({
//         message: "Data anda Terdaftar",
//         userData: authData,
//       });
//     }
//   });
// });

// //verifikasi token
// function verifyToken(req, res, next) {
//   const bearerHeader = req.headers["authorization"];
//   //jika bearer kosong
//   if (typeof bearerHeader !== "undefined") {
//     const bearer = bearerHeader.split(" ");
//     //get token
//     const bearerToken = bearer[1];
//     //set token
//     req.token = bearerToken;
//     //next middleware
//     next();
//   } else {
//     //mengarah ke halaman forbidden
//     res.sendStatus(403).json ({
//       error: "Token yang anda masukan belum benar"
//     });
//   }
// }



module.exports = app;
