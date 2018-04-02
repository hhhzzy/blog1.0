const mongoose = require("../lib/mongo.js");
Schema = mongoose.Schema;//创建一个结构
var articleSchema = new Schema({
	articleName:"String",
	abstract:"String",
	content:"String",
	img:"String",
	openness:"String",//浏览权限
	newsTop:"String",//是否置顶,
	author:"String",
	path:"String" //文章图片的地址
},{timestamps: {createdAt: 'created', updatedAt: 'updated'}});
module.exports = mongoose.model('Article',articleSchema);
