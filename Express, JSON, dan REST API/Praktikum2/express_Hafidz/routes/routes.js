import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Selamat Datang di Gamelab');
});

router.get('/kelas', (req, res) => {
    res.send("Ini adalah Halaman kelas");
});

router.get('/about', (req, res) => {
    res.send("Ini adalah Halaman About");
});

router.get('/kelas/:id', (req, res) => {
    res.send(`Ini adalah Halaman untuk kelas ${req.params.id}`);
});

router.get('/kelas/:jurusan/:id/:pilihan?', (req, res) => {
    var jurusan = req.params.jurusan
    var id = req.params.id
    var pilihan = req.params.pilihan
    res.send(`Ini adalah halaman untuk kelas ${jurusan} ${pilihan} tingkat ${id}`);
});

export default router;
