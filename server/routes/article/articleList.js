const express =  require('express');
const router = express.Router();
const articleModel = require("../../models/article"); 
const checkLoging = require('../../check/checkLogin.js').checkLoging;//是否登录
router.get('/',checkLoging,function(req,res){
	//删除当前条的数据
	if(req.query.id){
		articleModel.findByIdAndRemove(req.query.id,function(err,doc){
			if(err){
				res.send({"success":"程序错误"});
			}else{
				res.send({"success":"删除成功"});
			}
		})
	}else{
		res.render("article/articleList.ejs")
	}
	
})
//总条数查询
router.post('/',checkLoging,function(req,res){
	const page = req.body.page;//第几页
	const limit = req.body.limit;//每页显示的数量
	//分页查询
	const condition = {};//条件
	const pageSize = parseInt(limit);//每页的条数
	const nowPage = parseInt(page);//当前第几页
	const sort = {updated:-1};//排序方式
	const skipNum = (nowPage-1)*pageSize;//跳过的条数
	articleModel.find(condition)
				.skip(skipNum)
				.limit(pageSize)
				.sort(sort)
				.exec(function(err,doc){
					if(err){
						return res.send({
							"code":0,
							"msg":"程序错误"
						});
					}else{
						//查询总条数
						articleModel.count({},function(err,count){
							if(err){
								console.log(err);
							}else{
								return res.send({
									"code": 0,//状态码，0代表成功，其它失败
									"msg": "成功",
									"count":count,
									"data": doc
								});
							}
						})
						
					}
				})
})
module.exports = router;
