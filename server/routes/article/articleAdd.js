const express =  require('express');
const router = express.Router();
const articleModel = require("../../models/article.js");
const checkLoging = require('../../check/checkLogin.js').checkLoging;//是否登录
router.get('/',checkLoging,function(req,res){
	//初始化加载数据
	if(req.query.id){
		articleModel.find({"_id":req.query.id},function(err,doc){
			if(err){
				console.log(err);
			}else{
				res.render("article/articleAdd.ejs",{
					"msg":doc[0]
				});
			}
		})
	}else{
		res.render("article/articleAdd.ejs",{"msg":""});
	}
	
})
router.post('/',checkLoging,function(req,res){
	/*
	 *    如果id不为空的话就是修改，如果id为空的话就是新增
	 *   
	 * */
	var id = req.body.id;
	var articleName = req.body.articleName;//文章标题
	var abstract = req.body.abstract;//文章摘要
	var content = req.body.content;//文章内容
	var openness = req.body.openness;//浏览权限
	var newsTop = req.body.newsTop;//是否置顶
	var realName = req.session.admin[0].realName;
	var whereStr = {
			articleName:articleName,
			abstract:abstract,
			content:content,
			openness:openness,
			newsTop:newsTop,
			author:realName
	}
	try{
		if(articleName == ""){
			throw new Error("请输入文章标题");
		}
		if(openness == ""){
			throw new Error("请选择浏览权限");
		}
	}catch(err){
		//返回结果
		return res.send({
			"code":0,
			"msg":err.message
		});
	}
	if(id != ""){//修改信息
		articleModel.findByIdAndUpdate(id,{$set:whereStr},function(err,doc){
			if(err){
				return res.send({
					"code":0,
					"msg":"程序错误"
				});
			}else{
				req.flash("success","修改成功");
				return res.send({
					"code":1,
					"msg":"添加成功",
					"url":"/articleList"
				});
			}
		})
	}else{//新增信息
		articleModel.create(whereStr,function(err,doc){
			if(err){
				return res.send({
					"code":0,
					"msg":"程序错误"
				});
			}else{
				req.flash("success","添加成功");
				return res.send({
					"code":1,
					"msg":"添加成功",
					"url":"/articleList"
				});
			}
		})
	}


})
module.exports = router;
