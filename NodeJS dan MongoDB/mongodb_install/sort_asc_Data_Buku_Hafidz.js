const MongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("perpustakaan");
        var mysort = {judul_buku: 1};
        dbo.collection("databuku").find().sort(mysort).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
        });
      }); 