var db = require("./db_config_Hafidz");

const sql = `UPDATE member
SET address ='Indonesia'
ORDER BY name DESC LIMIT 5`;

db.query(sql, function (err, result) {
    if (err) throw err; // not showing the error
    console.log(result.affectedRows + " record(s) updated");
});