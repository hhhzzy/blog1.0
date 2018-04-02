

const express = require("express");
const router = express.Router();
const sha1 = require('sha1') //加密处理
const userModel = require("../models/users");
const checkNotLogin = require('../testfile/check.js').checkNotLogin;

router.get("/",checkNotLogin,function(req,res){
//	res.send("这是注册页面");
	res.render("register.ejs");
})
router.post("/",checkNotLogin,function(req,res){
	console.log(req.fields);
	
	const name = req.fields.name;
	const password = req.fields.password;
	const repassword = req.fields.repassword;
	const sex = req.fields.sex;
	//判断传过来的数据是否合法
	try{
		if(name == ""){
			throw new Error("用户名不能为空");
		}
		if(name.length < 3 || name.length > 10){
			throw new Error("用户名的字数限制在3-10位之间")
		}
		if(password == ""){
			throw new Error("密码不能为空");
		}
		if(password.length < 3 || password.length > 11){
			throw new Error("密码的字数限制在3-11位之间");
		}
		if(password != repassword){
			throw new Error("两次输入的密码不一致");
		}
		if(sex == ""){
			throw new Error("请选择性别");
		}
	}catch(err){
//		console.log(err.message);
		req.flash("error",err.message);
		return res.redirect("register");  //如果数据出错，重新回到注册页面
	}
	//密码加密
//	password = sha1(password);
	//数据合法，把数据存入数据库
	let user = new userModel({
		name:name,
		password:password,
		sex:sex
	}) 
//	let sessionUser = delete user.password;
	// 用户信息写入数据库
	user.save(function(err,suc){
		/*
		 * err.message：是返回来报的错误 
		 * */
		if (err) {
			if (err.message.match('duplicate key')) {
		        req.flash('error', '用户名已被占用')
		        return res.redirect('/register')
	        }
        }
        else {
        	/*
        	 *  suc：是最后存入数据库时的数据， 
        	 * 
        	 * */
        	//写入flash
            req.flash("success","注册成功");
        	//删除密码
        	delete suc.password;
        	req.session.user = suc; //吧注册用户的信息保存到req.session.user中

            //跳转到首页
            res.redirect("main");
        }
	})
	
})
module.exports = router;
