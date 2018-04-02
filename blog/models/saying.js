const mongoose = require("../lib/mongo.js");
const Schema = mongoose.Schema;
const sayingsSchema = new Schema({
	content : "String",
	author : "String",
	articleId : "String",
	reply :[
		{
			content:"String",
			author : "String",
			time : "String",
		}
	],
	author : "String"
},{timestamps: {createdAt: 'created', updatedAt: 'updated'}})
module.exports = mongoose.model('sayings',sayingsSchema);
