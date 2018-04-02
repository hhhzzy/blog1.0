const express =  require('express');
const router = express.Router();
const learnModel = require("../../models/learns.js");
const learnTypeModel = require("../../models/learnType.js");
const checkLoging = require('../../check/checkLogin.js').checkLoging;//是否登录
const fs = require("fs");
router.get('/',checkLoging,function(req,res){
	//初始化加载数据
	if(req.query.id){
		learnTypeModel.find({})
					 .then(function(data){
						learnModel.find({"_id":req.query.id})
										 .exec(function(err,doc){
											if(err){
												console.log(err);
											}else{
												if(doc != ""){
													res.render("learn/learnAdd.ejs",{
														"msg":doc[0],
														"type":data
													});
												}
											}
										 })	
					 })
					 .catch(function(err){
					 	console.log(err);
					 })
		
	}else{
		learnTypeModel.find({})
					 .exec(function(err,doc){
						if(err){
							console.log(err);
						}else{
							res.render("learn/learnAdd.ejs",{
								"msg":"",
								"type":doc
							});
						}
					 })	
	}
	
})
router.post('/',checkLoging,function(req,res){
	const title = req.body.title;
	const content = req.body.content; //文章内容
	const articleTag = req.body.articleTag; //文章标签
	const articleType = req.body.articleType; //文章分类
	const openness = req.body.openness; //浏览权限
	const source = req.body.source; //文章来源
	const id = req.body.id;
	var abstract = req.body.abstract;
	const whereStr = {
		title : title,
		type : articleType,
		tag : articleTag,
		content : content,
		abstract : abstract,
		source : source,
		openness : openness,
		belong : '文章'
	}
	console.log(req.body)
	if(id != ""){//修改信息
		learnModel.findByIdAndUpdate(id,{$set:whereStr},function(err,doc){
			if(err){
				return res.send({
					"code":0,
					"msg":"程序错误"
				});
			}else{
				req.flash("success","修改成功");
				return res.send({
					"err":0,
					"msg":"修改成功",
					"url":"/learnList"
				});
			}
		})
	}else{
		learnModel.create(whereStr,function(err,doc){
			if(err){
				return res.send({
					"err":1,
					"msg":"程序错误"
				})
			}else{
				req.flash("success","添加成功");
				return res.send({
					"err":0,
					"msg":"新增成功",
					"url":"/learnList"
				})
			}
		})
	}

})
module.exports = router;
