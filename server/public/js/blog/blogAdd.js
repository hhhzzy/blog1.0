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
			        height : 200,
			        uploadImage : {
			            url : "../../json/newsImg.json"
			        }
			    });
			    form.verify({
			        motto : function(val){
			        	//把富文本编辑器的内容赋值到textarea中
			   			return layedit.sync(editIndex);
			        }
			    })
			    //时间
			    laydate.render({
			        elem: '#blogTime',
			        theme: '#393D49',
			        trigger : "click"
			    });
			    //时间线新增
			    form.on("submit(addTimeLine)",function(data){
			        // 实际使用时的提交信息
			        $.post("/blogAdd",{
			        	 type:"timeLine",//修改的类型
			             blogTime : $("#blogTime").val(),  //时间线
			             timeWork :$("#timeWork").val(),  //时间线的工作
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
			    //弹出修改时间线的弹出层
			    $(".update-timeLine").click(function(){
			    	var timeLine =$(this).siblings(".timeLine").val();
			    	var timeWork =$(this).siblings(".timeWork").val();
			    	var timeId =$(this).siblings(".timeId").val();
			    	timeLine = new Date(timeLine);
            		timeLine = timeLine.getFullYear()+'-'+(timeLine.getMonth()+1)+'-'+timeLine.getDate();
			    	layer.open({
					      type: 1,
					      area: ['600px', '270px'],
					      shadeClose: true, //点击遮罩关闭
					      content: '<form method="post"><div><div class="layui-form-item magt3 magr10"><label class="layui-form-label">博客踪迹</label><div class="layui-input-block"><input value='+timeLine+' placeholder="博客时间" type="text" class="layui-input blogTime"></div></div><div class="layui-form-item magt3 magr10"><label class="layui-form-label">now work</label><div class="layui-input-block"><textarea name="timeWork" id="timeWork" placeholder="now work" class="layui-textarea timeWork">'+timeWork+'</textarea></div></div></div><input class="timeId" type="hidden" value='+timeId+'><div class="layui-form-item layui-center"><a class="layui-btn layui-btn-sm updateTimeLine" lay-filter="updateTimeLine"><i class="layui-icon">&#xe609;修改时间线 </a></div><form>',
					      success: function(layero, index){
					      	//时间
						    laydate.render({
						        elem: '.blogTime',
						        theme: '#393D49',
						        trigger : "click"
						    });
						    layero.find(".updateTimeLine").click(function(){
							    var timeLine = layero.find(".blogTime").val();
							    var timeWork = layero.find(".timeWork").val();
							    var timeId = layero.find(".timeId").val();
						    	$.post("/updateTimeLine",{blogTime:timeLine,timeWork:timeWork,timeId:timeId},function(data){
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
				//新增或者修改博客信息
				form.on("submit(addBlog)",function(data){
			        // 实际使用时的提交信息
			        $.post("/blogAdd",{
			        	 type:"blog",//修改的类型
			             motto : layedit.getContent(editIndex).split('<audio controls="controls" style="display: none;"></audio>')[0],  //文章内容
			             host:$("#host").val(),//域名
			             server:$("#server").val(),//服务器
			             serverL:$("#serverL").val()//后台语言
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
			  
			})
//获取地址栏的参数
function GetQueryString(name)
{
　　var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
　　var r = window.location.search.substr(1).match(reg);
　　if(r!=null) return unescape(r[2]);
   return null;
}
		