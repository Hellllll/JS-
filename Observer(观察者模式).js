//1.模拟一个目标可能拥有的一系列Obserser
function ObserverList() {
		this.observerList = [];
	}

	ObserverList.prototype.Add = function (obj){
		return this.observerList.push(obj);
	};

	ObserverList.prototype.Empty = function() {
		this.observerList = [];
	};

	ObserverList.prototype.Count = function() {
		return this.observerList.length;
	};

	ObserverList.prototype.Get = function(index) {
		if(index > -1 && index < this.observerList.length) {
			return this.observerList[index];
		}
	};

	ObserverList.prototype.Insert = function (obj, index) {
		var pointer = -1;

		if(index === 0) {
			this.observerList.unshift(obj);
			pointer = index;
		} else if (index === this.observerList.length) {
			this.observerList.push(obj);
			pointer = index;
		}
		return pointer;
	};

	ObserverList.prototype.IndexOf = function(obj, startIndex) {
		var i = startIndex, pointer = 0;

		while(i < this.observerList.length) {
			if(this.observerList[i] === obj) {
				pointer = i;
			}
			i++;
		}
		return pointer;
	};

	ObserverList.prototype.RemoveIndexAt  = function(index) {
		if(index === 0){
			this.observerList.shift();
		} else if (index = this.observerList.length - 1) {
			this.observerList.pop();
		}
	};

	//使用extend扩展对象
	function extend(obj, extension) {
		for(var key in obj) {
			extension[key] = obj[key];
		}
}

//2.模拟一个目标，和在观察者列表上添加，删除或通知观察者的能力
function Subject(){
		this.observers = new ObserverList();
	}

	Subject.prototype.AddObserver = function(observer) {
		this.observers.Add(observer);
	}

	Subject.prototype.RemoveObserver = function(observer) {
		this.observers.RemoveIndexAt(this.observers.IndexOf(observer, 0));
	}

	//通知观察者改变的发生
	Subject.prototype.Notify = function (context) {
		var observerCount = this.observers.Count();

		for (var i = 0; i < observerCount; i++) {
			this.observers.Get(i).Update(context);
		}
}

//3.定义一个框架来创建新的Observe。
function Observer(){
	this.Update = function () {
		//...
	};
}