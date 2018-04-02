const express =  require('express');
const router = express.Router();
const multer = require("../../common/multer.js");//文件上传
const learnModel = require("../../models/learns.js");//用户信息
const checkLoging = require('../../check/checkLogin.js').checkLoging;//是否登录
//上传的图片
const upload = multer.array('file',5);
router.get('/',checkLoging,function(req,res){
	res.send("85888");
})
router.post("/",upload,checkLoging,function(req,res){
	const serverIp = req.headers.host;//服务器的端口和域名，如localhost::3002
    const icon = "http://"+serverIp+"/upload/"+req.files[0].filename; //上传的头像地址
	res.send({
		"code": 0 //0表示成功，其它失败
		,"data": {
		    "src": icon
		}
	})
	
})
module.exports = router;