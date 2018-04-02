var moment = require("moment");//日期格式化时间
exports.dateFormat = function (type,date) {
  var date = new Date(date);
  if(type == "ymd"){
  	return moment(date).format('YYYY-MM-DD');
  }else if(type == "y"){
  	return moment(date).format('YYYY');
  }else if(type == "ymdhms"){
  	return moment(date).format('YYYY-MM-DD h:mm:ss a');
  }
}