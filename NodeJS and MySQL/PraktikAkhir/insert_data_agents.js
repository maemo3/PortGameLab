var db = require("./db_config");

var sql = `INSERT INTO AGENTS
VALUES 
('A013','Nagashi','Japan','0.17','021-09897267', '')`;

db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
});