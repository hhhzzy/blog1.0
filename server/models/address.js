/*
 *  城市数据模型 
 * 
 * */
const mongoose = require("../lib/mongo.js");//链接数据库
const Schema = mongoose.Schema;
const addressSchema = new Schema({
	address:{
		name:String,
	}
})
module.exports = mongoose.model("Address",addressSchema,"address");
