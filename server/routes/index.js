module.exports = function(app){
	app.get('/',function(req,res){
		res.redirect("main")
	})
	app.use('/main',require("./main.js"));//首页
	app.use('/login',require("./login.js"));  //登录
	app.use('/quit',require("./quit.js"));  //退出
	app.use('/articleList',require("./article/articleList.js"));  //文章列表
	app.use('/articleAdd',require("./article/articleAdd.js"));  //文章详细也
	app.use('/articleDelete',require("./article/articleDelete.js"));  //文章删除
	app.use('/articleUpdate',require("./article/articleUpdate.js"));  //文章修改
	app.use('/articleImgUpload',require("./article/articleImgUpload.js"));  //文章图片上传
	app.use('/blogAdd',require("./blog/blogAdd.js"));  //博客信息修改
	app.use('/updateTimeLine',require("./blog/updateTimeLine.js"));  //博客时间线修改
	app.use('/deleteTimeLine',require("./blog/deleteTimeLine.js"));  //博客时间线删除
	//文章
	app.use('/learnAdd',require("./learn/learnAdd.js"));  //学无止境
	app.use('/learnList',require("./learn/learnList.js")); 
	app.use('/learnType',require("./learn/learnType.js"));  //博客类型
	app.use('/learnImg',require("./learn/learnImg.js"));  //图片上传
	app.use('/learnDelete',require("./learn/learnDelete.js"));  //图片上传
	app.use('/learnTypeEdit',require("./learn/learnTypeEdit.js"));  //博客类型编辑
	//用户
	app.use('/userInfo',require("./user/userInfo.js"));  //用户信息页面
	app.use('/captcha',require("./captcha.js")); //验证码
	app.use('/imgUpload',require("./img/imgUpload.js")); //头像上传
	app.use('/address',require("./address.js")); //城市数据
	/*
	 * 
	 *   
	 * 接口
	 * 
	 * 
	 * 
	 * */
	app.use('/api/article',require("./api/article/article.js"));  //文章列表
	app.use('/api/blog',require("./api/blog/blog.js"));  //关于我们
	app.use('/api/articleDetail',require("./api/article/articleDetail.js"));  //文章详细页查询
	//文章类型
	app.use('/api/learn/learnType',require("./api/learn/learnType.js"));  //文章类型
	app.use('/api/learn/learn',require("./api/learn/learn.js"));  //文章
}

