var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");

const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
//module jsonwebtoken
const jwt = require('jsonwebtoken');

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const { verify } = require("crypto");

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(connectLivereload());

//bodyparser middleware
app.use(bodyParser.json());

//data yang akan digunakan
var kelas = [
  { id: 1, nama_kelas: "Backend" },
  { id: 2, nama_kelas: "Frontend" },
  { id: 3, nama_kelas: "Fullstack" },
];
//get app
app.get("/api/kelas", function (req, res) {
  res.json({ data: kelas });
  res.send({ data: kelas });
});
//get app with id
app.get("/api/kelas/:id", function (req, res) {
  const kls = kelas.find((k) => k.id === parseInt(req.params.id));
  if (!kls) res.status(404).send("Kelas tidak ditemukan");
  res.json({ data: kls });
  res.send({ data: kls });
});
//post kelas
app.post("/api/kelas", function (req, res) {
  //kondisi apabila nama kelas kosong
  if (!req.body.nama_kelas) {
    //display pesan
    res.status(400).send("Nama kelas harus diisi");
    return;
  }

  const kls = {
    id: kelas.length + 1,
    nama_kelas: req.body.nama_kelas,
  };
  kelas.push(kls);
  res.send(kls);
});
//put kelas
app.put("/api/kelas/:id", function (req, res) {
  //cek kelas id
  const klas = kelas.find((k) => k.id === parseInt(req.params.id));
  if (!klas) res.status(404).send("Kelas tidak ditemukan");

  if (!req.body.nama_kelas) {
    //display pesan error
    res.status(400).send("Nama kelas harus diisi");
    return;
  }

  klas.nama_kelas = req.body.nama_kelas;
  res.send({
    pesan: "Data berhasil diupdate.",
    data: klas,
  });
});
//delete kelas
app.delete("/api/kelas/:id", function (req, res) {
  //cek kelas id
  const klas = kelas.find((k) => k.id === parseInt(req.params.id));
  if (!klas) res.status(404).send("Kelas tidak ditemukan");

  const index = kelas.indexOf(klas);
  kelas.splice(index, 1);
  res.send({
    pesan: "Data berhasil dihapus.",
    data: klas,
  });
});

//auth JWT
app.post('/api/login', (req, res) => {
  const user = {
    id: Date.now(),
    userEmail: 'admin@gamelab.id',
    password: 'gamelab'
  }

  jwt.sign({user}, 'secretkey', (err, token) => {
    res.json({
      token
    })
  })
})

app.get('/api/profile', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Selamat datang di Gamelab Indonesia",
        userData: authData
      })
    }
  })
});

//verifikasi token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  //jika bearer kosong
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    //get token
    const bearerToken = bearer[1];
    //set token
    req.token = bearerToken;
    //next middleware
    next();
  } else {
    //mengarah ke halaman forbidden
    res.sendStatus(403);
  }
}

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
