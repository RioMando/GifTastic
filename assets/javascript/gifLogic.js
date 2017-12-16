//initial array of animals
var topics = ["Wolf", "Parrot", "Shark"];

// displaytopicInfo function re-renders the HTML to display the appropriate content
function displayTopicGif() {
  var topic = $(this).attr("data-topic");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=o5oJjBD6Z8fdo8OHzItaZj732NPz7shu&q=" + topic + "&limit=10&offset=0&rating=Y&lang=en";
  // Creating an AJAX call for the specific topic button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response);
    var results = response.data;
    // Creating a div to hold the topic
    var topicDiv = $("<div class='topic'>");
    // Storing the rating data
    var rating = results[0].rating;
    console.log("Raatingg: " + rating);
    // // Creating an element to have the rating displayed
    var provOne = $("<p>").text("Rating: " + rating);
    // Displaying the rating
    topicDiv.append(provOne);

    // Retrieving the URL for the GIG
    var gifURL = results[0].images.fixed_height.url;
  console.log("URL: " + results[0].images);  
    // Creating an element to hold the image
    var image = $("<img>").attr("src", gifURL);
    // Appending the image
    topicDiv.append(image);
    // Putting the entire topic above the previous topics
    $("#topic-view").prepend(topicDiv);
  });
}

// Function for displaying topic data
function renderButtons() {
  // Deleting the topics prior to adding new topics
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();
  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {
    // Then dynamicaly generating buttons for each topic in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of topic to our button
    a.addClass("topic");
    // Adding a data-attribute
    a.attr("data-topic", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a topic button is clicked
$("#add-topic").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var topic = $("#topic-input").val().trim();
  // Adding topic from the textbox to our array
  topics.push(topic);
  // Calling renderButtons which handles the processing of our topic array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "topic"
$(document).on("click", ".topic", displayTopicGif);
// Calling the renderButtons function to display the intial buttons
renderButtons();