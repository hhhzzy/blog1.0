const express =  require('express');
const router = express.Router();
const blogModel = require("../../models/blog.js");
const checkLoging = require('../../check/checkLogin.js').checkLoging;//是否登录
router.get('/',checkLoging,function(req,res){
	res.send("哈哈哈");
})
router.post('/',checkLoging,function(req,res){
	const blogTime = req.body.blogTime;//时间线的时间
	const timeWork = req.body.timeWork;//时间线的工作
	const timeId = req.body.timeId;//时间线的id
	const whereStr = {
			timeLine : [
				{
					blogTime : blogTime,
					timeWork : timeWork
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
	blogModel.findOneAndUpdate({"timeLine.timeId":timeId},{$set:{"timeLine.$.blogTime":blogTime,"timeLine.$.timeWork":timeWork}},function(err,doc){
						if(err){
							return res.send({
								"code":1,
								"msg":"程序错误"
							});
						}else{
							return res.send({
								"code":0,
								"msg":"修改成功",
								"data":doc
							});
						}
					})

})
module.exports = router;
