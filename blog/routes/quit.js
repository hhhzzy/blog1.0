const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
//	res.send("这是退出登录页面")
	req.session.user = null;
	req.flash('success', '登出成功');
	res.redirect("main");
})

module.exports = router;
