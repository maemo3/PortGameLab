var db = require("./db_config_Hafidz");

var sql = "SELECT id,name,address FROM member WHERE address LIKE '%Salatiga';";

db.query(sql, function (err, result) {
    if (err) throw err;
    console.log(`ID \t NAME \t\t ADDRESS`);
    console.log(`----------------------------------------------------------`);
    result.forEach((mbr) => {
        console.log(`${mbr.id} \t ${mbr.name} \t ${mbr.address}`);
    });
});