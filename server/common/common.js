/*
 *   
 *   公共的后台js方法
 * 
 * 
 * */
module.exports = {
	//左侧nav的高亮
	activeUrl:function(req,res,next){
		var _path = req.path;
		res.locals.activeNav = function (nav) {
		    var result = '';
		    if (nav == _path) {
		      result = 'layui-this';
		    } else {
		      result = '';
		    }
		    return result;
		};
		next();
	},
	//左侧nav的展开
	activeNaved:function(req,res,next){
		var _path = req.path;
		res.locals.navItemed = function (nav) {
			var navLength = nav.length;
		    var result = '';
		    var subNav = _path.substr(0,navLength);
		    if (subNav == nav) {
		      result = 'layui-nav-itemed';
		    } else {
		      result = '';
		    }
		    return result;
		};
		next();
	},
}
