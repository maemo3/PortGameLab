var express = require('express')
var app = express()

var authMiddleware = function(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

var errorHandlerMiddleware = function(err, req, res, next) {
    console.log(err.stack)
    res.status(500).send('Terjadi kesalahan')
}

var adminAuthMiddleware = function(req, res, next) {
    if (req.user.role === 'admin') {
        next()
    } else {
        res.status(401).send('Akses ditolak')
    }
}

app.use('/dashboard', authMiddleware)
app.use(errorHandlerMiddleware)
app.use('/admin', adminAuthMiddleware)

app.get('/dashboard', function (req, res) {
    res.send('And berhasil masuk ke dashboard.')
})