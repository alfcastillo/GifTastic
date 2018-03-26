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
    // Boostrap Button Format
    topicButton.addClass("btn btn-info");
    // Provided the initial button text
    topicButton.text(topicsArray[i]);
    // Added the button to the buttons-view div
    $("#buttons-view").append(topicButton);
  }
}

// This function handles events where the add topic button is clicked
// $("#add-topic").on("click", function (event) {
function addTopic() {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var topic = $("#topic-input").val();
  $("#topic-input").val("");
  // The topic from the textbox is then added to topic array
  topicsArray.push(topic);
  // Calling renderButtons which handles the processing of our topic array
  renderButtons();
};

// Display Topic Image
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
    console.log(response);
    var results = response.data;
    console.log(results);
    // ========================
    for (var i = 0; i < results.length; i++) {
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
      topicDiv.append(p, topicImage);
      $("#gifs-appear-here").prepend(topicDiv);
    }
  });
};


// ANIMATING GIFs
function animateGif() {

  // $(".gif").on("click", function() {
  console.log("GIF was Clicked");
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
  console.log("New State--> " + $(this).attr("data-state"));
};


// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".topic", displayTopicInfo);
$(document).on("click", ".gif", animateGif);
$(document).on("click", "#add-topic", addTopic);

// Calling the renderButtons function to display the intial buttons
renderButtons();