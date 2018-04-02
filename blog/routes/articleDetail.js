const express = require("express");
const router = express.Router();
router.get("/",function(req,res){
	console.log()
	var superagent = require("superagent");
	superagent.post("http://localhost:3002/api/articleDetail")
	.send({"id":req.query.id})
	.end(function( err, doc){
		console.log(doc.body)
        res.render("articleDetail",{
        	"err" : 0,
        	"msg" : "查询成功",
        	"data" : doc.body
        });
   });
})
router.post("/",function(req,res){
	
	res.send({
		"aa":'25'
	})
})
module.exports = router;
