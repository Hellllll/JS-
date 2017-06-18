//简单的实现：
var mediator = (function() {

	//储存可被广播或监听topic
	var topics = {};

	//订阅一个topic，提供回调函数，一旦topic被广播就执行该回调
	//赋值，集合，订阅者集合
	var subscribe = function (topic, fn) {

		if(!topics[topic]) {
			topics[topic] = [];
		}
		topics[topic].push({ context: this, callback: fn }); //记录每个订阅者，即扔进盒子

		return this;
	};

	//发布、广播事件到程序的剩余部分
	//在每个订阅者上面执行操作
	var publish = function (topic) {
		var args;

		if(!topics[topic]){
			return false;
		}

		args = Array.prototype.slice.call(arguments, 1); //取除topic的其他参数
		//topics[topic].length是订阅者的个数
		for (var i=0, l=topics[topic].length; i<l; i++) {
			var subscription = topics[topic][i]; //即每个订阅者描述
			subscription.callback.apply(subscription.context, args);
		}
		return this;
	};
	
	return {
		publish: publish,
		subscribe: subscribe,
		installTo: function (obj) {
			obj.subscribe = subscribe;
			obj.publish = publish;
		}
	};
})();
