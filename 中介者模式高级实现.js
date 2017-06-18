
//订阅者概念的实现(高级实现)
(function (root) {

	function guidGenerator(){/**/}

	//订阅者构造函数
	function Subscriber(fn, options, context) {
		if (!this instanceof Subscriber) {

			return new Subscriber(fn, options, context);
		} else {
			//调用guidGenerator()，用于生成订阅者GUID，以后便于引用他们
			
			this.id = guidGenerator();
			this.fn = fn;
			this.options = options;
			this.context = context;
			this.topic = null;
		}
	}
	//模拟Topic
	function Topic( namespace ) {
		if (!this instanceof Topic) {
			return new Topic(namespace);
		} else {
			thiss.namespace = namespace || "";
			this._callbacks = [];  //保存回调函数？
			this._topics = []; //保存topic的
			this.stopped = false;//什么作用呢？
		}
	}

	Topic.prototype = {

		AddSubscriber: function ( fn, options, context) {
			var callback = new Subscriber( fn, options, context);//新建一个订阅者

			this._callbacks.push( callback );
			callback.topic = this; //???

			return callback;
		},

		StopPropagation: function() {
			this.stopped = true;
		},

		GetSubscriber: function ( identifier ) {
			if (!identifier) {
				for( var z in this._topics){
					if( this._topics.hasOwnProperty( z ) ){
						var sub = this._topics[z].GetSubscriber( identifier );
						if( sub !== undefined ){
							return sub;
						}
					}
				}
			}

			for(var x = 0, y = this._callbacks.length; x<y; x++) {
				if(this._callbacks[x].id === identifier || this._callbacks.fn === identifier){
					return this._callbacks[x];
				}
			}		
		},

		AddTopic: function ( topic ) {
			this._topics[topic] = new Topic((this.namespace ? this.namespace + ":" : "") + topic);
		},

		HasTopic: function( topic ) {
			return this._topics.hasOwnProperty( topic ); //是否存在topic
		},

		ReturnTopic: function ( topic ) {
			return this._topics[topic];  //获取topic
		},

		RemoveSubscriber: function( identifier ) {

			if (!identifier) {
				this._callbacks = [];

				for( var z in this._topics ) {
					if (this._topics.hasOwnProperty(z)) {
						this._topics[z].RemoveSubscriber( identifier );
					}
				}
			}

			for(var x = 0, y = this._callbacks.length; x<y; x++) {
				if(this._callbacks[x].id === identifier || this._callbacks.fn === identifier){
					this._callbacks[x].topic = null;
					this._callbacks.splice( y, 1 );
					y--; x--;
				}
			}
		},

		Publish: function( data ) {

			for (var y = 0, x = this._callbacks.length; y < x; y++) {

				var callback = this._callbacks[y], l;
				callback.fn.apply( callback.context, data );

				l = this._callbacks.length;

				if ( l < x) { //什么意思,越来越看不懂
					y--;
					x = l;
				}
			}

			for ( var x in this._topics) {
				if( !this.stopped ) {
					if (this._topics.hasOwnProperty( x )) {
						this._topics[x].Publish(data);
					}
				}
			}
			this.stopped = false;
		}
	};

	//定义中介者(高级实现)
	function Mediator = function () {

		if (!this instanceof Mediator) {
			return new Mediator();
		} else {
			this._topics = new Topic("");
		}
	};

	Mediator.prototype = {

		GetTopic: function( namespace ) {
			var topic = this._topics,
				namespaceHierarchy = namespace.split( ":" );

			if( namespace === "" ){
				return topic;
			}

			if( namespaceHierarchy.length > 0 ) {
				for (var i = 0, j = namespaceHierarchy.length; i < j; i++ ){
					if (!topic.HasTopic(namespaceHierarchy[i])) {
						topic.AddTopic( namespaceHierarchy[i] );
					}

					topic = topic.ReturnTopic( namespaceHierarchy[i] );
				}
			}
			return topic;
		}, 
		Subscribe: function( topicName, fn, options, context ) {
			var options = options || {},
				context = context || {},
				topic = this.GetTopic( topicName ),
				sub = topic.AddSubscriber(fn, options, context);

			return sub;
		}, 
		GetSubscriber: function( identifier, topic ) {
			return this.GetTopic(topic || "").GetSubscriber(identifier);
		},
		Remove: function (topicName, identifier) {
			this.GetTopic(topicName).RemoveSubscriber(identifier);
		},
		Publish: function(topicName) {
			var args = Array.prototype.slice.call(arguments, 1),
				topic = this.GetTopic(topicName);

			args.push( topic );
			this.GetTopic( topicName ).Publish(args); 
		}
	};

	Mediator.Publish( "inbox:message:new", [args] );
	root.Mediator = Mediator;
	Mediator.Topic = Topic;
	Mediator.Subscriber = Subscriber;
})(window);