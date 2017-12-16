//initial array of animals
var topics = ["Wolf", "Owl", "Shark"];
var state = 'stil';

// displaytopicInfo function re-renders the HTML to display the appropriate content
function displayTopicGif() {
  console.log("hola");
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
    
    // Add attributes to store the url for still and animate gifs
    topicDiv.attr("data-still", results[0].images.fixed_height_still.url);
    topicDiv.attr("data-animate", results[0].images.fixed_height.url);
    topicDiv.attr("data-state", 'still');
    topicDiv.addClass("gif");
 
    // Creating an element to hold the image    
    var gifURL = results[0].images.fixed_height_still.url;
    var image = $("<img>").attr("src", gifURL);
    // Appending the image
    topicDiv.append(image);

    // Putting the entire topic below the previous topics
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
  $(this).attr("buttons-view");
  // This line grabs the input from the textbox
  var topic = $("#topic-input").val().trim();
  //var state = 'still';
 // $(this).attr("data-state", 'still');
  // Adding topic from the textbox to our array
  topics.push(topic);
  // Calling renderButtons which handles the processing of our topic array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "topic"
//$(document).on("click", ".topic", displayTopicGif);
$("#buttons-view").on("click", ".topic", displayTopicGif);


$(document).on("click", ".gif", function() {
    $(".gif").empty();
    console.log(this);
    var state = $(this).attr("data-state");
    console.log(state);

    var topicImage = $("<img>");

//     var newState = $(this).attr("data-state");
//     if (state === 'still') {
//       console.log("URL animate: " + $(this).attr("data-animate"));
//       topicImage.attr("src", $(this).attr("data-animate"));
//        "animate")
// //      $(this).attr("data-state", "animate")
//     } else {
// //      topicImage.attr("src", $(this).attr("data-still"));
//       newState.attr("src", $(this).attr("data-still"));
//       $(this).attr("data-state", "still")
//     }
  if (state === 'still') {
    $("#topic-view").append("<img src='"+$(this).attr("data-animate")+"'/>");
    $(this).attr("data-state", "animate")
    console.log("value: " + $(this).attr("data-state"));
  } else {
    $("#topic-view").append("<img src='"+$(this).attr("data-still")+"'/>");
    $(this).attr("data-state", "still")
    //$("src").text("data-animate");
    //$("data-animate").text("animate");
    //$("img")
  }

//    $(this).append(newState);
    $("#topic-view").prepend(topicImage);
    console.log(state);
});

  //  $("#topic-view").prepend(topicDiv);
// Calling the renderButtons function to display the intial buttons
renderButtons();

//    $("#topic-view").prepend(topicDiv);


/* NEXT STEPS:
 -  Fix the bug and make the gifs to stops
 -  clean the code
 -  Make the gifs to stand one next to the other 
