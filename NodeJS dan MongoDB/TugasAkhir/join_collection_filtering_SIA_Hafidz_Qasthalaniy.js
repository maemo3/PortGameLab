const MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Sistem_Informasi_Akademik_Hafidz_Qasthalaniy");
  dbo.collection("Siswa").aggregate([
    {
        $lookup :
        {
            from: 'Kelas',
            localField: 'kode_kelas',
            foreignField: 'kode_kelas',
            as: 'hasil_data_kelas'
        }
    },
    {
        $lookup :
        {
            from: 'Mapel',
            localField: 'kode_mapel',
            foreignField: 'kode_mapel',
            as: 'hasil_data_mapel'
        }
    },
    {
        $lookup :
        {
            from: 'Nilai',
            localField: 'kode_mapel',
            foreignField: 'kode_mapel',
            as: 'hasil_data_nilai'
        }
    },
    {
        $match:
        {
            'hasil_data_kelas.nama_kelas': 
            {
                $eq: "10.TKJ"
            }
        }
    },
    {
        $sort:
        {
            'hasil_data_kelas.nama_kelas': 1
        }
    }
    
  ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res,null,2));
    db.close();
  });
});