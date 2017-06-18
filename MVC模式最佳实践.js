//一种架构设计模式，注意与MVP，MVVM的区别
var buildPhotoView = function (photoModel, photoController) {
	var base = document.createElement("div"),
		photoEl = document.createElement("div");

	base.appendChild(photoEl);

	var render = function () {
		photoEl.innerHTML = _.template("#photoTemplate", {
			src: photoModel.getSrc();
		});
	};

	photoModel.addSubscriber(render);//添加一个订阅者

	photoEl.addEventListener("click", function () {
		photoController.handleEvent("click", photoModel);
	});

	var show = function () {
		photoEl.style.display = " ";
	};

	var hide = function () {
		photoEl.style.display = "none";
	};

	return {
		showView: show,
		hideView: hide
	}
};

/*Spine.js中控制器*/
var PhotoController = Spine.Controller.sub({
	init: function () {
		this.item.bind("update", this.proxy(this.render));//proxy对象做代理
		this.item.bind("destroy", this.proxy(this.remove));//what
	};

	render: function () {
		this.replace($("#photoTemplate").tmpl(this.item));
		return this;
	},

	remove: function () {
		this.el.remove();
		this.replace();
	}
});

/**
 * Backbone.js中控制器  Backbone.View和Backbone.Router一起承担
 */

var PhotoRouter = Backbone.Router.extend({
	routes: { "photos/:id": "route" },

	route: function (id) {
		var item = photoCollection.get(id);
		var view = new PhotoView({ model: item });

		$('.content').html(view.render().el);
	}
})