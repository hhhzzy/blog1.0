var express = require('express');
var router = express.Router();
//const adminModel = require("../models/admin.js");
var checkLoging = require('../check/checkLogin.js').checkLoging;//是否登录
router.get('/',checkLoging,function(req,res) {
  res.render('main.ejs');
});	
module.exports = router;