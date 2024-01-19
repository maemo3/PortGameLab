const MongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Sistem_Informasi_Akademik");
    var myquery = { nama_mapel: 'MongoDB Lanjut' };
    var newvalues = { $set: {kode_mapel: "Y05" } };
    dbo.collection("Mata_Pelajaran").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 data berhasil diupdate");
      db.close();
    });
  });