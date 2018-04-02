	layui.use(['form','layer','layedit','laydate','upload'],function(){
			    var form = layui.form
			        layer = parent.layer === undefined ? layui.layer : top.layer,
			        laypage = layui.laypage,
			        upload = layui.upload,
			        layedit = layui.layedit,
			        laydate = layui.laydate,
			        $ = layui.jquery;
			
			  
				//创建一个编辑器
			    var editIndex = layedit.build('news_content',{
			        height : 535,
			        uploadImage : {
			            url : "../../json/newsImg.json"
			        }
			    });
			    //格式化时间
			    function filterTime(val){
			        if(val < 10){
			            return "0" + val;
			        }else{
			            return val;
			        }
			    }
			    //定时发布
			    var time = new Date();
			    var submitTime = time.getFullYear()+'-'+filterTime(time.getMonth()+1)+'-'+filterTime(time.getDate())+' '+filterTime(time.getHours())+':'+filterTime(time.getMinutes())+':'+filterTime(time.getSeconds());
			    laydate.render({
			        elem: '#release',
			        type: 'datetime',
			        trigger : "click",
			        done : function(value, date, endDate){
			            submitTime = value;
			        }
			    });
			    form.on("radio(release)",function(data){
			        if(data.elem.title == "定时发布"){
			            $(".releaseDate").removeClass("layui-hide");
			            $(".releaseDate #release").attr("lay-verify","required");
			        }else{
			            $(".releaseDate").addClass("layui-hide");
			            $(".releaseDate #release").removeAttr("lay-verify");
			            submitTime = time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+' '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
			        }
			    });
			    form.verify({
			        articleName : function(val){
			            if(val == ''){
			                return "文章标题不能为空";
			            }
			        },
			        content : function(val){
			        	//把富文本编辑器的内容赋值到textarea中
			   			return layedit.sync(editIndex);
			        }
			    })

			    form.on("submit(addArticle)",function(data){
			    	//判断类型，是新增，还是修改
			        //截取文章内容中的一部分文字放入文章摘要
			        var abstract = layedit.getText(editIndex).substring(0,50);
			        //摘要，如果自己输入就用自己输入的摘要，如果没有输入就截取文章的前面50个字符
			        abstract = $(".abstract").val() ? $(".abstract").val() : abstract;
			        //弹出loading
			        var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
			        // 实际使用时的提交信息
			        $.post("/articleAdd",{
			        	 id:GetQueryString("id"),
			             articleName : $(".articleName").val(),  //文章标题
			             abstract :abstract,  //文章摘要
			             content : layedit.getContent(editIndex).split('<audio controls="controls" style="display: none;"></audio>')[0],  //文章内容
//			             classify : '1',    //文章分类
//			             newsStatus : $('.newsStatus select').val(),    //发布状态
						 openness : $(".openness input:checked").val(), //浏览权限
			             newsTime : submitTime,    //发布时间
			             newsTop : data.field.newsTop == "on" ? "checked" : "unckecked",    //是否置顶
			        },function(res){
			        	layer.close(index);//关闭提交数据弹出层
			        	if(res.code == "0"){//新增失败
			        		layer.open({
								title: '提示信息',
								content: res.msg
							}); 
			        	}else if(res.code == "1"){//新增成功
			        		/*
			        		 * 按浏览器回退键时候会出现问题 
			        		 * */
							window.location.href = res.url;
			        	}
			        },"json")
			    })
			    //预览
			    form.on("submit(look)",function(){
			        layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行文章内容页面访问");
			        return false;
			    })
				 //上传缩略图
			    upload.render({
			        elem: '.thumbBox',
			        url: '/articleImgUpload',
        			method : "post", 
        			data:{
        				id:$(".thumbImg").attr("id")
        			},
			        done: function(res, index, upload){
						if(res.err == "0"){
							$(".thumbImg").attr("src",res.msg.path);
							layer.open({
								title: '提示信息',
								content: res.msg.success
							}); 
						}else{
							layer.open({
								title: '提示信息',
								content: res.msg
							}); 
						}
			        }
			    });
			
			})
//获取地址栏的参数
function GetQueryString(name)
{
　　var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
　　var r = window.location.search.substr(1).match(reg);
　　if(r!=null) return unescape(r[2]);
   return null;
}
		