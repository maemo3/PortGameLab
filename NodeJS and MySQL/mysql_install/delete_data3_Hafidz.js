var db = require("./db_config_Hafidz");

var sql = `DELETE FROM member ORDER BY name DESC LIMIT 3`;

db.query(sql, function (err, result) {
    if (err) throw err; // not showing the error
    console.log("Number of record deleted: " + result.affectedRows);
});