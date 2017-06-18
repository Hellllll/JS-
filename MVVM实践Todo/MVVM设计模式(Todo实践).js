/**
 * My TodoList using KnockoutJS 
 */
var ViewModel = function (todos) {
	var self = this;

	//将传递的数组转换到TODO对象的数组
	self.todos = ko.obserableArray(
		ko.utils.arrayMap( todos, function ( todo ) {
			return new Todo ( todo.content, todo.done ); 
		})
	);

	//临时保存新输入的TODO
	self.current = ko.obserable();
	//回车时，添加新输入的todo
	self.add = function ( data, event ) {
		var newTodo, current = self.current().trim();
		if (current) {
			newTodo = new Todo(current);
			self.todos.push(newTodo);
			self.current("");
		}
	};
	//删除单个TODO
	self.remove = function (todo) {
		self.todos.remove(todo);
	};

	//删除所有已完成的TODO
	self.removeCompleted = function () {
		self.todos.remove(function(todo) {
			return todo.done();
		});
	};

	//可写的completed监控，用于标记所有已完成、未完成的TODO
	self.allCompleted = ko.computed({
		read: function () {
			return !self.remainingCount();
		},

		write: function (newValue) {
			ko.utils.arrayForEach( self.todos(), function ( todo ){
				todo.done(newValue);
			});
		}
	});

	self.editItem = function ( item ) {
		item.editing( true );
	};

};
