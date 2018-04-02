/*
 * 
 *   文件上传
 *   
 *   
 * 
 * 
 * */
var multer = require('multer');
var fs = require('fs');
//创建文件夹
var createFolder = function(folder){
    try{
        fs.accessSync(folder); //判断用户是否有权限操作文件夹或者是目录文件
    }catch(e){
        fs.mkdirSync(folder);
    }  
};

//上传文件夹路径
var uploadFolder = 'public/upload/';
//创建文件夹
createFolder(uploadFolder);
//
var storage = multer.diskStorage({
     	//设置上传后文件路径，uploads文件夹会自动创建。
        destination: function (req, file, cb) {
	        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
	    },
     	//给上传文件重命名，获取添加后缀名
      	filename: function (req, file, cb) {
	        var fileFormat = (file.originalname).split(".");
	        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
      	}
});  
//添加配置文件到muler对象。
var upload = multer({
    storage: storage
});
    
//如需其他设置，请参考multer的limits,使用方法如下。
//var upload = multer({
//    storage: storage,
//    limits:{}
//});
  
 //导出对象
module.exports = upload;