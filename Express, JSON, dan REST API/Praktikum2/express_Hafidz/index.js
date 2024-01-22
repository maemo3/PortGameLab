import  express  from "express";

import Router from "./routes/routes.js"

const app = express()
const port = 3000;

app.use(Router);

app.get('/kelas', (req, res) => {
    res.send("GET kelas");
});

app.post('/kelas', (req, res) => {
    res.send('POST Kelas');
});

app.put('/kelas', (req, res) => {
    res.send('PUT Kelas');
});

app.delete('/kelas', (req, res) => {
    res.send('DELETE Kelas');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})