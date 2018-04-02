const express =  require('express');
const router = express.Router();
const articleModel = require("../../../models/article"); 
router.get('/',function(req,res){
	res.send("22222");
	
})
//总条数查询
router.post('/',function(req,res){
	const num = parseInt(req.query.num);//查询的个数
	const serverIp = req.headers.host;//服务器的端口和域名，如localhost::3002
	articleModel.find({},{"articleName":1,"content":1,"abstract":1,"path":1,"created":1,"_id":1})
	            .sort({_id:"-1"})
	            .limit(num)
	            .exec(function(err,doc){
					if(err){
						return res.send({
							"code":1,
							"msg":err,
						});
					}else{
						if(doc == ""){
						    return res.send({
								"code":0,
								"msg":"未找到该数据！",
							});
						}else{
							for(var i = 0; i < doc.length; i ++){
								doc[i].path = "http://" + serverIp + "/" +doc[i].path;
							}
							return res.send(JSON.stringify({
								"code":0,
								"msg":doc,
							}));
						}
					}
			
				})
})
module.exports = router;
