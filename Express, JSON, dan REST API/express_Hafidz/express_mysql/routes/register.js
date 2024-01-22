//def router express
const router = require('express').Router();
//call var cntroller
const registerController = require('../controller').register;
//call middleware verify.js
const verifyUser = require('../library/verify');

//route localhost form register
router.get('/', verifyUser.isLogout, registerController.formRegister);
//route localhost save data
router.post('/save', verifyUser.isLogout, registerController.saveRegister);

//export router var
module.exports = router;