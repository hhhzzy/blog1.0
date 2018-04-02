const express =  require('express');
const router = express.Router();
const articleModel = require("../../models/article.js");
const checkLoging = require('../../check/checkLogin.js').checkLoging;//是否登录
router.get('/',checkLoging,function(req,res){
	//批量删除
	const articleId = req.query.articleId;//传过来的id
	articleModel.remove({_id: {$in:articleId} },function(err,doc){
		if(err){
			console.log(err);
		}else{
			res.send({
				"success":"删除成功"
			})
		}
	})
})
module.exports = router;
