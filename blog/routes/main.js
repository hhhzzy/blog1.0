const express = require("express");
const router = express.Router();
router.get('/',function(req,res){
//	res.send("这是主页");
	res.render("main.ejs");//渲染模版
})
module.exports = router;