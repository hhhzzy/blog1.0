const express =  require('express');
const router = express.Router();
const learnModel = require("../../models/learns.js");
const sayingModel = require("../../models/saying.js");
const checkLoging = require('../../check/checkLogin.js').checkLoging;//是否登录
router.get('/',checkLoging,function(req,res){
	//批量删除
	const learnId = req.query.learnId;//传过来的id
	learnModel.remove({_id: {$in:learnId}})
			  .then(function(data){
					//删除留言
					sayingModel.remove({articleId: {$in:learnId}},function(err,doc){
						if(err){
							console.log(err);
						}else{
							res.send({
								"success":"删除成功"
							})
						}
					})
			  })
			  .catch(function(err){
			  		console.log(err);
			  })
	
})
module.exports = router;
