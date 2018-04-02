/*
 *   1.express-formidable：处理表单穿过来的数据，普通表单的数据挂载到 req.fields上面，文件挂载到req.files上面
 *     app.use(require('express-formidable'),({
 * 	      //这里面是设置的键值对
 *     }))    该方法使用express-formidable
 *   2.connect-flash:通知中间件，和session配合使用，
 *   3.模版引擎：<%  %>:运行js代码，不输出
 *            <%= <h1>hello</h1> %> : 原样输出<h1>hello</h1>
 *            <%- <h1>hello</h1> %> :输出h1字体的hello
 * 
 * 
 * */


const express = require('express');
const routes = require("./routes/index.js");
const path = require("path"); //文件模块
const config = require('config-lite')(__dirname)  //读取配置文件模块，从当前文件的目录下的config中默认读取default文件
const session = require("express-session");
const flash = require("connect-flash");  //通知中间件，配合express-session使用
const MongoStore = require("connect-mongo")(session);//把session存入mongodb中，需要结合express-session使用
const pkg = require('./package')  //引入当前文件夹的package.json文件
const app = express();
var date = require("./common/data.js");//时间格式化的方法

app.set('views', path.join(__dirname, 'views'))// 设置存放模板文件的目录
app.set('view engine', 'ejs')// 设置模板引擎为 ejs

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));//设置静态文件目录，直接用/访问public文件夹下面的内容
//console.log(session);
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

//表单处理
app.use(require('express-formidable')({  
	uploadDir:path.join(__dirname,"public/images"),//设置上传文件的位置，使用path.join连接起来，__dirname表示的是当前文件的位置
	keepExtensions:true  //是否 保留后缀，比如图片：.jpg
}))
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
	res.locals.user = req.session.user  //用户的信息
	res.locals.error = req.flash('error').toString();
  	res.locals.success = req.flash('success').toString()
	next();
})
//使用路由
routes(app);
//设置监听端口
app.listen(config.port,function(){
	console.log("port listening on port 3001");
});
