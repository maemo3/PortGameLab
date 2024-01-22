const connection = require("../library/database");
const config = require("../library/database");
let mysql = require("mysql");
let pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  formRegister(req, res) {
    res.render("register", {
      url: "http://localhost:3000",
    });
  },

  saveRegister(req, res) {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.pass;

    if (username && email && password) {
      pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(
          `INSERT INTO user (username,email,password) VALUES (?,?, SHA2(?, 512));`,
          [username, email, password],
          function (error, result) {
            if (error) throw error;

            req.flash("color", "success");
            req.flash("status", "Yes..");
            req.flash("message", "Registrasi berhasil");

            res.rendirect("/login");
          }
        );

        connection.relase();
      });
    } else {
      res.rendirect("/login");
      res.end();
    }
  },
};
