const config = require('../library/database');

let mysql = require('mysql');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
  console.error(err);
});

module.exports = {
  profile(req, res) {
    let id = req.session.userid
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `SELECT * FROM user WHERE user_id= '${id}';`,
        function (error, results) {
          if (error) throw error;
          res.render('profile', {
            url: 'http://localhost:3000/',
            userName: req.session.username,
            email: results[0]['email'],
            nama: results[0]['username'],
          });
        }
      );
      connection.release();
    })
  }
}