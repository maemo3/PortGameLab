//deff database
const config = require('../library/database');
//library mysql
let mysql = require('mysql');
//make conn
let pool = mysql.createPool(config);

//send if conn failed
pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    //render file register
    formRegister(req,res){
        res.render('register',{
            //deff all variabel to render to register
            url : 'http://localhost:3000/',
        });
    },
    //func to save data
    saveRegister(req,res){
        //store user input to user,email,pass var
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.pass;
        //make sure all var
        if (username && email && password) {
            //call conn and exec query
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                connection.query(
                    `INSERT INTO user (username,email,password) VALUES (?,?, SHA2(?, 512));`
                , [username, email, password],function (error, results) {
                    if (error) throw error;
                    //no error, set library flash
                    req.flash('color', 'success');
                    req.flash('status', 'Yes..');
                    req.flash('message', 'Registrasi berhasil');
                    //back to login page
                    res.redirect('/login');
                });
                //conn end
                connection.release();
            })
        } else {
            // condition if var user,email, pass not enter
            res.redirect('/login');
            res.end();
        }
    }
}