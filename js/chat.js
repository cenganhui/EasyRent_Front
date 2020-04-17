mui.init();

var btn = document.getElementById("messageBtn")
var talkUser = null;

btn.addEventListener("tap",function() {
	var content = jQuery("#sendContent").val();
	// 发送消息
	send(talkUser.uname,content);
	// 添加消息
	addContent(content);
	jQuery("#sendContent").val("")
})

mui.plusReady(function () {
	
	// 传过来的talkUser需要包含uid,uname,nickName三个属性
	// 获取参数
	talkUser = plus.webview.currentWebview().talkUser;
	// 设置标题
	var head = document.getElementById("talkName");
	head.innerHTML = talkUser.nickName
	// 获取信息列表
	getMessage();
	// websocket连接
	connect();
})

function getMessage() {
	jQuery.ajax({
		method : "GET",
		url : "http://115.29.201.93:9000/api/v1/message?receiverId=" + talkUser.uid,
		contentType : "application/json;charset=utf-8",
		headers : {
			"Authorization" : window.localStorage.getItem("token")
		},
		xhrFields : {
			withCredentials : true
		},
		success: function(res) {
			if(res.code == 200) {
				var messageList = res.data;
				var length = messageList.length;
				var currentId = window.localStorage.getItem("uid");
				var messageContent = document.getElementById("messageContent");
				for (var i = 0; i < length; i++) {
					var message = messageList[i];
					var p = document.createElement("p");
					if(message.senderId == currentId) {
						p.className = "p-sender";
					} else {
						p.className = "p-receiver";
					}
					p.innerHTML = message.content;
					messageContent.appendChild(p);
				}
			}
		},
		error: function(err) {
			console.log(err)
		}
	})
}

function addContent(content) {
	var messageContent = document.getElementById("messageContent");
	var p = document.createElement("p");
	p.className = "p-sender";
	p.innerHTML = content;
	messageContent.appendChild(p);
}