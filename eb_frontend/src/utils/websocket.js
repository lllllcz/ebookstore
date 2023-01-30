import $ from "jquery";

function setConnected(connected) {
  $("#connect").prop("disabled", connected);
  $("#disconnect").prop("disabled", !connected);
  if (connected) {
    $("#conversation").show();
  }
  else {
    $("#conversation").hide();
  }
  $("#greetings").html("");
}

export function openSocket(userId) {

  if (typeof (WebSocket) == "undefined") {
    alert("您的浏览器不支持WebSocket");
  } else {
    let socket;

    if (socket != null) {
      return;
    }

    //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
    let socketUrl = "ws://localhost:8080/websocket/EBookstore/" + userId;

    setConnected(true);

    socket = new WebSocket(socketUrl);
    //打开事件
    socket.onopen = function () {
      console.log("websocket已打开");
    };
    //获得消息事件
    socket.onmessage = function (msg) {
      let serverMsg = "收到后端信息：" + msg.data;
      window.alert(serverMsg)
    };
    //关闭事件
    socket.onclose = function () {
      console.log("websocket已关闭");
    };
    //发生了错误事件
    socket.onerror = function () {
      console.log("websocket发生了错误");
    }
  }
}
