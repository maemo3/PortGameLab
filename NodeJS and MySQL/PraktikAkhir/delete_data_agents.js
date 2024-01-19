var db = require("./db_config");

var sql = `DELETE FROM AGENTS WHERE AGENT_CODE='A003'`;

db.query(sql, function (err, result) {
    if (err) throw err; // not showing the error
    console.log("Number of record deleted: " + result.affectedRows);
});