var express = require('express');
var router = express.Router();
const adminModel = require("../models/admin.js");
var checkNotLogin = require('../check/checkLogin.js').checkNotLogin;//已登录

router.get('/', checkNotLogin,function(req, res) {
  	res.render('login.ejs');
});
router.post('/',checkNotLogin,function(req, res) {
	    const userName = req.body.userName; //用户
	    const password = req.body.password; //密码
	    const code = req.body.code;//前台传入验证码
	    const captcha = req.session.captcha;//生成的验证码,存入了session里面
	    try{
			if(userName == ""){
				throw new Error("请输入用户名");
			}
			if(password == ""){
				throw new Error("请输入密码");
			}
			if(code == ""){
				throw new Error("请输入验证码");
			}
		}catch(err){
			req.flash("error",err.message);
			return res.redirect("login");
		}
		var  whereStr= {'name':userName,'password':password}
		adminModel.find(whereStr,function(err,suc){
			  if(err){
			   		req.flash("error","程序出问题了");
		    		res.redirect("login");
			  }else{
		  			if(suc == ""){
		  				req.flash("error","您输入的用户名或密码有误");
		    			return res.redirect("login");
		  			}
		  			else if(code != captcha){
		  				req.flash("error","您输入的验证码有误");
		    			return res.redirect("login");
		  			}else{
		  				delete suc.password;
						req.session.admin = suc;
						req.flash("success","登录成功");
						res.redirect("main");
		  			}

			  }
		})
		
});	
module.exports = router;