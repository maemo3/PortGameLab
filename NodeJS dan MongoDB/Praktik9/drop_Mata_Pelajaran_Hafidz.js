const MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Sistem_Informasi_Akademik");
  dbo.collection("nilaiExtra").drop(function(err, res) {
    if (err) throw err;
    if (res) console.log("Koleksi berhasil dihapus!");
    db.close();
  });
});