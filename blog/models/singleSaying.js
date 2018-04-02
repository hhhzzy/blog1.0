const mongoose = require("../lib/mongo");
const Schema = mongoose.Schema;
const singleSaying = new Schema({
	content : "String",
	author : "String"
},{timestamps: {createdAt: 'created', updatedAt: 'updated'}})
module.exports = mongoose.model('singleSaying',singleSaying);