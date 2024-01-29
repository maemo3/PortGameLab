var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')

router.use(bodyParser.json())

const users = {
  gamelab: {
    username: 'gamelab',
    password: 'indonesia',
  },
  user: {
    username: 'user',
    password: 'inipass',
  }
};

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      message: 'Tidak ada akses'
    });
  }

  const [type, credentials] = authHeader.split(' ');
  if (type !== 'Basic') {
    return res.status(401).json({
      message: 'Tidak ada akses'
    });
  }

  const [username, password] = Buffer.from(credentials, 'base64')
  .toString()
  .split(':');
  const user = users[username];
  if (!user || user.password !== password) {
    return res.status(401).json({
      message: 'Tidak ada akses'
    });
  }

  req.auth = { username };
  next();
};

router.use(authenticate);

router.get('/profile', (req, res) => {
  res.json({
    message: 'Selamat Datang di Gamelab Indonesia',
    user: req.auth,
  });
});

module.exports = router;
