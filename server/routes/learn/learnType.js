const express =  require('express');
const router = express.Router();
const learnTypeModel = require("../../models/learnType.js");
const checkLoging = require('../../check/checkLogin.js').checkLoging;//是否登录
router.get('/',checkLoging,function(req,res){
	//初始化加载数据
	res.send("55545");
})
router.post('/',checkLoging,function(req,res){
	console.log(req.body);
	const type = req.body.type;//内容
	if(type.length <= 0){
		return res.send({
			"err":0,
			"msg":"请输入文章分类"
		})
	}
	learnTypeModel.count({content:type})
				  .then(function(data){
				  		if(data > 0){
				  			return res.send({
								"err":0,
								"msg":"改文章分类已经添加了"
							})
				  		}else{
				  			learnTypeModel.create({content:type},function(err,doc){
								if(err){
									return res.send({
										"err":1,
										"msg":"程序错误"
									})
								}else{
									return res.send({
										"err":0,
										"msg":"新增成功"
									})
								}
							})
				  		}
				  })
				  .catch(function(err){
				  		return res.send({
							"err":1,
							"msg":"程序错误"
						})
				  })
	
})
module.exports = router;
