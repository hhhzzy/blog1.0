const express =  require('express');
const router = express.Router();
const articleModel = require("../../../models/article"); 
router.get('/',function(req,res){
	res.send("22222");
	
})
//总条数查询
router.post('/',function(req,res){
	articleModel.findById(req.body.id,function(err,doc){
		console.log(doc)
		res.send({
			"err" : 0,
			"msg" : "查询成功",
			"data" : doc
		})
	})
})
module.exports = router;
