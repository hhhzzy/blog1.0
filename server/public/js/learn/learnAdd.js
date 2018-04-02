	layui.use(['form','layer','layedit','laydate','upload'],function(){
			    var form = layui.form
			        layer = parent.layer === undefined ? layui.layer : top.layer,
			        laypage = layui.laypage,
			        upload = layui.upload,
			        layedit = layui.layedit,
			        laydate = layui.laydate,
			        $ = layui.jquery;
			
			  
				//创建一个编辑器
			    var editIndex = layedit.build('motto_content',{
			        height : 400,
			        uploadImage : {
			            url : "/learnImg"
			        }
			    });
			    form.verify({
			        motto : function(val){
			        	//把富文本编辑器的内容赋值到textarea中
			   			return layedit.sync(editIndex);
			        },
			       
			    })
			    //时间
			    laydate.render({
			        elem: '#blogTime',
			        theme: '#393D49',
			        trigger : "click"
			    });
			     //新增文章标签
			    $(".add-tag").click(function(){
			    	if($(this).siblings().length > 3){
			    		layer.msg("最多只能添加4个标签");
			    		return;
			    	}else{
			    		var div =  $("<div class='layui-input-inline' style='width:100px;'></div>");
				    	var input = $("<input class='layui-input' type='text' value='' />");
				    	var p = $("<p>x</p>");
				    	div.append(input);
				    	div.append(p);
				    	$(".article-tag").prepend(div);
			    	}
			    })
			    //删除文章标签
			    $(".article-tag").on('click',".layui-input-inline p",function(){
			    	$(this).parent().remove();
			    })
			    //文章类型新增
			    form.on("submit(addLearnType)",function(data){
			    	//验证
			    	if($(".type").val().length <= 0){
			    		layer.msg("请填入文章分类");
			    		return false;
			    	}
			        // 实际使用时的提交信息
			        $.post("/learnType",{
			             type : $(".type").val(),  //分类
			        },function(res){
			        	layer.open({
							  title: '提示信息',
							  content: res.msg,
							  end:function(){
							  	window.location.reload();
							  }
							  
						}); 
			        },"json")
			    })
			    //删除文章类型
			    $(".learnTypeDel").click(function(){
			    	var id = $(this).attr("id");
			    	layer.open({
						  title: '提示信息',
						  content: '确定要删除改文章分类吗？',
						  end:function(){
						  		$.get('/learnTypeEdit',{id:id},function(data){
						  			layer.open({
										  title: '提示信息',
										  content: data.msg,
										  end:function(){
										  	window.location.reload();
										  }
									}); 
						  		})
						  }
					}); 
			    })
			    //编辑文章类型
			    $(".learnTypeUpt").click(function(){
			    	var id = $(this).attr("id");
			    	var type = $(this).siblings(".type-ipt").attr("title");
			    	layer.open({
						  type: 1,
						  area: ['400px', '200px'],
					      shadeClose: true, //点击遮罩关闭
					      content: '<form method="post"><div class="layui-form-item magt3 magr10"><label class="layui-form-label">文章类型</label><div class="layui-input-block"><input placeholder="文章类型" value='+type+' type="text" class="layui-input learnType"></div><input class="id" type="hidden" value='+id+'></div><div class="layui-form-item layui-center"><a class="layui-btn layui-btn-sm learnTypeUpt" lay-filter="learnTypeUpt"><i class="layui-icon">&#xe609;修改文章类型 </i></a></div><form>',
						  success: function(layero, index){
						  	layero.find(".learnTypeUpt").click(function(){
						  		var id = layero.find(".id").val();
						  		var learnType = layero.find(".learnType").val();
						  		
						  		$.post('/learnTypeEdit',{id:id,type:learnType},function(data){
						  			 layer.open({
										  title: '提示信息',
										  content: data.msg,
										  end:function(){
										  	window.location.reload();
										  }
									}); 
						  		},"json")
						  	})
						  }
					}); 
			    })
				//新增或者修改文章信息
				form.on("submit(addBlog)",function(data){
					//弹出loading
			        var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
			        // 实际使用时的提交信息
			        var tag = [];
			        $.each($(".article-tag input"), function(index,value) {
			        	tag.push(value.value); 
			        });
			        //获取文章分类
			        var typeTwo = [];
			        $.each($(".article-type input"), function(index,value) {
			        	if(value.checked){
			        		typeTwo.push(value.getAttribute("title"))
			        	}
			        });
			        //截取文章内容中的一部分文字放入文章摘要
			        var abstract = layedit.getText(editIndex).substring(0,200);
			        //摘要，如果自己输入就用自己输入的摘要，如果没有输入就截取文章的前面50个字符
			        abstract = $(".abstract").val() ? $(".abstract").val() : abstract;
			        $.ajax({
			        	url:"/learnAdd",
			        	type:"post",
			        	data:{
			        		id:GetQueryString("id"),
				        	"title":$("#title").val(),
				        	"abstract" : abstract,
				        	"content" : layedit.getContent(editIndex).split('<audio controls="controls" style="display: none;"></audio>')[0],  //文章内容
				        	"articleTag" : tag,
				        	"articleType" : typeTwo,
				        	"openness" : $(".openness:checked").val(),
				        	"source" : $(".source:checked").val(),
				        },
				        traditional:true,//允许传入数组
				        dataType:"json",
				        success:function(data){
							layer.close(index);//关闭提交数据弹出层
							console.log(data)
				        	if(data.err == "1"){//新增失败
				        		layer.open({
									title: '提示信息',
									content: data.msg
								}); 
				        	}else if(data.err == "0"){//新增成功
				        		/*
				        		 * 按浏览器回退键时候会出现问题 
				        		 * */
								window.location.href = data.url;
				        	}
				        }
			        })
			    })
			  
			})
//获取地址栏的参数
function GetQueryString(name)
{
　　var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
　　var r = window.location.search.substr(1).match(reg);
　　if(r!=null) return unescape(r[2]);
   return null;
}
		