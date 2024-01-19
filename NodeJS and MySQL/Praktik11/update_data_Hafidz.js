var db = require("./db_config_Hafidz");

const sql = `UPDATE member
SET address='Blora, Jawa Tengah'
WHERE id=1`;

db.query(sql, function (err, result) {
    if (err) throw err; // not showing the error
    console.log(result.affectedRows + " record(s) updated");
});