const express =  require('express');
const router = express.Router();
var checkLoging = require('../check/checkLogin.js').checkLoging;//是否登录
router.get('/',checkLoging,function(req,res){
	//清除session
	req.session.admin = null;
	req.flash('error', '登出成功');
	res.redirect("/login");//退出之后回到登录页面
})
module.exports = router;
