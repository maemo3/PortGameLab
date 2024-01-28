var router = require("express").Router();
var kelas = require('../controller/kelasController');

// =========================

router.get('/kelas', kelas.getAllKelas);
router.get('/kelas/:id', kelas.getKelasId);
router.post('/kelas', kelas.createKelas);
router.put('/kelas/:id', kelas.updateKelas);
router.delete('/kelas/:id', kelas.deleteKelas);

module.exports = router;
