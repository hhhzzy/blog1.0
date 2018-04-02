const express = require("express");
const router = express.Router();
const singleSaying = require("../models/singleSaying");
router.get("/",function(req,res){
	res.send("555555");
})
router.post("/",function(req,res){
	console.log(req.fields);
	var content = req.fields.content;
	var user = req.session.user;
	var whereStr = {
		"content" : content,
		"author" : user.name
	}
	singleSaying.create(whereStr,function(err,doc){
		if(err) throw err;
		return res.send({
			"err" : 0,
			"msg" : "提交成功",
			"data" : doc
		})
	})
})
module.exports = router;

