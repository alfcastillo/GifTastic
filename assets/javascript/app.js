var topicsArray = ["cats", "dogs", "birds"];

// Function for displaying topic data
function renderButtons() {

  // Deletes the topics prior to adding new topics
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Loops through the array of movies
  for (var i = 0; i < topicsArray.length; i++) {

    // Then dynamicaly generates buttons for each topic in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var topicButton = $("<button>");
    // Adds a class of topic to our button
    topicButton.addClass("topic");
    // Added a data-attribute
    topicButton.attr("data-topic", topicsArray[i]);
    // Provided the initial button text
    topicButton.text(topicsArray[i]);
    // Added the button to the buttons-view div
    $("#buttons-view").append(topicButton);
  }
}

// This function handles events where the add movie button is clicked
$("#add-topic").on("click", function (event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var topic = $("#topic-input").val();

  // The movie from the textbox is then added to our array
  topicsArray.push(topic);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();

});

// $("button").on("click", function () {
function displayTopicInfo() {
  console.log("Button Clicked");
  var topic = $(this).attr("data-topic");
  console.log("topic: " + topic);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    topic + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // Step 1: Run this file, click a button, and see what the response object looks like in the browser's console.
    // Open up the data key, then open up the 0th, element. Study the keys and how the JSON is structured.

    console.log(response);



    // Step 2: since the image information is inside of the data key,
    // make a variable named results and set it equal to response.data

    // =============== put step 2 in between these dashes ==================
    var results = response.data;
    console.log(results);
    // ========================

    for (var i = 0; i < results.length; i++) {

      // Step 3: uncomment the for loop above and the closing curly bracket below.
      // Make a div with jQuery and store it in a variable named topicDiv.
      // Make a paragraph tag with jQuery and store it in a variable named p.
      // Set the inner text of the paragraph to the rating of the image in results[i].
      // Make an image tag with jQuery and store it in a variable named topicImage.
      // Set the image's src to results[i]'s fixed_height.url.
      // Append the p variable to the topicDiv variable.
      // Append the topicImage variable to the topicDiv variable.
      // Prepend the topicDiv variable to the element with an id of gifs-appear-here.

      // ============= put step 3 in between these dashes ======================
      var topicDiv = $("<div>");
      var p = $("<p>");
      p.text("Rating: " + results[i].rating);
      console.log(results[i].rating);

      var topicImage = $("<img>");

      //add src attribute, set to image url
      // topicImage.attr("src", results[i].images.fixed_height.url);
      topicImage.attr("src", results[i].images.original_still.url)
      console.log(results[i].images.fixed_height.url);


      topicImage.attr("data-still", results[i].images.original_still.url);
      topicImage.attr("data-animate", results[i].images.fixed_height.url);
      topicImage.attr("data-state", "still");
      topicImage.addClass("gif");
      console.log("topicImage--> " + topicImage);


      // topicDiv.append(p);
      // topicDiv.append(topicImage);
      topicDiv.append(p, topicImage);
      $("#gifs-appear-here").prepend(topicDiv);



      // ==================================
    }

  });
};


// ANIMATING GIFs
function animateGif() {

  // $(".gif").on("click", function() {
  console.log("GIF was Clicked");
  // STEP ONE: study the html above.
  // Look at all the data attributes.
  // Run the file in the browser. Look at the images.

  // After we complete steps 1 and 2 we'll be able to pause gifs from giphy.

  // STEP TWO: make a variable named state and then store the image's data-state into it.
  // Use the .attr() method for this.

  // ============== FILL IN CODE HERE FOR STEP TWO =========================

  // CODE GOES HERE
  var state = $(this).attr("data-state");
  console.log(state);
  // =============================================

  // STEP THREE: Check if the variable state is equal to 'still',
  // then update the src attribute of this image to it's data-animate value,
  // and update the data-state attribute to 'animate'.

  // If state is equal to 'animate', then update the src attribute of this
  // image to it's data-still value and update the data-state attribute to 'still'
  // ============== FILL IN CODE HERE FOR STEP THREE =========================

  // CODE GOES HERE
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

  // ==============================================

  // STEP FOUR: open the file in the browser and click on the images.
  // Then click again to pause.
};


// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".topic", displayTopicInfo);
$(document).on("click", ".gif", animateGif);

// Calling the renderButtons function to display the intial buttons
renderButtons();