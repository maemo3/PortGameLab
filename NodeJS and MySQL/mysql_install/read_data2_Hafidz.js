var db = require("./db_config_Hafidz");

var sql = "SELECT id,name FROM member";

db.query(sql, function (err, result) {
    if (err) throw err;
    console.log(`ID \t NAME \t`);
    console.log(`----------------------------------------------------------`);
    result.forEach((mbr) => {
        console.log(`${mbr.id} \t ${mbr.name} `);
    });
});