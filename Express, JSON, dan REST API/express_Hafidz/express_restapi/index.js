// //kode untuk token header
// const header = {
//     "alg": "HS256",
//     "ty[": "JWT"
//   }
//   const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64')
//   console.log(`Ini adalh token untuk header: ${encodedHeader}`)
  
//   //kode untuk token payload
//   const payload = {
//     "username": "Gamelab Indonesia"
//   }
//   const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64')
//   console.log(`Ini adalh token untuk header: ${encodedPayload}`)
  
//   //kode untuk token signiture
//   const crypto = require('crypto')
//   const jwtSecret = 'secretkey'
//   const signiture = crypto.createHmac('sha256', jwtSecret)
//   .update(encodedHeader + '.' + encodedPayload)
//   .digest('base64')
  
//   console.log(`Ini adalah token untuk signiture : ${signiture}`)
  
//   //kode untuk JWT
//   const jwt = `${encodedHeader}.${encodedPayload}.${signiture}`
//   console.log(`Ini adalah hasil dari token JWT : ${jwt}`)

var mysql = require("mysql");

var hostname = "ocx.h.filess.io";
var database = "express_abilitybut";
var port = "3307";
var username = "express_abilitybut";
var password = "1545d941645d3ab1cb6785176b29505c8b51cf6b";

var con = mysql.createConnection({
  host: hostname,
  user: username,
  password,
  database,
  port,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

con.query("SELECT 1+1").on("result", function (row) {
  console.log(row);
});
