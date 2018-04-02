const mongoose = require("../lib/mongo.js");
Schema = mongoose.Schema;
const blogSchema = new Schema({
	motto:"String",//座右铭
	timeLine:[
		{
			timeId:"String",
			blogTime:"Date",
			timeWork:"String"
		}
	],//时间线
	host:"String",//域名
	server:"String",//服务器
	serverL:[]//服务器语言
},{timestamps: {createdAt: 'created', updatedAt: 'updated'}});
module.exports = mongoose.model('blog',blogSchema);
