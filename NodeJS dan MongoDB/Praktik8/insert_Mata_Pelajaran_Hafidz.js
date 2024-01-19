const MongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Sistem_Informasi_Akademik");
    var my_object = {
        kode_mapel: "Y03",
        nama_mapel: "MySQL dan MongoDB"
    };
    dbo.collection("Mata_Pelajaran").insertOne(my_object, function(err, res) {
        if (err) throw err;
        console.log("1 data berhasil ditambahkan!");
        db.close();
    });
}); 
