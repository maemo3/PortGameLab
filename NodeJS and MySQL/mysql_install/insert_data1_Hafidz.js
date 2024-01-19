var db = require("./db_config_Hafidz");

var sql = `INSERT INTO member(id, name, address) 
            VALUES (17, 'Gamelab', 'Salatiga'),
            (18, 'Educa', 'Salatiga')`;

db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
    });