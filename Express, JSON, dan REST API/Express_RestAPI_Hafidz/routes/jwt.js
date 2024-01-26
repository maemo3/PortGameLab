var express = require("express");
const jwt = require('jsonwebtoken');

var app = express.Router();

//auth JWT
app.post("/token", (req, res) => {
    const user = {
      id: Date.now(),
      userEmail: "admin@localhost.com",
      password: "localhost",
    };
  
    jwt.sign({ user }, "secretkey", (err, token) => {
      res.json({
        token,
      });
    });
  });
  
  app.get("/auth", verifyToken, (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (err) {
        res.status(403).send({
          error: 'Token salah'
        });
      } else {
        res.json({
          message: "Selamat datang Kembali",
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
      res.status(403).send({
        error: 'Token belum diisi'
      });
    }
  }

  module.exports = app