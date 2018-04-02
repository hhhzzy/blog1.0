const express =  require('express');
const router = express.Router();
const adminModel = require("../../models/admin.js");//用户
const addressModel = require("../../models/address");//城市
const checkLoging = require('../../check/checkLogin.js').checkLoging;//是否登录
router.get('/',checkLoging,function(req,res){
	res.render("user/userInfo.ejs");
})
router.post('/',checkLoging,function(req,res){
	const admin = req.session.admin;//登录的用户信息
	const whereStr ={"_id":req.session.admin[0]._id}
	const provice = req.body.province;//省
	const city = req.body.city;//市
	const area = req.body.area;//区/县
	const updateStr = {$set:
		{
			"realName":req.body.realName,
			"sex":req.body.sex,
			"phoneNum":req.body.phoneNum,
			"birth":req.body.birth,
			"address":req.body.province,
			"email":req.body.email,
			"evaluate":req.body.evaluate
		}
	}
	adminModel.findByIdAndUpdate(whereStr,updateStr,{"new": true },function(err,doc){
		if(err){
			req.flash("error","程序出问题了");
		    res.redirect("login");
		}else{
			delete doc.password;
			req.session.admin[0] = doc;
			req.flash("success","修改成功");
			return res.redirect("userInfo");
		}
	})
//	console.log(req.body);
})
module.exports = router;
