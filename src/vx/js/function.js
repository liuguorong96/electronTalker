

$(function(){
    
    var text = document.getElementById('input_box');
	var chat = document.getElementById('chatbox');
    var talk = document.getElementById('talkbox');
    let id,classnames;
    var socket;
    if (!window.WebSocket) {
        window.WebSocket = window.MozWebSocket;
    }
    if (window.WebSocket) {
        socket = new WebSocket("ws://118.24.255.18:8080/ws");
        // socket = new WebSocket("ws://localhost:8080/ws");
        socket.onmessage = function (event) {
            if(event.data && JSON.parse(event.data) && JSON.parse(event.data).parent_id ){
                id = JSON.parse(event.data).parent_id // 初始默认分配id
                return 
            }

            const names = JSON.parse(event.data).id === id ?'me':'other'
            const img = JSON.parse(event.data).classnames
            console.log(img,'img')
            chat.innerHTML += `<li class="${names}"><img class="own_head ${img}"><span>${JSON.parse(event.data).val}</span></li>`;
			text.value = '';
			chat.scrollTop=chat.scrollHeight;
			talk.style.background="#fff";
			text.style.background="#fff";
        };
        socket.onopen = function (event) {
            chat.innerHTML += "welcome to 我要你快乐 "
            classnames = `o${Math.floor(Math.random()*15)}`
            // var ta = document.getElementById('responseText');
            // ta.value = "连接开启!";
        };
        socket.onclose = function (event) {
           
        };
    } else {
        alert("你的浏览器不支持 WebSocket！");
    }

    // 发送 输入框的内容
    $("#send1").click(function(){
        const temp = {
            val:$("#input_box").val(),
            id:id,
            classnames:classnames
        }
        console.log(temp,'temp')
        socket.send(JSON.stringify(temp))
    })
})