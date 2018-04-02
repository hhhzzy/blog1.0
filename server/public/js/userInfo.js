var form, $,areaData;
layui.config({
    base : "../../js/"
}).extend({
    "address" : "address"
})
layui.use(['form','layer','upload','laydate',"address"],function(){
    form = layui.form;
    $ = layui.jquery;
    var layer = parent.layer === undefined ? layui.layer : top.layer,
        upload = layui.upload,
        laydate = layui.laydate,
        address = layui.address;
    //上传头像
    upload.render({
        elem: '.userFaceBtn',
        url: '/imgUpload',//接口
        method : "post",  
        done: function(res, index, upload){
            $('#userFace').attr('src',res.icon);
        }
    });

    //添加验证规则
    form.verify({
        userBirthday : function(value){
            if(!/^(\d{4})[\u4e00-\u9fa5]|[-\/](\d{1}|0\d{1}|1[0-2])([\u4e00-\u9fa5]|[-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/.test(value)){
                return "出生日期格式不正确！";
            }
        }
    })
    //选择出生日期
    laydate.render({
        elem: '.userBirthday',
        format: 'yyyy年MM月dd日',
        trigger: 'click',
        max : 0,
        mark : {"0-06-10":"生日"},
        done: function(value, date){
            if(date.month === 12 && date.date === 15){ //点击每年6月10日，弹出提示语
                layer.msg('今天是我的生日');
            }
        }
    });
    //获取省信息
    // address.provinces();
    //提交个人资料
    form.on("submit(changeUser)",function(data){
        var index = layer.msg('提交中，请稍候',{icon: 16,time:false,shade:0.8});
        //将填写的用户信息存到session以便下次调取
        var key,userInfoHtml = '';
//      userInfoHtml = {
//          'realName' : $(".realName").val(),
//          'sex' : data.field.sex,
//          'userPhone' : $(".userPhone").val(),
//          'userBirthday' : $(".userBirthday").val(),
//          'province' : data.field.province,
//          'city' : data.field.city,
//          'area' : data.field.area,
//          'userEmail' : $(".userEmail").val(),
//          'myself' : $(".myself").val()
//      };
        for(key in data.field){
            if(key.indexOf("like") != -1){
                userInfoHtml[key] = "on";
            }
        }
    })
//
//  //修改密码
//  form.on("submit(changePwd)",function(data){
//      var index = layer.msg('提交中，请稍候',{icon: 16,time:false,shade:0.8});
//      setTimeout(function(){
//          layer.close(index);
//          layer.msg("密码修改成功！");
//          $(".pwd").val('');
//      },2000);
//      return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
//  })
    
})