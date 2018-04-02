const express = require("express");
const router =  express.Router();
const checkLoging = require("../testfile/check.js").checkLoging;
const learnModel = require("../models/learns.js");
router.get("/",function(req,res){
	res.render("learn");
})
router.post("/",function(req,res){
	
})
module.exports = router;
