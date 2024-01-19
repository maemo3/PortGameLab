const MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Sistem_Informasi_Akademik_Hafidz_Qasthalaniy");
  dbo.collection("Siswa").aggregate([
    {
        $lookup :
        {
            from: 'Mapel',
            localField: 'kode_mapel',
            foreignField: 'kode_mapel',
            as: 'data'
        }
    }
  ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res,null,2));
    db.close();
  });
});