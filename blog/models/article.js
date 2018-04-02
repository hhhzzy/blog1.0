const mongoose = require("../lib/mongo.js");
Schema = mongoose.Schema;//创建结构
const article = new Schema({
	articleName : "String",
	abstract : "String",
	content : "String",
	openness : "String",
	newsTop : "String",
	author : "String",
	created : "String",
})
module.exports = mongoose.model('article',article);
