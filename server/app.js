var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');//表单处理模块
var session = require("express-session");  //session
var flash = require("connect-flash");//提示中间件，和express-session联合使用
var config = require('config-lite')(__dirname)  //读取配置文件模块，从当前文件的目录下的config中默认读取default文件
var MongoStore = require("connect-mongo")(session);//把session存入mongodb中，需要结合express-session使用
var cors = require('cors');//跨域模块
var pkg = require('./package');  //引入当前文件夹的package.json文件
var date = require("./common/data.js");//时间格式化的方法
//公用的js方法
var common = require("./common/common");
//路由
var routes = require("./routes/index.js");

var app = express();
//app.use(cors());//跨域模块
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");//设置允许跨域的域名
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
//公用js的，侧边导航高亮
app.use(common.activeUrl);
//公用js的，侧边导航展开
app.use(common.activeNaved);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//设置静态文件夹目录
app.use(express.static(path.join(__dirname, 'public'))); 
//设置模版引擎ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// session 中间件
app.use(session({   //用app.use('/')，把session挂载到根路由中，以后的所有路由都可以访问该session
	name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
	secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
	resave: true, // 强制更新 session
	saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
	cookie: {
	    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
	},
	store: new MongoStore({// 将 session 存储到 mongodb
	    url: config.mongodb// mongodb 地址
	})
}))

//通知中间价
app.use(flash());

// 设置模板全局常量，从package.json读取信息
app.locals.blog = {
	title: pkg.name,
  	description: pkg.description
}
/*
 * 
 * 设置格式化时间 
 * 格式为： 
 * dateFormat("ymd",data) => YYYY-MM-DD
 * dateFormat("ymdhms",data) => YYYY-MM-DD h:mm:ss a
 * dateFormat("y",data) => YYYY
 * 
 * */
app.locals.dateFormat = date.dateFormat;
//吧提示的信息挂载到res.locals对象上面，那么在模版里面就可以直接使用在这个对象上面的数据
app.use(function(req,res,next){
	res.locals.admin = req.session.admin  //管理员的信息
	res.locals.error = req.flash('error').toString();
  res.locals.success = req.flash('success').toString();
	next();
})



routes(app);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
