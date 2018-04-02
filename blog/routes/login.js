const express = require("express");
const router = express.Router();
const checkNotLogin = require('../testfile/check.js').checkNotLogin;
const userModel = require("../models/users.js");
router.get('/',checkNotLogin,function(req,res){
//	res.send("这是登录页面");
	res.render("login");
})
router.post("/",checkNotLogin,function(req,res){
	const name = req.fields.name;
	const password = req.fields.password;
	try{
		if(name == ""){
			throw new Error("请输入用户名");
		}
		if(password == ""){
			throw new Error("请输入密码");
		}
	}catch(err){
		req.flash("error",err.message);
		return res.redirect("login");
	}
	var whereStr = {"name":name,"password":password}
	userModel.find(whereStr,function(err,suc){
		if(err){
			req.flash("err","您输入的用户名或密码有误");
		    res.redirect("login");
		}else{
			if(suc == ""){
  				req.flash("error","您输入的用户名或密码有误");
    			return res.redirect("login");
  			}
  			else{
  				delete suc.password;
				req.session.user = suc[0];
				req.flash("success","登录成功");
				res.redirect("main");
  			}
		}
	})
})
module.exports = router;