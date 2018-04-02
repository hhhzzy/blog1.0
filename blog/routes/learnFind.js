const express = require("express");
const router = express.Router();
const saying = require("../models/saying.js");
const users = require("../models/users.js");
router.get("/",function(req,res){
	return res.render("5555");
})
router.post("/",function(req,res){
	saying.find({"articleId":req.fields.id})
		  .then(function(data){
		  		users.find({})
		  			 .exec(function(err,doc){
		  			 	return res.send({
							"err":0,
							"data":{
								"content":data,
								"author":doc[0].name,
								 "sex" : doc[0].sex,
							}
						});
		  			 })
		  })
		  .catch(function(err){
				console.log(err);
		  })

})
module.exports = router;
