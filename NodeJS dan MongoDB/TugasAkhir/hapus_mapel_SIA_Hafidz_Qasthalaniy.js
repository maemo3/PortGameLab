const MongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Sistem_Informasi_Akademik_Hafidz_Qasthalaniy");
    var myquery = { kode_mapel: "BI" };
    dbo.collection("Mapel").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log("1 data berhasil dihapus!");
      db.close();
    });
});