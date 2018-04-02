module.exports = function(app){
	app.get('/',function(req,res){
		res.redirect('/main')
	})
	app.use('/main',require("./main.js"));
	app.use('/register',require("./register.js")); //注册
	app.use('/mine',require("./mine.js")); //关于我们
	app.use('/learn',require("./learn.js"));//学无止境
	app.use('/learnDetail',require("./learnDetail.js"));//
	app.use('/learnFind',require("./learnFind.js"));//学无止境
	app.use('/saying',require("./saying.js"));//留言
	app.use('/singleSaying',require("./singleSaying.js"));//留言
	app.use('/articleDetail',require("./articleDetail.js"));//文章详细页
	app.use('/quit',require("./quit.js"));
	app.use('/login',require("./login.js"));
}
