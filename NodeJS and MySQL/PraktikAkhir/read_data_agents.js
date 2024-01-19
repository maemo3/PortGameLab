var db = require("./db_config");

var sql = "SELECT * FROM AGENTS";

db.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
});