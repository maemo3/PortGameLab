var db = require("./db_config_Hafidz");

var sql = `INSERT INTO member(name, address)
VALUES 
('Farah Nisa', 'Jakarta'),
('Muhammad Iqbal', 'Surabaya');`;

db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
});