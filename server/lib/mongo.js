//链接数据库
const config = require('config-lite')(__dirname);//读取config文件夹下面的default.js里面的数据
const mongoose = require("./base.js");
mongoose.connect(config.mongodb);
/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + config.mongodb);  
});    

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});    
 
/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
}); 
module.exports = mongoose;