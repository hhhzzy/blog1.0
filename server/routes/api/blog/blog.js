const express =  require('express');
const router = express.Router();
const blogModel = require("../../../models/blog"); 
const adminModel = require("../../../models/admin"); 
router.get('/',function(req,res){
	res.send("22222");
	
})
//总条数查询
router.post('/',function(req,res){
	const type = req.body.type
	if(type == "motto"){
		blogModel.findOne({},{"motto":1,"_id":0},function(err,doc){
			if(err){
				console.log(err)
			}else{
				res.send({
					"err":0,
					"msg":"查询成功",
					"data":doc
				});
			}
		})
	}else if(type == "timeLine"){
		blogModel.findOne({},{"timeLine":1,"_id":0})
				 .sort({"timeLine.blogTime":-1})
				 .exec(function(err,doc){
					if(err){
						console.log(err)
					}else{
						res.send({
							"err":0,
							"msg":"查询成功",
							"data":doc
						});
					}
				 })
	}else if(type == "info"){
		adminModel.findOne({"name":"admin"},{"evaluate":1,"_id":0},function(err,doc){
			if(err){
				console.log(err)
			}else{
				return res.send({
					"err":0,
					"msg":"查询成功",
					"data":doc
				});
			}
		})
	}else if(type == "blogInfo"){
		blogModel.findOne({},{"host":1,"serverL":1,"server":1,"_id":0},function(err,doc){
			if(err){
				console.log(err)
			}else{
				return res.send({
					"err":0,
					"msg":"查询成功",
					"data":doc
				});
			}
		})
	}
})
module.exports = router;
