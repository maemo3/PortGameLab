const config = require("../library/database");
let mysql = require("mysql");
let pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  getAllKelas(req, res) {
    pool.getConnection(function (err, connection) {
      connection.query("SELECT * FROM kelas", function (err, rows) {
        if (err) {
          res.send("error", err);
          res.json({
            data: "",
          });
        } else {
          res.json({
            data: rows,
          });
        }
      });
    });
  },

  // ===========================

  getKelasId(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      //Mulai try-catch
      try {
        if (err) {
          throw err; // Melempar error ke blok catch
        }

        connection.query(
          "SELECT * FROM kelas WHERE id =" + id,
          function (err, rows) {
            if (err) {
              throw err; // Melempar error ke blok catch
            } else {
              if (rows.length === 0) {
                // Tambahkan pengecekan jika data kosong
                res.status(404).json({
                  error: "Data tidak tersedia",
                  data: rows,
                });
              } else {
                res.json({
                  data: rows,
                });
              }
            }
            connection.release(); // Melepaskan koneksi saat selesai
          }
        );
      } catch (error) {
        res.status(500).json({ error: error.message }); // Memberikan tanggapan error
      }
    });
  },
  // =================

  createKelas(req, res) {
    let nama_jurusan = req.body.nama_jurusan;
    let deskripsi = req.body.deskripsi;
    let errors = false;

    if (!nama_jurusan) {
      errors = true;
      res.json({
        pesan:
          "Field nama_jurusan belum diisi, Field harus diisi dengan lengkap",
      });
    }
    if (!deskripsi) {
      errors = true;
      res.json({
        pesan: "Field deskripsi belum diisi, Field harus diisi dengan lengkap",
      });
    }

    if (!errors) {
      let formData = {
        nama_jurusan: nama_jurusan,
        deskripsi: deskripsi,
      };
      pool.getConnection(function (err, connection) {
        connection.query(
          "INSERT INTO kelas SET ?",
          formData,
          function (err, result) {
            if (err) {
              res.json({ pesan: "Data gagal disimpan" });
            } else {
              res.send("Data berhasil disimpan");
            }
          }
        );
      });
    }
  },

  // ==========================

  updateKelas(req, res) {
    let id = req.params.id;
    let nama_jurusan = req.body.nama_jurusan;
    let deskripsi = req.body.deskripsi;
    let errors = false;

    if (!nama_jurusan) {
      errors = true;
      res.json({
        pesan: "Field nama_jurusan tidak boleh kosong",
      });
    }
    if (!deskripsi) {
      errors = true;
      res.json({
        pesan: "Field deskripsi tidak boleh kosong",
      });
    }

    if (!errors) {
      let formData = {
        nama_jurusan: nama_jurusan,
        deskripsi: deskripsi,
      };
      pool.getConnection(function (err, connection) {
        connection.query(
          "UPDATE kelas SET ? WHERE id = " + id,
          formData,
          function (err, result) {
            if (err) {
              res.send("error", err);
              res.json({
                id: req.params.id,
                nama_jurusan: formData.nama_jurusan,
                deskripsi: formData.deskripsi,
              });
            } else {
              res.send("Data berhasil Diupdate!");
            }
          }
        );
      });
    }
  },

  // //   ====================================

  deleteKelas(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      connection.query(
        "DELETE FROM kelas WHERE id = " + id,
        function (err, result) {
          if (err) {
            res.send("error", err);
          } else {
            res.send("Data berhasil Dihapus!");
          }
        }
      );
    });
  },
};
