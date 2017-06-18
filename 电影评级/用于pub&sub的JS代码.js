; (function (pubsub) {
	pubsub.subscribe("/new/user", function (e, data) {

		var compiledTemplate;
		if (data){
			compiledTemplate = _.template($("#userTemplate").html());
			$('#users').append(compiledTemplate(data));	
		}
	});

	pubsub.subscribe("/new/rating", function (e, data) {

		var compliledTemplate;

		if(data) {

			compiledTemplate = _.template($("#ratingsTemplate").html());

			$("#ratings").append(compiledTemplate(data));
		}
	});

	$("#add").on("click", function (e) {
		e.preventDefault();

		var strUser= $("#twitter_handle").val(),
			strMovie= $("#movie_seen").val(),
			strRating= $("#movie_rating").val();

		pubsub.publish("/new/user", { name: strUser});
		pubsub.publish("/new/rating", { title: strMovie, rating: strRating  });
	});


})(pubsub);

