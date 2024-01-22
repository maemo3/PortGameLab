var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hafidz Qasthalaniy' });
});

router.get(
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

module.exports = router;
