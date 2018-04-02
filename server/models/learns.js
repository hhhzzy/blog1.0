const mongoose = require("../lib/mongo.js");
Schema = mongoose.Schema;//创建结构
const learn = new Schema({
	title : "String",
	tag : [], //文章标签
	content : "String",
	abstract : "String",
	type : [], //文章类型
	pv : {type : "String",default : true},//点击量
	source : "String", //文章来源
	openness : "String",//浏览权限
	author : "String",
	belong : "String",  //文章所属
},{timestamps: {createdAt: 'created', updatedAt: 'updated'}})
module.exports = mongoose.model('learn',learn);
