const mongoose = require("../lib/mongo.js");
Schema = mongoose.Schema;   //创建结构
var user = new Schema({     // 
    name : { type: String ,required:true},                    //用户账号
    password: {type: String},                        //密码
    sex: {type: Array,lowercase:true},                        //性别
});
user.index({ name: 1 }, { unique: true });// 表示 建立了按name正序排列的索引，并且不能重复
module.exports = mongoose.model('User',user); //创建model