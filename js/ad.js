var _currentTr,
    _publishId,
    _cityId,
    _positionName;
$(document).ready(function(){
	$("div[class^='pop-box']").css("display","none");
	_positionName = $("input[name='positionName']").val();
})
$(document).on("click",".tab-content ul li",function() {
	$(".active").removeClass();
	$(this).addClass("active");
	var currentId = $(this).attr("id");
	$(".list-content").css("display","none");
	$(".list-content:nth("+currentId+")").css("display","block");
})
/**********************input输入框输入字时的效果**********************/
$(document).on("focus",".defaultInput",function(){
	if(this.value == this.defaultValue ){
		this.value = "";
		$(this).css("color","#666");
	}
})
$(document).on("blur",".defaultInput",function(){
	if(this.value == ""){
		this.value = this.defaultValue;
		$(this).css("color","#999");
	}
})

/*********************弹出框***********************/
$(document).on("click",".delete-tr",function(e){
	e.preventDefault();
	_currentTr = $(this).closest("tr");
	_publishId = $(this).closest("tr").attr("publishId");
	_cityId = $(this).closest("tr").children("td:eq(0)").attr("cityId");
	var screenWidth = $(window).width(),
	    screenHeight = $(window).height(),
	    scrollTop = $(document).scrollTop(),
	    objLeft = (screenWidth - 350)/2,
	    objTop = (screenHeight - 90)/2 - scrollTop;
	$("#fullBg").css({
		height:screenHeight + 1000,
		width:screenWidth,
		display:"block"
	});
	$(".pop-box .hint-content").html("确定要彻底删除该团单内容？");
	$(".pop-box").css({"display":"block","left":objLeft + "px","top":objTop + "px"}).show();
	$(document).on("click",".close,.close-cancel",function() {
		closePopBox();
	})
	$(document).on("click","#sure",function(){
		if($(this).closest("tr").attr("class") == "editable-tr"){
			_currentTr.hide();
			closePopBox();
		} else {
			$.ajax({
				type:"GET",
				url:"/advertise/deletePublish",
				data:{publishId:_publishId,cityIds:_cityId,positionName:_positionName},
				success:function(msg){
					_currentTr.hide();
					closePopBox();
				}
			});
		}
	})
})

function closePopBox() {
	$(".pop-box").hide();
	$("#fullBg").css("display","none");
}

/**********************增加一条编辑***********************/
var tdCopy = '<tr class="editable-tr" id="">'
           + '<td>'
           + '<select name="" id="">'
		   + '<option value="">全部</option>' 
		   + '<option value="">上海</option>'
		   + '<option value="">北京</option>'
		   + '<option value="">深圳</option>'
		   + '<option value="">广州</option>'
		   + '</select> </td>'
		   + '<td><input type="text" class="defaultInput" value="yyyy-mm-dd 00:00:00"></td>'
		   + '<td><input type="text" class="defaultInput" value="yyyy-mm-dd 00:00:00"></td>'
		   + '<td><input type="checkbox"><span class="put-top">置顶</span></td>'
		   + '<td><a href="" class="delete-tr">删除</a></td></tr>';

$(document).on("click",".add-edit-list",function(e){
	e.preventDefault();
	$("table tbody").append(tdCopy);
})
$(document).on("click","#saveModifiedTr",function(){
	$.ajax({
		type:"POST",
		url:"/advertise/publishDeal",
		data:{positionName:"",
		      "adDetail.resourceid":"",
		      "publishList.strCityIds[]":"",
		      "publishList.adPublish.beginDateStr":"",
		      "publishList.adPublish.endDateStr":"",
		      "publishList.adPublish.position":"",
		      "publishList.adPublish.title":""},
		success:function(msg){

		}
	});
})