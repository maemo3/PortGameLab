var express = require('express');
var router = express.Router();

const products = {
    "digital_books": [
        {
            "judul": "Berita",
            "penerbit": "Badan Permusyawaratan Kewarganegaraan Indonesia.",
            "Tahun": 1954
        },
        {
            "judul": "Jurnalistik Indonesia menulis berita dan feature",
            "penerbit": "A. S. Haris Sumadiria",
            "Tahun": 2006
        },
        {
            "judul": "Berita aneh",
            "penerbit": "Muchwardi Muchtar",
            "Tahun": 1980
        }
    ],
    "educational_games": [
        {
            "judul": "Dialog dan edukasi",
            "penerbit": "Nieke Kristiana Atmadja-Hadinoto",
            "Tahun": 1989
        },
        {
            "judul": "Pokok-pokok strategi program nasional KB bidang komunikasi, informasi & edukasi",
            "penerbit": "Haryono Suyono",
            "Tahun": 1977
        },
        {
            "judul": "Study Guide",
            "penerbit": "SuperSummary",
            "Tahun": 2017
        }
    ]
}

router.get('/produk', (req, res) => {
    res.json({
        data: products
    });
    res.send({
        data:products
    });
});

module.exports = router;