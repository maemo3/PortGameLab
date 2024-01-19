const MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("perpustakaan");
  dbo.collection("databuku").aggregate([
    {
        $lookup :
        {
            from: 'lokasibuku',
            localField: 'kode_buku',
            foreignField: 'kode_buku',
            as: 'data'
        }
    },
    {
        $match: 
        {
            'data.nama_rak':
            {
                $eq: "Database"
            }
        }
    },
    {
        $sort: 
        {
            'data.kode_buku':1
        }
    }
  ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res,null,2));
    db.close();
  });
});