mui.init()

var addBtn = document.getElementById("addBtn")
var contactUser = document.getElementById("contactUser")

mui.plusReady(function () {
	//console.log("plusReady up");
	// 获取联系人列表
	getContactList();
	// websocket连接
	connect();
})

mui(".mui-table-view").on('tap','.mui-table-view-cell',function(){
	// 获取id
	var id = this.getAttribute("id");
	var ele = document.getElementById(id);
	if(ele !== null) {
		var toUser = jQuery.data(ele,"user");
	}
	// 传值给详情页面，通知加载新数据
	// 跳转页面
	mui.openWindow({
		url:"chat.html",
		id:"chat.html", 
		styles:{},
		extras:{
			talkUser: toUser,
		},
		show:{
			autoShow:true,
			aniShow:"slide-in-right",
			duration:100
		},
		waiting:{
			autoShow:true,
			title:"正在加载...",
			options:{}
		}
	});
})

function getContactList() {
	jQuery.ajax({
		method : "GET",
		url : "http://115.29.201.93:9000/api/v1/messageUser",
		contentType : "application/json;charset=utf-8",
		headers : {
			"Authorization" : window.localStorage.getItem("token")
		},
		xhrFields : {
			withCredentials : true
		},
		success: function(res) {
			if(res.code == 200) {
				var userList = res.data;
				var length = userList.length;
				for (var i = 0; i < length; i++) {
					var user = userList[i];
					var uuid = "user_" + user.uid
					var li = document.createElement("li");
					li.className = "mui-table-view-cell mui-media user-list"
					li.id = "user_" + user.uid
					var str = "";
					str += 	"<a href='chat.html'>";
					str +=		"<div class='mui-media-body'>";
					str +=			user.nickName
					str +=		"</div>";
					str +=	"</a>";
					li.innerHTML = str;
					contactUser.appendChild(li)
					// 添加data
					var liEle = document.getElementById(uuid)
					jQuery.data(liEle,"user",user);
				}
			} else {
				alert(res.code)
			}
		},
		error: function(err) {
			console.log(err)
		}
	})
}


/**
 * 添加新的联系人
 */
// addBtn.addEventListener("tap",function() {
// 	var newUser = jQuery("#newUser").val();
// 	// 通过ajax发送请求
// })