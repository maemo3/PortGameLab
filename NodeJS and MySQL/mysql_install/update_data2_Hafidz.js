var db = require("./db_config_Hafidz");

const sql = `UPDATE member
SET name='Gamelab Indonesia'
WHERE name LIKE '%coffee' OR name LIKE '%cafe'`;

db.query(sql, function (err, result) {
    if (err) throw err; // not showing the error
    console.log(result.affectedRows + " record(s) updated");
});