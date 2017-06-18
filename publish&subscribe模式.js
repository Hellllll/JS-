//发布订阅模式实现
var pubsub = {};

(function (q) {
	var topics = {},
		subUid = -1;

	//发布或广播事件，包含认定的topic名称和参数
	q.publish = function (topic, args) {

		if (!topics[topic]) {
			return false;
		}

		var subscribers = topics[topic],  //添加订阅事件
			len = subscribers ? subscribers.length : 0;

		while(len--){
			subscribers[len].func(topic, args); //执行订阅事件相关操作
		}

		return this;
	};


	//通过特定名称和回调函数订阅事件，topic/event触发时执行事件
	q.subscribe = function (topic, func) {
		if(!topics[topic]) {
			topics[topic] = [];
		}

		var token = (++subUid).toString();
		topics[topic].push({
			token: token,
			func: func
		});
		return token;
	};

	q.unSubscribe = function (token) {
		for (var m in topics) {
			if(topics[m]) {
				for (var i=0, j=topics[m].length; i<j; i++) {
					if (topics[m][i].token === token) {
						topics[m].splice(i, 1);
						return token;
					}
				}
			}
		}
		return this;
	};
})(pubsub);


/*//使用上述实现(简单的实例)
var messageLogger = function(topics, data) {
	console.log("Logging:"+topics+":"+data);
}
var subscription = pubsub.subscribe("inbox/message", messageLogger);
pubsub.publish("inbox/newMessage", "hello world");*/

//显示实时股票信息的Web应用程序
//用户界面通知（真实示例）
/*getCurrentTime = function () {

	var date = new Date(),
		m = date.getMonth() + 1,
		d = date.getDate(),
		y = date.getFullYear(),
		t = date.getLocaleTimeString().toLowerCase();

		return (m + "/" + d + "/" + y + " " + t);
};

function addGridRow(data) {
	console.log();
}

function updateCounter(data) {
	console.log(getCurrentTime());
}

gridUpdata = function (topic, data) {

	if(data!=="undefined") {
		addGridRow(data);
		updateCounter(data);
	}
}
var subscriber = pubsub.subscribe("newDataAvailable", gridUpdata);
pubsub.publish("newDataAvailable", {
	summary:"lll",

});*/