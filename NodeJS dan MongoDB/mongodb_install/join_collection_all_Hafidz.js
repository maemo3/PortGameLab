const MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("perpustakaan");
  dbo.collection("histori").aggregate([
    {
        $lookup :
        {
            from: 'lokasibuku',
            localField: 'kode_buku',
            foreignField: 'kode_buku',
            as: 'hasil_data_buku'
        }
    },
    {
        $lookup :
        {
            from: 'lokasibuku',
            localField: 'kode_buku',
            foreignField: 'kode_buku',
            as: 'hasil_data_lokasi'
        }
    },
    {
        $lookup :
        {
            from: 'anggota',
            localField: 'kode_anggota',
            foreignField: 'kode_anggota',
            as: 'hasil_data_anggota'
        }
    }
    
  ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res,null,2));
    db.close();
  });
});