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
    // Adds a class of movie to our button
    topicButton.addClass("topic");
    // Added a data-attribute
    topicButton.attr("data-animal", topicsArray[i]);
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
  var animal = $(this).attr("data-animal");
  console.log("Animal: " + animal);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=dc6zaTOxFJmzC&limit=10";

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
      // Make a div with jQuery and store it in a variable named animalDiv.
      // Make a paragraph tag with jQuery and store it in a variable named p.
      // Set the inner text of the paragraph to the rating of the image in results[i].
      // Make an image tag with jQuery and store it in a variable named animalImage.
      // Set the image's src to results[i]'s fixed_height.url.
      // Append the p variable to the animalDiv variable.
      // Append the animalImage variable to the animalDiv variable.
      // Prepend the animalDiv variable to the element with an id of gifs-appear-here.

      // ============= put step 3 in between these dashes ======================
      var animalDiv = $("<div>");
      var p = $("<p>");
      p.text("Rating: " + results[i].rating);
      console.log(results[i].rating);

      var animalImage = $("<img>");

      //add src attribute, set to image url
      animalImage.attr("src", results[i].images.fixed_height.url);
      console.log(results[i].images.fixed_height.url);

      // animalDiv.append(p);
      // animalDiv.append(animalImage);
      animalDiv.append(p, animalImage);
      $("#gifs-appear-here").prepend(animalDiv);



      // ==================================
    }

  });
};

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".topic", displayTopicInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();