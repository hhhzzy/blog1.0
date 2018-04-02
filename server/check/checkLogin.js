module.exports = {
	//未登录，跳到登录页面
	checkLoging:function checkLogin(req, res, next){
		console.log(req.session.admin);
		if (!req.session.admin) {
	      req.flash('error', '未登录')  
	      return res.redirect('/login')
	    }
	    next()
	},
	//已登录，回到当前页面
	checkNotLogin:function checkNotLogin(req, res, next){
		if (req.session.admin) {
	      req.flash('error', '已登录')  
	      return res.redirect('back')
	    }
	    next()
	}
}
