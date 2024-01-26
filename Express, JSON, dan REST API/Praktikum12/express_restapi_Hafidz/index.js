import  express  from "express";

import Router from "./routes/routes.js"

const app = express()
const port = 3000;

app.get(
    "/", (req, res, next) => {
        console.log("Ini adalah middleware 1");
        next();
    },
    (req,res, next)=>{
        console.log('Ini adalah middleware 2');
        req.name = "test";
        next();
    },
    (req, res, next) => {
        console.log("Ini adalah middleware 3");
        const err = {
            status: "error",
            data: {
                name: req.name
            }
        };
        next(err);
    },
    (req, res, next) =>{
        console.log("Ini adalh middleware 4");
    }
);

app.use((error, req, res, next) => {
    res.json(error);
});

app.use(Router);

// app.get('/kelas', (req, res) => {
//     res.send("GET kelas");
// });

// app.post('/kelas', (req, res) => {
//     res.send('POST Kelas');
// });

// app.put('/kelas', (req, res) => {
//     res.send('PUT Kelas');
// });

// app.delete('/kelas', (req, res) => {
//     res.send('DELETE Kelas');
// });

app.get("/", (req, res) => {
  console.log('Ini dalah permintaan request "/"');
  console.log("Selamat datang di Gamelab Indonesia! ");
});

// app.listen(3000, () => console.log("Server running on port 3000"));


// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`)
// })