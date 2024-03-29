var db = require("./db_config_Hafidz");

var sql = "INSERT INTO member (name, address) VALUES ?";
var values = [
  ["JS Coffee", "Highway 71"],
  ["3AM Coffee", "Lowstreet 4"],
  ["Apple Cafe", "Apple st 652"],
  ["Laravel Coffee", "Mountain 21"],
  ["Nodejs Cafe", "Valley 345"],
  ["PHP Hotel", "Ocean blvd 2"],
  ["One Cafe", "Green Grass 1"],
  ["Richard bar", "Sky st 331"],
  ["Susan Cafe", "One way 98"],
  ["Vicky Club", "Yellow Garden 2"],
  ["Ben Resto", "Park Lane 38"],
  ["William Company", "Central st 954"],
  ["Chuck Food", "Main Road 989"],
  ["Viola Coffee", "Sideway 1633"],
];

db.query(sql, [values], function(err, result) {
    if (err) throw err; // not showing the error
    console.log("Number of record inserted: " + result.affectedRows);
});