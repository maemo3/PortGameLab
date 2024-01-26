var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");

const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
//module jsonwebtoken
const jwt = require("jsonwebtoken");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const { verify } = require("crypto");
const assert = require("assert");

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
  try {
    // res.json({ data: kelas });
    // res.send({ data: kelas });
    res.send(err);
  } catch (err) {
    // res.status(500).json({
    //   status: false,
    //   name: err.name,
    //   message: err.message,
    // });
    next(err);
  }
});
//get app with id
app.get("/api/kelas/:id", function (req, res) {
  try {
    // const kls = kelas.find((k) => k.id === parseInt(req.params.id));
    // assert(kls, `ID Kelas ${req.params.id} tidak ditemukan`);
    // if (!kls)
    //   res.status(404).json({
    //     error: "ID_NOT_FOUND",
    //     message: `ID Kelas ${req.params.id} tidak ditemukan`,
    //   });
    // res.status(200).json({
    //   data: kls,
    // });
    // res.json({ data: kls });
    // res.send({ data: kls });
    res.send(err);
  } catch (err) {
    // res.status(500).json({
    //   status: false,
    //   name: err.name,
    //   message: err.message,
    // });
    // next(err);
    // res.status(500).json({
    //   error: "INTERNAL_SERVER_ERROR",
    //   message: err.message,
    // });
    if (err.name === "AssertionError") {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});
//post kelas
app.post("/api/kelas", function (req, res) {
  //kondisi apabila nama kelas kosong
  try {
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
    res.send(err);
  } catch (err) {
    // res.status(500).json({
    //   status: false,
    //   name: err.name,
    //   message: err.message,
    // });
    next(err);
  }
});

//put kelas
app.put("/api/kelas/:id", function (req, res) {
  //cek kelas id
  try {
    const klas = kelas.find((k) => k.id === parseInt(req.params.id));
    if (!klas)
      res.status(404).json({
        error: "ID_NOT_FOUND",
        message: `ID Kelas ${req.params.id} tidak ditemukan`,
      });

    res.status(200).json({
      data: kls,
    });

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
    res.send(err);
  } catch (err) {
    // res.status(500).json({
    //   status: false,
    //   name: err.name,
    //   message: err.message,
    // });
    next(err);
    // res.status(500).json({
    //   error: "INTERNAL_SERVER_ERROR",
    //   message: err.message,
    // });
  }
});
//delete kelas

app.delete("/api/kelas/:id", function (req, res) {
  try {
    //cek kelas id
    const klas = kelas.find((k) => k.id === parseInt(req.params.id));
    if (!klas) res.status(404).send("Kelas tidak ditemukan");

    const index = kelas.indexOf(klas);
    kelas.splice(index, 1);
    res.send({
      pesan: "Data berhasil dihapus.",
      data: klas,
    });
    res.send(err);
  } catch (err) {
    // res.status(500).json({
    //   status: false,
    //   name: err.name,
    //   message: err.message,
    // });
    next(err);
  }
});

//auth JWT
app.post("/api/login", (req, res) => {
  const user = {
    id: Date.now(),
    userEmail: "admin@gamelab.id",
    password: "gamelab",
  };

  jwt.sign({ user }, "secretkey", (err, token) => {
    res.json({
      token,
    });
  });
});

app.get("/api/profile", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Selamat datang di Gamelab Indonesia",
        userData: authData,
      });
    }
  });
});

//verifikasi token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  //jika bearer kosong
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
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
//try-catch
// app.get("/", (req, res) => {
//   try {
//     function_get_data();
//   } catch (e) {
//     res.status(500).json({
//       status: false,
//       name: err.name,
//       message: err.message,
//     });
//   }
// });

//error middleware
// app.use((err, req, res, next) => {
//   if (err instanceof MyCustomError) {
//     //handle custom error
//     res.status(400).send({
//       error: 'An unexpected error occurred.'
//     });
//   }
// });

// app.get('/', (req, res, next) => {
//   constructor (message) {
//     super(message);
//     this.name = 'MyCustomError';
//   }
// })

app.use((err, req, res, next) => {
  res.status(500).json({
    status: false,
    name: err.name,
    message: err.message,
  });
});

// //assertion

// app.get("/api/user/:id", (req, res) => {
//   try {
//     //kode exception
//     const id = req.params.id;
//     const user = retriveuser(id);
//     assert(user, `User with id ${id} not found`);
//     // if (!user) {
//     //   res.status(404).json({
//     //     error: 'USER_NOT_FOUND',
//     //     message: `User with id ${id} not found`
//     //   });
//     // }
//     res.status(200).json({ user });
//   } catch (error) {
//     //exception
//     // res.status(500).json({
//     //   error: 'INTERNAL_SERVER_ERROR',
//     //   message: error.message
//     // });
//     if (error.name === "AssertError") {
//       res.status(404).json({ error: error.message });
//     } else {
//       res.status(500).json({ error: error.message });
//     }
//   }
// });

//debug

// app.get('/', (req, res) => {
//   const result = someFunctionThatMightHaveBug();
//   console.log('Result:', result);
//   res.send(result);
// });


app.listen(3000, () => console.log("Server running on port 3000"));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
