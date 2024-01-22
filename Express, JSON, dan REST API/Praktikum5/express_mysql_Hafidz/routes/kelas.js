var express = require("express");
var router = express.Router();
var kelas = require('../controller/kelasController')

// var connection = require("../library/database");

// router.get("/:id", function (req, res) {
//   let id = req.params.id;

//   connection.query("SELECT * FROM kelas WHERE id =" + id, function (err, rows) {
//     if (err) {
//       res.send("error", err);
//       res.json({
//         data: "",
//       });
//     } else {
//       res.json({
//         data: rows,
//       });
//     }
//   });
// });

// router.get("/", function (req, res) {
//   connection.query("SELECT * FROM kelas", function (err, rows) {
//     if (err) {
//       res.send("error", err);
//       res.json({
//         data: "",
//       });
//     } else {
//       res.json({
//         data: rows,
//       });
//     }
//   });
// });

// // ===========================

// router.post("/", function (req, res) {
//   let nama_jurusan = req.body.nama_jurusan;
//   let Deskripsi = req.body.Deskripsi;
//   let errors = false;

//   if (!nama_jurusan) {
//     errors = true;
//     res.json({
//       pesan: "Field nama_jurusan belum diisi, Field harus diisi dengan lengkap"
//     });
//   }
//   if (!Deskripsi) {
//     errors = true;
//     res.json({
//       pesan: "Field Deskripsi belum diisi, Field harus diisi dengan lengkap"
//     });
//   }

//   if (!errors) {
//     let formData = {
//       nama_jurusan: nama_jurusan,
//       Deskripsi: Deskripsi,
//     };

//     connection.query("INSERT INTO kelas SET ?", formData, function (err, result) {
//         if (err) {
//           res.json({ pesan: "Data gagal disimpan" });
//         } else {
//           res.send("Data berhasil disimpan");
//         }
//       })
//   }
// });

// router.put("/:id", function (req, res) {

//     let id = req.params.id;
//     let nama_jurusan = req.body.nama_jurusan;
//     let Deskripsi = req.body.Deskripsi;
//     let errors = false;
  
//     if (!nama_jurusan) {
//       errors = true;
//       res.json({
//         pesan: "Field nama_jurusan tidak boleh kosong"
//       });
//     }
//     if (!Deskripsi) {
//       errors = true;
//       res.json({
//         pesan: "Field Deskripsi tidak boleh kosong"
//       });
//     }
  
//     if (!errors) {
//       let formData = {
//         nama_jurusan: nama_jurusan,
//         Deskripsi: Deskripsi
//       }
  
//       connection.query("UPDATE kelas SET ? WHERE id = "+id, formData, function (err, result) {
//           if (err) {
//             res.send('error', err);
//             res.json({
//                 id: req.params.id,
//                 nama_jurusan: formData.nama_jurusan,
//                 Deskripsi: formData.Deskripsi
//             })
//           } else {
//             res.send("Data berhasil Diupdate!");
//           }
//         })
//     }
//   });

// //   ====================================

// router.delete('/:id', function(req, res) {
//     let id = req.params.id;

//     connection.query('DELETE FROM kelas WHERE id = '+id, function(err, result) {
//         if (err) {
//             res.send('error', err)
//         } else {
//             res.send('Data berhasil Dihapus!')
//         }
//     })
// })

router.get('/', kelas.getAllkelas);
router.get('/:id', kelas.getKelasId);
router.post('/', kelas.createKelas);
router.put('/:id', kelas.updateKelas);
router.delete('/:id', kelas.deleteKelas);

module.exports = router;
