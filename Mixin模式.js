//1.子类化
var Person = function (firstName, lastName){

	this.firstName = firstName;
	this.lastName = lastName;
	this.gender = "male";
}; //函数表达式与函数声明的区别是什么？

var superHero = function(firstName, lastName, powers) {
	Person.call(this, firstName, lastName);
	this.powers = powers;
};

superHero.prototype = Object.create(Person.prototype);//这个是什么意思
var superman = new superHero("clas", "heli", ["ks", "njsdnj"])

console.log(superman);

//2.混入；通过扩展收集功能，促进函数复用
var Car = function(settings) {
	this.model = settings.model || "no model provided.";
	this.color = settings.color || "no color provided.";
}

var Mixin = function () { };

Mixin.prototype = {
	driveForward: function () {

	},

	driveBackward: function () {

	},

	driveSideways: function () {

	}
};

function argument(receivingClass, givingClass) {//将现有对象扩展到另一个对象上面

	//只提供特定的方法
	if (arguments[2]) {
		for (var i = 2, len=arguments.length; i<len; i++) {
			receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
		}
	} else {
		for (var methodName in givingClass.prototype) {
			//确保接收类不包含所处理方法的额同名方法
			if(!Object.hasOwnProperty(receivingClass.prototype, methodName)) {
				receivingClass.prototype[arguments[methodName]] = givingClass.prototype[arguments[methodName]];
			}
		}
	}
}

Mixin(Car, Mixin);

var car = new Car({
	//settings配置项
});

