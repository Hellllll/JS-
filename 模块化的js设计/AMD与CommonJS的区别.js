/**
 * 1.AMD中的重要概念： define，require 偏向浏览器端
 * 2.CommonJS中的：    exports，require 偏向服务器端（如nodejs中使用）
 * 3.ES Harmony  具有：import，export
 */

/*1.服务器端的CommonJS*/
//1.io/File.js
export function open(path) {...};
export function close(hnd) {...};

//2.ll.js
module file from "io/File";

import { open, close } from file;
 //do something.

/*2.ES Harmony.*/

module staff{//命名空间？
	export var baker = {
		bake: function (item) {
			console.log("wa,i just baked."+ item);
		}
	}
}

module skills{
	export var specialty = "baking";
	export var experience = "5 years.";
}

module cakeFactory{

	import baker from staff;

	import * from skills;

	export var oven = {
		makeCupcake: function ( toppings ) {
			baker.bakre("cupcake", toppings );
		}, 
		makeMuffin: function ( mSize ) {
			baker.bake("muffin", size);
		}
	}
}


//3.AMD规范，动态加载依赖的实例
define(function (require) {
	var isReady = false, foobar;

	require(["foo", "bar"], function (foo, bar) {
		isReady = true;
		foobar = foo() + bar();
	});

	return {
		isReady: isReady,
		foobar: foobar
	}
})
