const express = require('express');
const router = express.Router();

router.get('/kueri', function (req, res) {
    var nama = req.query.nama;
    var usia = req.query.umur;
    console.log(nama, usia)
    res.status(200).json({
        nama,
        usia
    })
});

module.exports = router;