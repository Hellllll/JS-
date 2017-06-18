//本文档包括原型模式，command模式，facade模式，工厂模式

//1. 通过Object.create()实现原型模式
var myCar = {
	name: "ford esord",
	drive: function () {
		console.log("weeee.I'm driving.");
	}

	panic: function () {
		console.log("wait, how do you stop this thing.");
	}
};

var yourCar = Object.create(myCar);//实例化一个对象，myCar为yourCar的原型

//差异继承？例如
var car = Object.create(myCar, {
	"id": {
		enumerable:true
	},

	"modle": {
		value: "Ford",
		enumerable: true
	}
});//定义自身属性

//不使用Object.create()实现
function hli(model) {
	function F(){}

	F.prototype = hcquan;//hcquan表示是我的原型
	var f = new F();
	f.init();
	return f;
}

//还有另一种方式
var beget = (function() {
	function F(){}

	return function(proto) {
		F.prototype = proto;
		return new F();
	};
})();

//2.命令模式
(function () {
	var Car = {
		buyVehicle: function() {

		},
		//...
	}
})();
Car.run  = function (name) {
	return Car[name] && Car[name].apply(Car, [].slice.call(arguments, 1));
}
Car.run("buyVehicle", "Ford", "123");

//3.外观模式，在内部做了很多事情，但提供一个简单的对外接口
var module = (function() {
	var _private = {
		run: function(){},
		walk: function(){},
		jump: function(){},
		set: function(){},
		get: function(){}
	}

	return {
		facade: function(args) {
			_private.set(args.val);
			_private.get();
			if(_private.run) {
				_private.run();
			}
		}
	}
} ());

//4.工厂模式

//定义car构造函数
function Car(options){

}
function Trunk (options) {

}

function VProto(){
	VProto.prototype.vClass = Car;

	VProto.prototype.cVehicle = function(options){
		if(options.otype = Car) {
			this.vClass = Car;
		} else {
			this.vClass = Trunk;
		}

		return new this.vClass(options);
	}
}
//生成工厂实例
var vheCreate = new VProto();
//开始造车，根据options的配置，可以创建各种各样的车
var car = vheCreate.cVehicle(options);

//还用一个抽象工厂模式，暂时不看，封装一组具有共同目标的工厂