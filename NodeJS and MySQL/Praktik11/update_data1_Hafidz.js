var db = require("./db_config_Hafidz");

const sql = `UPDATE member
SET name='Educa Studio',
address='Jl. Gilingrejo No. 10 Salatiga'
WHERE id=3`;

db.query(sql, function (err, result) {
    if (err) throw err; // not showing the error
    console.log(result.affectedRows + " record(s) updated");
});