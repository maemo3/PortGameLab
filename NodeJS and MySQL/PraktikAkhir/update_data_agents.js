var db = require("./db_config");

const sql = `UPDATE AGENTS
SET WORKING_AREA='Singapore'
WHERE AGENT_CODE='A008'`;

db.query(sql, function (err, result) {
    if (err) throw err; // not showing the error
    console.log(result.affectedRows + " record(s) updated");
});