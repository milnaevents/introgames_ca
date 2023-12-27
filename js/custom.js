//list of game name constants
GAME_WORDCONNECTIONS_INDEX = 0;
GAME_NAME3_INDEX = 1;
GAME_OVERKILL_INDEX = 2;
GAME_SAYWITHOUTSAYING_INDEX = 3;
GAME_NOENGLISH_INDEX = 4;

//word connection strings array
TOPICS_WORDCONNECTIONS = ["Mother-In-Law", "Monkeys", "Dog", "Spicy", "Pepper", "Mouse", "Grass", "Books", "Computer","Carrot","Uncle","Cousin","Truck", "Bucket", "Coffee","Bus", "Backpack","Pencil", "Phone", "Spring", "Soccer", "Ball", "Tape", "Bird", "Vitamin", "Radio", "Online"
];

UNUSED_WORDCONNECTIONS = TOPICS_WORDCONNECTIONS.slice();


$(document).ready(function(){
   $("#word-connection").click(function(){
    $(this).closest(".middle-div").find("#w-connection").addClass("active")
   })
   $(".btn-close").click(function(){
    $(this).closest(".middle-div").find("#w-connection").removeClass("active");
    //reset the page and timer
    clearTimer();
    $("#wordConnectionsDescription").css("height", "auto");
    $("#startedWordConnectionsPanel").hide();
    $("#unstartedWordConnectionsPanel").show();

   })
   $("#no-english").click(function(){
    $(this).closest(".middle-div").find("#noenglish").addClass("active")
   })
   $(".btn-close").click(function(){
    $(this).closest(".middle-div").find("#noenglish").removeClass("active")
   })

   //Word connections start button press
   $(".start-button").click(function(){
    $(this).parent().fadeOut(400);
    //Get word from dicitionary and replace it's text
    SetNextTopic(GAME_WORDCONNECTIONS_INDEX, "#WordConnectionsTextID");
    $("#startedWordConnectionsPanel").fadeIn(400);
    $("#wordConnectionsDescription").css("height", "40%");
   })

   $("#NextWordConnectionButton").click(function() {
    $(this).parent().hide();

    $(this).parent().fadeIn(500);
    
    SetNextTopic(GAME_WORDCONNECTIONS_INDEX, "#WordConnectionsTextID");
   })
   
})

function getRandomInt(totalItems){
    return Math.floor(Math.random() * totalItems);
}

function getNextTopic(){
    if(UNUSED_WORDCONNECTIONS.length < 2){
        UNUSED_WORDCONNECTIONS = TOPICS_WORDCONNECTIONS.slice();
    }
    
    //we want to ensure the same topics don't reappear
    var randomInt = getRandomInt(UNUSED_WORDCONNECTIONS.length);
    var returnTopic = UNUSED_WORDCONNECTIONS[randomInt];

    UNUSED_WORDCONNECTIONS[randomInt] = "";
    UNUSED_WORDCONNECTIONS = UNUSED_WORDCONNECTIONS.filter(a => {return a});

    return returnTopic;
}

function SetNextTopic(gameIndex, textObjectID){
    clearTimer();
    if(gameIndex == GAME_WORDCONNECTIONS_INDEX){
        var topic = getNextTopic();
        $(textObjectID).text(topic);
    } else {
        $(textObjectID).text("testing2");
    }
    startTimer = setInterval(updateTimer, 1000);
}



// Define a function that takes an integer as a parameter
function convertToMinSec(num) {
  // Check if the parameter is a valid integer
  if (Number.isInteger(num)) {
    // Calculate the minutes and seconds from the integer
    var minutes = Math.floor(num / 60);
    var seconds = num % 60;

    // Format the minutes and seconds with leading zeros if needed
    var minStr = minutes.toString().padStart(2, "0");
    var secStr = seconds.toString().padStart(2, "0");

    // Return the formatted string
    return minStr + ":" + secStr;
  } else {
    // Return an error message if the parameter is not an integer
    return "Invalid input";
  }
}

var timer = document.getElementById("wordConnectionsTimerText");

// Set the initial time in seconds
var timeElapsed = 0;


let startTimer;

function clearTimer() {
    timer.innerHTML = convertToMinSec(0);
    timeElapsed = 0;
    clearInterval(startTimer);
}

function updateTimer(){
    // Display the time in the timer element
    timeElapsed++;
    timer.innerHTML = convertToMinSec(timeElapsed);
    
}