const express =  require('express');
const router = express.Router();
const learnModel = require("../../../models/learns"); 
const adminModel = require("../../../models/admin"); 
router.get('/',function(req,res){
	res.send("22222");
	
})
//总条数查询
router.post('/',function(req,res){
	learnModel.find({})
			  .limit(10)
			  .exec(function(err,doc){
					if(err) throw err;
					return res.send({
						"err":0,
						"data":doc
					})
		      })
})
module.exports = router;
