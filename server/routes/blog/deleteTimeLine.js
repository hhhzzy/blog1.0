const express =  require('express');
const router = express.Router();
const blogModel = require("../../models/blog.js");
const checkLoging = require('../../check/checkLogin.js').checkLoging;//是否登录
router.get('/',checkLoging,function(req,res){
	//删除
	blogModel.findOneAndUpdate({},{'$pull':{"timeLine":{"timeId":req.query.id}}},function(err,doc){
		if(err){
			console.log(err)
		}else{
			req.flash("success","删除成功！");
			return res.redirect("blogAdd");
		}
	})
})
module.exports = router;
