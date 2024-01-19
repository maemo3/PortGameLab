var db = require("./db_config_Hafidz");

var sql = "SELECT * FROM member";

db.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
});