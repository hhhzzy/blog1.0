const mongoose = require("../lib/mongo.js");
Schema = mongoose.Schema;   //创建结构
var adminSchema = new Schema({     // 
    name : { type: String ,required:true},                    //用户账号
    password: {type: String},//密码
    icon : {type: String},//头像
    realName : {type: String}, //真实姓名
    phoneNum : {type: String},  //电话号码
    birth : {type: String},  //出生日期
    address : {type: String}, //地址
    sex : {type: String}, //地址
    email : {type: String}, //邮箱
    evaluate : {type: String} //评价
},{timestamps: {createdAt: 'created', updatedAt: 'updated'}});  //内置时间戳，创建时间和修改时间
module.exports = mongoose.model('Admin',adminSchema); //创建model