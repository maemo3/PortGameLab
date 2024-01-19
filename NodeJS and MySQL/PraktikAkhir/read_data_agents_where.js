var db = require("./db_config");

var sql = "SELECT AGENT_CODE, AGENT_NAME, WORKING_AREA, COMMISSION, PHONE_NO, COUNTRY FROM AGENTS WHERE WORKING_AREA LIKE '%London';";

db.query(sql, function (err, result) {
    if (err) throw err;
    console.log(`AGENT_CODE \t AGENT_NAME \t WORKING_AREA \t COMMISION \t PHONE_NO \t COUNTRY`);
    console.log(`----------------------------------------------------------------------------------------`);
    result.forEach((mbr) => {
        console.log(`${mbr.AGENT_CODE} \t\t ${mbr.AGENT_NAME} \t\t ${mbr.WORKING_AREA} \t ${mbr.COMMISSION} \t\t ${mbr.PHONE_NO} \t ${mbr.COUNTRY}`);
    });
});