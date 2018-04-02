const express =  require('express');
const router = express.Router();
const articleModel = require("../../models/article.js");
const checkLoging = require('../../check/checkLogin.js').checkLoging;//是否登录
router.get('/',checkLoging,function(req,res){
	//是否置顶修改
	console.log(req.query.id);
	const id = req.query.id;//id
	const val = req.query.val == "true"?"checked":"unchecked";//值
	if(id){
		const whereStr = {
			$set:{
				newsTop:val
			}
		}
		articleModel.findByIdAndUpdate(id,whereStr,function(err,doc){
			if(err){
				return res.send({
					"err":1,
					"msg":"没找到该条数据！"
				})
			}else{
				return res.send({
					"err":0,
					"msg":"修改成功！"
				});
			}
		})
	}else{
		
		return res.send({
			"msg":"没有该数据"
		});
	}
})
module.exports = router;
