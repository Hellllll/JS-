;(function (pubsub) {
	var resultTemplate = _.template($("#resultTemplate").html());

	pubsub.subscribe("/search/tags", function (e, tags) {
		$("#searchResults").html("Searched for: " + tags + "");
	});

	pubsub.subscribe("/search/resultsSet", function(e, results){
		$("#searchResults").append(resultTemplate(results));

		$("#searchResults").append(compiled_template(results));
	});

	$("#flickerSearch").submit(function (e) {
		e.preventDefault();

		var tags = $(this).find("#query").val();

		if(!tags) {
			return;
		}

		pubsub.publish("/search/tags", [$.trim(tags)]);
	});

	//订阅发布新的tag,并且使用tag发起请求，一旦返回数据，将数据发布给应用程序的其他使用者
	pubsub.subscribe("/search/tags", function (e, tags) {
		console.log(111);
		$.getJSON("http://api.flickr.com/service/feeds/photos_public.gne?jsoncallback=?", {
			tags: tags,
			tagmode: "any",
			format: "json"
		},
		function (data) {

			if (!data.items.length) {
				return;
			} 

			pubsub.publish("/search/resultsSet", data.items);
			console.log(1);
		});
	});
})(pubsub);