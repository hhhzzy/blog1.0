const mongoose = require("../lib/mongo.js");
Schema = mongoose.Schema;//创建结构
const learn = new Schema({
	title : "String",
	keywords : "String",
	content : "String",
	openness : "String",
	type : "String",
	pv : {type : "String",default : true},
	author : "String",
	created : "String",
})
module.exports = mongoose.model('learn',learn);
