const express =  require('express');
const router = express.Router();
const learnTypeModel = require("../../../models/learnType"); 
const adminModel = require("../../../models/admin"); 
router.get('/',function(req,res){
	res.send("22222");
	
})
//总条数查询
router.post('/',function(req,res){
	learnTypeModel.find({},function(err,doc){
		if(err) throw err;
		return res.send({
			"err":0,
			"data":doc
		})
	})
})
module.exports = router;
