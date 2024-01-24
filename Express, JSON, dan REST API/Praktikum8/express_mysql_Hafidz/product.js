var express = require('express');
var router = express.Router();

const products = {
    "digital_books": [
        {
            "judul": "Bawang merah dan Bawang putih",
            "penerbit": "Pustaka RIRI"
        },
        {
            "judul": "Kelinci dn Kura-kura",
            "penerbit": "Pustaka RIRI"
        },
        {
            "judul": "Malin Kundang",
            "penerbit": "Pustaka RIRI"
        }
    ],
    "educational_games": [
        {
            "judul": "Sudoku Educational Game",
            "tipe": "Edukasi Anak"
        },
        {
            "judul": "Marbel Piano",
            "tipe": "Edukasi Anak"
        },
        {
            "judul": "Marbel Belajar Bahasa Inggris",
            "tipe": "Edukasi Anak"
        }
    ]
}

router.get('/', (req, res) => {
    res.json({
        data: products
    });
    res.send({
        data:products
    });
});

module.exports = router;