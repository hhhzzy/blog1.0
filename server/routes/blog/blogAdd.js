const express =  require('express');
const router = express.Router();
const blogModel = require("../../models/blog.js");
const checkLoging = require('../../check/checkLogin.js').checkLoging;//是否登录
router.get('/',checkLoging,function(req,res){
	//初始化加载数据
		blogModel.find({})
				 .sort({"timeLine.blogTime":-1})
				 .exec(function(err,doc){
					if(err){
						console.log(err);
					}else{
						if(doc != ""){
							res.render("blog/blogAdd.ejs",{
								"msg":doc[0]
							});
						}else{
							res.render("blog/blogAdd.ejs",{
								"msg":{
									"motto" : "",
									"host" : "",
									"server" : "",
									"serverL" : "",
									"timeLine" : [
										{
											"blogTime" : "",
											"timeWork" : ""
										}
									]
								}
							});
						}
					}
				 })	
})
router.post('/',checkLoging,function(req,res){
	const blogTime = req.body.blogTime;//时间线的时间
	const timeWork = req.body.timeWork;//时间线的工作
	const motto = req.body.motto;//座右铭
	const host = req.body.host;//域名
	const server = req.body.server;//服务器
	const serverL = req.body.serverL;//服务器端语言
	const type = req.body.type;//修改的类型
	const timeId = Date.parse(new Date()).toString();//时间戳
	const whereStr = {
			"timeLine" : [
				{
					"timeId":timeId,
					"blogTime" : blogTime,
					"timeWork" : timeWork
				}
			]
	}
	//判断是否为空
	if(blogTime == ""){
 		return res.send({
			"code":1,
			"msg":"请输入时间"
		});
 	}
 	if(timeWork == ""){
 		return res.send({
			"code":1,
			"msg":"请输入now work"
		});
 	}
	blogModel.count()
			 .then(function(data){
			 	return data;
			 })
			 .then(function(data){
				if(data < 1){
					blogModel.create(whereStr,function(err,doc){
						if(err){
							return res.send({
								"code":1,
								"msg":"程序错误"
							});
						}else{
							return res.send({
								"code":0,
								"msg":"新增成功",
								"data":doc
							});
						}
					});
				}else{  
					if(type == "blog"){
						blogModel.findOneAndUpdate({},{$set:{
							motto : motto,
							host : host,
							server : server,
							serverL : serverL}
						},function(err,doc){
							if(err){
								return res.send({
									"code":1,
									"msg":"程序错误"
								});
							}else{
								return res.send({
									"code":0,
									"msg":"修改博客信息成功",
									"data":doc
								});
							}
						})
					}else{
						blogModel.findOneAndUpdate({},{'$push':whereStr},function(err,doc){
							if(err){
								return res.send({
									"code":1,
									"msg":"程序错误"
								});
							}else{
								return res.send({
									"code":0,
									"msg":"新增时间线成功",
									"data":doc
								});
							}
						})
					}
				}
			 })
			 .catch(function(err){
				console.log(err);
			 })

})
module.exports = router;
