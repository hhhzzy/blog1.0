const express =  require('express');
const router = express.Router();
const learnTypeModel = require("../../models/learnType.js");
const checkLoging = require('../../check/checkLogin.js').checkLoging;//是否登录
router.get('/',checkLoging,function(req,res){
	//初始化加载数据
	console.log();
	if(req.query.id == ""){
		return res.send({
			"err":0,
			"msg":"没有找到改文章分类"
		})
	}
	learnTypeModel.findByIdAndRemove({_id:req.query.id},function(err,doc){
		if(err){
			return res.send({
				"err":1,
				"msg":"程序错误"
			})
		}else{
			return res.send({
				"err":0,
				"msg":"删除成功"
			})
		}
	})
})
router.post('/',checkLoging,function(req,res){
	console.log(req.body)
	const id = req.body.id;
	const type = req.body.type;
	learnTypeModel.findByIdAndUpdate({_id:id},{content:type},function(err,doc){
		if(err){
			return res.send({
				"err":1,
				"msg":"程序错误"
			})
		}else{
			return res.send({
				"err":0,
				"msg":"修改成功"
			})
		}
	})
})
module.exports = router;
