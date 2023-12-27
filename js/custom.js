//list of game name constants
GAME_WORDCONNECTIONS_INDEX = 0;
GAME_NAME3_INDEX = 1;
GAME_OVERKILL_INDEX = 2;
GAME_SAYWITHOUTSAYING_INDEX = 3;
GAME_NOENGLISH_INDEX = 4;
GAME_COUNT_INACTIVE = 5;

ACTIVE_GAME_INDEX = GAME_COUNT_INACTIVE;

//word connection strings array
TOPICS_WORDCONNECTIONS = ["Mother-In-Law", "Monkeys", "Dog", "Spicy", "Pepper", "Mouse", "Grass", "Books", "Computer","Carrot","Uncle","Cousin","Truck", "Bucket", "Coffee","Bus", "Backpack","Pencil", "Phone", "Spring", "Soccer", "Ball", "Tape", "Bird", "Vitamin", "Radio", "Online"
];

UNUSED_WORDCONNECTIONS = TOPICS_WORDCONNECTIONS.slice();

function activateSidebar(clickObj, nearbyID){
	$(clickObj).closest(".middle-div").find(nearbyID).addClass("active");
}

function resetPanelVisuals(descID, startedID, unstartedID){
	$(descID).css("height", "auto");
	$(startedID).hide();
	$(unstartedID).show();
}

function deactivateSidebars(clickObj){
	clearTimer();
	
	//Word Connections
	resetPanelVisuals("#wordConnectionsDescription", "#startedWordConnectionsPanel", "#unstartedWordConnectionsPanel");
	$(clickObj).closest(".middle-div").find("#w-connection").removeClass("active");
	
	//No English
	resetPanelVisuals("#noenglishDescription", "#startedNoEnglishPanel", "#unstartedNoEnglishPanel");
	$(clickObj).closest(".middle-div").find("#noenglish").removeClass("active");
}



$(document).ready(function(){
	//clicking close-x on any sidebar, regardless of game
	$(".btn-close").click(function(){
		deactivateSidebars(this);
		ACTIVE_GAME_INDEX = GAME_COUNT_INACTIVE;
	})	

	$("#word-connection").click(function(){
		activateSidebar(this, "#w-connection");
		ACTIVE_GAME_INDEX = GAME_WORDCONNECTIONS_INDEX;
	})
   
	$("#no-english").click(function(){
		activateSidebar(this, "#noenglish");
		ACTIVE_GAME_INDEX = GAME_NOENGLISH_INDEX;
	})
	

	$(".start-button").click(function(){
		$(this).parent().fadeOut(400);
		SetNextTopic();
	})

	$(".next-button").click(function() {
		$(this).parent().hide();
		$(this).parent().fadeIn(500);
		SetNextTopic();
	})

	$(".stop-button").click(function() {
		clearInterval(startTimer);	
		$(this).parent().hide();
		$(this).parent().fadeIn(500);
		resetPanelVisuals("#noenglishDescription", "#startedNoEnglishPanel", "#unstartedNoEnglishPanel");
		
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

function SetNextTopic(){
	clearTimer();
	if(ACTIVE_GAME_INDEX == GAME_WORDCONNECTIONS_INDEX){
		var topic = getNextTopic();
		$("#WordConnectionsTextID").text(topic);
		$("#startedWordConnectionsPanel").fadeIn(400);
		$("#wordConnectionsDescription").css("height", "40%");
	} else if(ACTIVE_GAME_INDEX == GAME_NOENGLISH_INDEX){
		$("#startedNoEnglishPanel").fadeIn(400);
	}
	//todo: other games types

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

var timerTexts = document.getElementsByClassName("timervalue");

// Set the initial time in seconds
var timeElapsed = 0;

let startTimer;

function clearTimer() {
	for (var i = 0; i < timerTexts.length; i++) {
		timerTexts[i].innerHTML = convertToMinSec(0);
	}
	
	timeElapsed = 0;
	clearInterval(startTimer);
}

function updateTimer(){
	// Display the time in the timer element
	timeElapsed++;
	for (var i = 0; i < timerTexts.length; i++) {
		timerTexts[i].innerHTML = convertToMinSec(timeElapsed);
	}
}