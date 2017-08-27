$(document).ready(function(){

	var buttonArray = ["Cycling", "Harley-Davidson", "Mustang", "Train", "Plane", "Boating", "Hiking", "Jogging", "Cruising", "Racing", "Formula One", "Skipping", "Horseback", "Backpacking"];

	function renderButtons() {
		$("#buttons").empty();
		for (var i=0; i < buttonArray.length; i++) {
			var a = $("<button>");
			a.addClass("giphy");
			a.attr("data-name", buttonArray[i]);
			a.text(buttonArray[i]);
			$("#buttons").append(a);
		}
	}

	$("#addButton").on("click", function(event) {
		event.preventDefault();
		var addButtons = $("#searchInput").val();
		buttonArray.push(addButtons);
		renderButtons();
		console.log(buttonArray);
		$("#searchInput").val("");
	})

renderButtons();

	$(document).on("click", '.giphy', function() {
		$("#gifsAppear").empty();
		var gif = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(this);

        $.ajax({
        	url: queryURL,
        	method: "GET"
        })
        .done(function(response) {
        	var results = response.data;
        	for (var i = 0; i < results.length; i++) {
        		var gifDiv = $("<div class='item'>");
        		var rating = results[i].rating;
        		var p = $("<p>").text("Rating: " + rating);
        		gifImage = $("<img>");
        		gifImage.attr("src", results[i].images.fixed_height_still.url);
        		gifImage.attr("data-still", results[i].images.fixed_height_still.url);
        		gifImage.attr("data-animate", results[i].images.fixed_height.url)
       			gifDiv.prepend(p);
        		gifDiv.prepend(gifImage);
        		$("#gifsAppear").prepend(gifDiv);
        	}
			console.log(response);
        })
	})

	$(document).on("click", "img", function() {
		if ($(this).attr("src") != $(this).attr("data-animate")) {
			$(this).attr("src", $(this).attr("data-animate"));
		} else {
			$(this).attr("src", $(this).attr("data-still"));
		}
	})
})