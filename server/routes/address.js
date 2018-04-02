/*
 *  省市县数据接口，返回的是数组对象：[{code: "11", name: "北京市", childs: Array(1)},{code: "12", name: "天津市", childs: Array(1)}.....] 
 * 
 * */
const express =  require('express');
const router = express.Router();
const addressModel = require("../models/address");
const checkLoging = require('../check/checkLogin.js').checkLoging;//是否登录
router.get('/',checkLoging,function(req,res){
	addressModel.find({},"-_id",function(err,suc){
		if(err){
			res.send("err");
		}else{
			res.send(suc[0].address);
		}
	})
	
})
router.post('/',checkLoging,function(req,res){
	addressModel.find({},"-_id",function(err,suc){
		if(err){
			res.send("err");
		}else{
			res.send(suc[0].address);
		}
	})
})
module.exports = router;
