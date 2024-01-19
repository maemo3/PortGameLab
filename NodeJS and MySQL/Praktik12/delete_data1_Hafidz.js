var db = require("./db_config_Hafidz");

var sql = `DELETE FROM member WHERE name LIKE '%Hotel'`;

db.query(sql, function (err, result) {
    if (err) throw err; // not showing the error
    console.log("Number of record deleted: " + result.affectedRows);
});