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
   
})