const router = require('express').Router();
const registerController = require('../controller').register;
const verifyUser = require('../library/verify');

router.get('/', verifyUser.isLogout, registerController.formRegister);
router.post('/save', verifyUser.isLogout, registerController.saveRegister);

module.exports = router;