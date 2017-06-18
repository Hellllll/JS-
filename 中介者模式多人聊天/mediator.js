$("#chatForm").on("submit", function(e) {
	e.preventDefault();

	var text = $("#chatBox").val(),
		from = $("#fromBox").val(),
		to  = $("#toBox").val();

	mediator.publish("newMessage", {message: text, from: from, to: to});
});

function displayChat(data) {
	var date = new Date(),
		msg = data.from + " said \"" + data.message + "\" to " + data.to;

	console.log(date);

	$("#chatResult").prepend(" " + msg + "  (" + date.toLocaleTimeString() +")"); 
}

function logChat(data) {
	if(window.console) {
		console.log(data);
	}
}

mediator.subscribe("newMessage", displayChat);
mediator.subscribe("newMessage", logChat);

//如下代码仅在高级模式下可用
function amITalkingToMyself(data) {
	return data.from = data.to;
}

function IamClearlyCrazy(data) {
	$("#chatResult").prepend(data.from + "talking to myself.");
}

mediator.subscribe(amITalkingToMyself, IamClearlyCrazy);