//list of game name constants
GAME_WORDCONNECTIONS_INDEX = 0;
GAME_NAME3_INDEX = 1;
GAME_OVERKILL_INDEX = 2;
GAME_SAYWITHOUTSAYING_INDEX = 3;
GAME_NOENGLISH_INDEX = 4;

//word connection strings array
TOPICS_WORDCONNECTIONS = [
    "Mother-In-Law",
    "Monkeys",
    "Dog",
    "Spicy",
    "Pepper",
    "Mouse",
    "Grass",
    "Books",
    "Computer",
    "Carrot"
];


$(document).ready(function(){
   $("#word-connection").click(function(){
    $(this).closest(".middle-div").find("#w-connection").addClass("active")
   })
   $(".btn-close").click(function(){
    $(this).closest(".middle-div").find("#w-connection").removeClass("active")

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

function SetNextTopic(gameIndex, textObjectID){
    if(gameIndex == GAME_WORDCONNECTIONS_INDEX){
        var maxlength = TOPICS_WORDCONNECTIONS.length;
        var randomInt = getRandomInt(maxlength);
        $(textObjectID).text(TOPICS_WORDCONNECTIONS[randomInt % maxlength]);
    } else {
        $(textObjectID).text("testing2");
    }

    
}