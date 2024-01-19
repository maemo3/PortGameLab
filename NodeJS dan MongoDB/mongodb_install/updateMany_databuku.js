const MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("perpustakaan");
  var myquery = { pengarang: 'Gamelab Indonesia' };
  var newvalues = { $set: { thn_terbit : 2022 } };
  dbo.collection("databuku").updateMany(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(res.modifiedCount + " data yang berhasil diupdate");
    db.close();
  });
});