var mySingleton = (function() {
	//实例保存Singleton的引用
	var instance;
	function init() {
		function privateMethod() {
			console.log("I am a Private.");
		}

		var privateVar = "I too.";
		var privateRandomNumber = Math.random();
		return {
			//共有方法和变量
			publicMethod: function () {
				console.log("The public can see me");
			},
			publicProperty: "I too",
			getRandomNumber: function () {
				return privateRandomNumber;
			}
		};
	}

	return {
		//获取singleton实例，如果存在就返回，否则新建一个
		getInstance: function () {
			if (!instance) {  
				instance = init();
			}
			return instance;
		}
	};
})();


var SingletonTester = (function () {
	function Singleton(options) {
		options = options || {};

		this.name = "singletonTester";
		this.pointX = options.pointX || 6;
		this.pointY = options.pointY || 10;
	}

	var instance;

	var _static = {

		name: "singletonTester",
		getInstance: function (options) {
			if (instance === undefine) {
				instance = new Singleton( options );
			}
			return instance;
		}
	}

	return _static;
})();
