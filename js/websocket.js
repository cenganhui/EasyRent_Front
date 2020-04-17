var mytoken = window.localStorage.getItem("token");
var uname = window.localStorage.getItem("uname");
var stompClient = null;

/**
 * 创建websocket连接
 */
function connect() {
	var ws = new SockJS("http://115.29.201.93:9000/websocket");
	stompClient = Stomp.over(ws);
	stompClient.debug = null;
	// 建立连接
	stompClient.connect({
		token: mytoken
	},
	function(frame) {
		// 连接成功。订阅
		subscribe();
	},
	function(error) {
	});
}

/**
 * websocket断开连接
 */
function disconnect() {
	if(stompClient != null) {
		stompClient.disconnect(function() {
			alert("good bye!")
		},{})
	}
}

/**
 * websocket订阅
 */
function subscribe() {
	stompClient.subscribe("/queue/chat/"+uname,
	function(message) {
		var page = plus.webview.currentWebview().id;
		// 添加新消息
		// 处于聊天页面,直接将消息添加到文本框
		if(page == "chat.html") {
			var messageList = JSON.parse(message.body);
			var length = messageList.length;
			for (var i = 0; i < length; i++) {
				var messageContent = document.getElementById("messageContent");
				var p = document.createElement("p");
				p.className = "p-receiver";
				p.innerHTML = messageList[i].content;
				messageContent.appendChild(p);
			}
		} else {
			// 提示新消息
			mui.toast("你有新消息！",{ duration:"1000", type:"div" }) 
		}
	},{
		token: mytoken
	})
}

/**
 * websocket发送消息
 */
function send(toUserName,content) {
	if(stompClient != null) {
		var data = JSON.stringify({
			'content': content,
			'to': toUserName,
			'token': mytoken
		});
		stompClient.send("/app/chat",{},data);
		// 添加消息
	}
}
