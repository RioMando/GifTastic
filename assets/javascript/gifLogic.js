//initial array of animals
var topics = ["Bunny", "Coyote", "Deere", "Eagle", "Elephant",
              "Golden Retriever", "Horse", "Owl", "Penguin",
              "Rabbit", "Shark"];
var state = 'stil';

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
    $("#topic-view").empty();
    // Creating a div to hold the topic
    for (var i = 0; i < results.length; i++) {
      var topicDiv = $("<div class='gif'>");
      // Storing the rating data
      var rating = results[i].rating;
      // Creating an element to have the rating displayed
      var provOne = $("<p>").text("Rating: " + rating);
      // Displaying the rating
      topicDiv.append(provOne);
        
      // Creating an element to hold the image and its attributes   
      var gifURL = results[i].images.fixed_height_still.url;
      var image = $("<img>").attr("src", gifURL);
      image.attr("data-still", results[i].images.fixed_height_still.url);
      image.attr("data-animate", results[i].images.fixed_height.url);
      image.attr("data-state", 'still');
      // Appending the image
      topicDiv.append(image);
      
      // Putting the entire topic below the previous topics
      $("#topic-view").prepend(topicDiv);
    }
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
  $(this).attr("buttons-view");
  // This line grabs the input from the textbox
  var topic = $("#topic-input").val().trim();
  // Adding topic from the textbox to our array
  topics.push(topic);
  // Calling renderButtons which handles the processing of our topic array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "topic"
$("#buttons-view").on("click", ".topic", displayTopicGif);
    
$("#topic-view").on("click", "img", function() {
    var state = $(this).attr("data-state");
  if (state === 'still') {
    $(this).attr("data-state", "animate");
    $(this).attr("src", $(this).attr("data-animate"));
  } else {
    $(this).attr("data-state", "still");
    $(this).attr("src", $(this).attr("data-still"));
  }
});

// Calling the renderButtons function to display the intial buttons
renderButtons();