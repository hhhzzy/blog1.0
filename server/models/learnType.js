const mongoose = require("../lib/mongo.js");
Schema = mongoose.Schema;//创建结构
const learnType = new Schema({
	content : "String",
	created : "String",
})
module.exports = mongoose.model('learnType',learnType);
