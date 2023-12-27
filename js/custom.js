//list of game name constants
GAME_WORDCONNECTIONS_INDEX = 0;
GAME_NAME3_INDEX = 1;
GAME_OVERKILL_INDEX = 2;
GAME_SAYWITHOUTSAYING_INDEX = 3;
GAME_NOENGLISH_INDEX = 4;
GAME_COUNT_INACTIVE = 5;

ACTIVE_GAME_INDEX = GAME_COUNT_INACTIVE;

UNUSED_TOPICS = [];

//word connections
TOPICS_WORDCONNECTIONS = ["Mother-In-Law", "Monkeys", "Dog", "Spicy", "Pepper", "Mouse", "Grass", "Books", "Computer","Carrot","Uncle","Cousin","Truck", "Bucket", "Coffee","Bus", "Backpack","Pencil", "Phone", "Spring", "Soccer", "Ball", "Tape", "Bird", "Vitamin", "Radio", "Online"
];


//Name 3 
NAME3_BASESTRING = "Name 3 ";

TOPICS_NAME3 = [ "Spices", "T-Shirt Sizes", "Cellular Service Providers", "Shoe Companies", "Laptop manufacturers", "Vitamins", "Airlines", "Cities", "Pets", "Chocolate Brands", "Water bottle companies", "Types of Bread", "Kitchen Appliances", "Countries", "Spoken Languages", "Social Media Apps", "Cuisines", "Male Actors", "Sports", "TV Shows"
];


//Overkill 
TOPICS_OVERKILL = [ "Male Actors", "Female Actors", "Movies", "Sports", "TV Shows", "Cartoons", "Animals", "Clothing Brands", "Smartphone Makers"
];

//Say Without Saying
TOPICS_SAYWITHOUTSAYING = [ "Samosa", "Pen", "Headphones", "Doctor"
];


function activateSidebar(clickObj, nearbyID){
	$(clickObj).closest(".middle-div").find(nearbyID).addClass("active");
}

function resetPanelVisuals(){
	//reset the description height back to 60%
	var descriptions = document.getElementsByClassName("gamedescription");
	for (var i = 0; i < descriptions.length; i++) {
		$(descriptions[i]).css("height", "60%");
	}

	//hide the started panels
	var startedPanels = document.getElementsByClassName("startedPanel");
	for (var i = 0; i < descriptions.length; i++) {
		$(startedPanels[i]).hide();
	}

	//show the unstarted panels
	var unstartedPanels = document.getElementsByClassName("unstartedPanel");
	for (var i = 0; i < descriptions.length; i++) {
		$(unstartedPanels[i]).show();
	}
}

function deactivateSidebars(clickObj){
	clearTimer();
	resetPanelVisuals();

	//remove the active class from each of the sidebar pages
	$(clickObj).closest(".middle-div").find("#w-connection").removeClass("active");
	$(clickObj).closest(".middle-div").find("#noenglish").removeClass("active");
	$(clickObj).closest(".middle-div").find("#name3_page").removeClass("active");
	$(clickObj).closest(".middle-div").find("#overkill").removeClass("active");
	$(clickObj).closest(".middle-div").find("#saywithoutsaying").removeClass("active");

	UNUSED_TOPICS = [];
}



$(document).ready(function(){
	//clicking close-x on any sidebar, regardless of game
	$(".btn-close").click(function(){
		deactivateSidebars(this);
		ACTIVE_GAME_INDEX = GAME_COUNT_INACTIVE;
	})	

	$("#word-connection-card").click(function(){
		activateSidebar(this, "#w-connection");
		ACTIVE_GAME_INDEX = GAME_WORDCONNECTIONS_INDEX;
	})

	$("#name3-card").click(function(){
		activateSidebar(this, "#name3_page");
		ACTIVE_GAME_INDEX = GAME_NAME3_INDEX;
	})
   
	$("#no-english-card").click(function(){
		activateSidebar(this, "#noenglish");
		ACTIVE_GAME_INDEX = GAME_NOENGLISH_INDEX;
	})

	$("#overkill-card").click(function(){
		activateSidebar(this, "#overkill");
		ACTIVE_GAME_INDEX = GAME_NOENGLISH_INDEX;
	})

	$("#saywithoutsaying-card").click(function(){
		activateSidebar(this, "#saywithoutsaying");
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
		resetPanelVisuals();
		
	})
   
})

function getRandomInt(totalItems){
	return Math.floor(Math.random() * totalItems);
}

//we want to ensure the next random topic was unused in the current session so far
function getNextTopic(){
	var randomInt, returnTopic;
	
	switch(ACTIVE_GAME_INDEX) {
		case GAME_WORDCONNECTIONS_INDEX:
			if(UNUSED_TOPICS.length < 2){
				UNUSED_TOPICS = TOPICS_WORDCONNECTIONS.slice();
			}
			
		case GAME_NAME3_INDEX:
			if(UNUSED_TOPICS.length < 2){
				UNUSED_TOPICS = TOPICS_NAME3.slice();
			}
			
		case GAME_OVERKILL_INDEX:
			if(UNUSED_TOPICS.length < 2){
				UNUSED_TOPICS = TOPICS_OVERKILL.slice();
			}
		case GAME_SAYWITHOUTSAYING_INDEX:
			if(UNUSED_TOPICS.length < 2){
				UNUSED_TOPICS = TOPICS_SAYWITHOUTSAYING.slice();
			}
	}

	randomInt = getRandomInt(UNUSED_TOPICS.length);
	returnTopic = UNUSED_TOPICS[randomInt];

	UNUSED_TOPICS[randomInt] = "";
	UNUSED_TOPICS = UNUSED_TOPICS.filter(a => {return a});

	return returnTopic;
}

function ApplyTopicToHTML(t){
	var topictexts = document.getElementsByClassName("topictext");
	for (var i = 0; i < topictexts.length; i++) {
		$(topictexts[i]).text(t);
	}

	var startedPanels = document.getElementsByClassName("startedPanel");
	for (var i = 0; i < startedPanels.length; i++) {
		$(startedPanels[i]).fadeIn(400);
	}

	var descriptions = document.getElementsByClassName("gamedescription");
	for (var i = 0; i < descriptions.length; i++) {
		$(descriptions[i]).css("height", "40%");
	}
}


function SetNextTopic(){
	clearTimer();
	var topic = getNextTopic();


	if(ACTIVE_GAME_INDEX == GAME_NOENGLISH_INDEX){
		//no english is the only game without topics
		$("#startedNoEnglishPanel").fadeIn(400);
	} else {
		ApplyTopicToHTML(topic);
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