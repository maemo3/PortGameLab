// // const connection = require('../library/database');
// //deff database
// const config = require('../library/database');
// //library mysql
// let mysql = require('mysql');
// //make conn
// let pool = mysql.createPool(config);

// //send if conn failed
// pool.on('error', (err) => {
//   console.error(err);
// });

// module.exports = {
//   //render file register
//   formRegister(req, res) {
//     res.render('register', {
//       //deff all variabel to render to register
//       url: 'http://localhost:3000',
//     });
//   },

//   //func to save data
//   saveRegister(req, res) {
//     //store user input to user,email,pass var
//     let username = req.body.username;
//     let email = req.body.email;
//     let password = req.body.pass;

//     //make sure all var
//     if (username && email && password) {
//       //call conn and exec query
//       pool.getConnection(function (err, connection) {
//         if (err) throw err;
//         connection.query(
//           `INSERT INTO user (username,email,password) VALUES (?,?, SHA2(?, 512));`,
//           [username, email, password],
//           function (error, result) {
//             if (error) throw error;
//             //no error, set library flash
//             req.flash('color', 'success');
//             req.flash('status', 'Yes..');
//             req.flash('message', 'Registrasi berhasil');
//             //back to login page
//             res.rendirect('/login');
//           }
//         );
//         //conn end
//         connection.relase();
//       })
//     } else {
//       // condition if var user,email, pass not enter
//       res.rendirect('/login');
//       res.end();
//     }
//   }
// }

// Define Database configuration
const config = require('../library/database');
// Use the mysql library
let mysql = require('mysql');
// Create a connection
let pool = mysql.createPool(config);

// Send an error if the connection fails
pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    // Function to render the register file in the 'src/views/register.ejs' folder
    formRegister(req,res){
        res.render('register',{
            // Define all the variables that you want to render in register.ejs
            url : 'http://localhost:3000/',
        });
    },
    // Function to store data
    saveRegister(req,res){
        // Collect user input into username, email and password variables
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.pass;
        // Make sure all variables are filled in
        if (username && email && password) {
            // Call the connection and execute the query
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                connection.query(
                    `INSERT INTO user (username,email,password) VALUES (?,?,SHA2(?,512));`
                , [username, email, password],function (error, results) {
                    if (error) throw error;
                    // If there are no errors, set the flash library to display a success message
                    req.flash('color', 'success');
                    req.flash('status', 'Yes..');
                    req.flash('message', 'Registration successful');
                    // Return to the login page
                    res.redirect('/login');
                });
                // Connection complete
                connection.release();
            })
        } else {
            // Condition if the username, email and password variables are not filled in
            res.redirect('/login');
            res.end();
        }
    }
}