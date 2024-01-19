var db = require("./db_config_Hafidz");

const sql = `UPDATE member
SET name = REPLACE(name, 'Coffee', 'Shop')
WHERE address = 'Gamelab Indonesia'`;

db.query(sql, function (err, result) {
    if (err) throw err; // not showing the error
    console.log(result.affectedRows + " record(s) updated");
});