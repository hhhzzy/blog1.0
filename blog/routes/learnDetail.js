const express = require("express");
const router = express.Router();
const learn = require("../models/learns.js");
router.get("/",function(req,res){
	if(req.query.id){
		learn.find({_id:req.query.id},function(err,doc){
			if(err){
				console.log(err)
			}else{
				return res.render("learnDetail.ejs",{
					"err":0,
					"data":doc
				});
			}
		})
	}else{
		return res.render("learn.ejs");
	}
})
router.post("/",function(req,res){
	learn.find({_id:req.fields.id},function(err,doc){
		if(err){
			console.log(err)
		}else{
			return res.send({
				"err":0,
				"data":doc
			});
		}
		
	})

})
module.exports = router;
