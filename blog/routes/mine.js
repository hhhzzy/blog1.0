const express = require("express");
const router =  express.Router();
const checkLoging = require("../testfile/check.js").checkLoging;
router.get("/",checkLoging,function(req,res){
	res.render("mine");
})
router.post("/",checkLoging,function(req,res){
	
})
module.exports = router;
