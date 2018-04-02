var express = require('express');
var router = express.Router();
const svgCaptcha = require('svg-captcha'); //验证码
router.get('/', function(req, res) {
	var captcha = svgCaptcha.create({
		background: '#cc9966'
	});
	req.session.captcha = captcha.text.toLowerCase(); //存入session时，吧验证码变成小写，不区分大小写
	var codeData = {
        img:captcha.data
   }
	//  res.send(codeData);
	res.type('svg');
	res.status(200).send(captcha.data);
});
module.exports = router;