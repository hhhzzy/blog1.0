const express = require("express");
const router =  express.Router();
const sayingModel = require("../models/saying.js");
const singleSaying = require("../models/singleSaying");
const checkLoging = require("../testfile/check.js").checkLoging;
router.get("/",function(req,res){
	singleSaying.find({},function(err,doc){
		if(err) throw err;
		return res.render("saying",{
			"err" : 0,
			"msg" : "查询成功",
			"data" : doc
		});
	})
})
router.post("/",function(req,res){
	//提交留言的时候判断是否登录
	if(!req.session.user){
		res.send({
			"err":1,
			"data":req.fields,
			"msg":"没有登录"
		})
	}else{
		var content = req.fields.content;
		var articleId = req.fields.articleId;//文章id
		var type = req.fields.type;//类型
		var sayingId = req.fields.sayingId;//留言的id
		var user = req.session.user;
		var time = (new Date()).getFullYear()+"-"+((new Date()).getMonth()+1)+"-"+(new Date()).getDate()+" "+(new Date()).getHours()+":"+(new Date()).getMinutes()+":"+(new Date()).getSeconds();
		var whereStr = {
			"content":content,
			"articleId":articleId,
			"author" : user._id
		}
		if(type == "saying"){
			//提交留言
			if(content == ""){
				return res.send({
						"err" : 1,
						"msg":"*请输入您要提交的留言"
					});
			}else{
				sayingModel.create(whereStr,function(err,doc){
				if(err) throw err;
					return res.send({
						"err" : 0,
						"data":doc,
						"msg":"提交留言成功"
					})
				})
			}
			
		}else if(type == "replay"){
			//提交回复
			if(content == ""){
				return res.send({
						"err" : 1,
						"msg":"*请输入您要提交的回复"
					})
			}else{
				sayingModel.findByIdAndUpdate(sayingId,{
					"$push":{
						"reply" : {
							"content":content,
							"author" : user.name,
							"sex" : user.sex,
							"time" : time
						}
					}
				},function(err,doc){
					if(err) throw err;
					return res.send({
						"err" : 0,
						"data":doc,
						"msg":"提交留言成功"
					})
				})
			}

		}else{
			console.log("出错了");
		}
	}
	
})
module.exports = router;
