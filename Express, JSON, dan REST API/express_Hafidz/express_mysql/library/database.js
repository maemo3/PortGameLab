let mysql = require('mysql');

let connection = mysql.createConnection({
    multipleStatements: true,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'express_mysql'
});

connection.connect(function(error){
    if(!!error){
        console.log(error);
    } else {
        console.log("MySQL connected...");
    }
});

module.exports = connection;