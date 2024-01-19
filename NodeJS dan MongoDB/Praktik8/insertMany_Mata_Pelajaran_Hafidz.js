const MongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Sistem_Informasi_Akademik");
    var myobj = [
      { kode_mapel: 'Y04', nama_mapel: 'MySQL Dasar'},
      { kode_mapel: 'H05', nama_mapel: 'MongoDB Lanjut'}
    ];
    dbo.collection("Mata_Pelajaran").insertMany(myobj, function(err, res) {
      if (err) throw err;
      console.log("Jumlah data yang berhasil ditambahkan adalah: " + res.insertedCount);
      db.close();
    });
  });