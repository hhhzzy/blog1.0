const express =  require('express');
const router = express.Router();
const multer = require("../../common/multer.js");//文件上传
const adminModel = require("../../models/admin.js");//用户信息
const checkLoging = require('../../check/checkLogin.js').checkLoging;//是否登录
//multer有single()中的名称必须是表单上传字段的name名称。
const upload = multer.single('file'); 

router.get('/',checkLoging,function(req,res){
	res.send("111111");
})
/*
 *   req.file:上传的文件信息
 * 	 req.body:表单中的文本数据
 *   在字段前面加上-可以不查询出该字段
 *   不加则是只查询出该字段
 * */
router.post("/",upload,function(req,res,next) {
	
  /* console.log(req.file); req.file 是 `logo` 文件的信息*/
    /* console.log(req.body); req.body 保存表单文本域数据, 如果存在的话*/
    const _id =  req.session.admin[0]._id;//管理员的id
    const icon = "upload/"+req.file.filename; //上传的头像地址
    const whereStr = {"_id":_id};//$exists:判断是否有这个字段
    const updateStr = { $set:{"icon":icon}}
    adminModel.findByIdAndUpdate(whereStr,updateStr,{"new": true },function(err,suc){
    	if(err){
    		req.flash("error","程序有误");
    		res.redirect("userInfo");
    	}else{
			delete suc.password;
			req.session.admin[0] = suc;
      		res.send({
      			"code":"1",
		    	"success":"成功",
		    	"icon":icon,
		    });
    	}
    });

});

module.exports = router;