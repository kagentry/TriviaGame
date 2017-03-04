// global variables
var correct = 0;
var incorrect = 0;
var unanswered = 0;

// timer variables
var c = 30;
var t;

// questions array of objects
var questions = [{
	quest:"What is the fastest fish in the ocean?",
	corrAnswer: "Sailfish",
	answers: ["Barracuda", "Sailfish", "Tuna", "Mackerel"],
	userChoice: ""
},
{
	quest:"What is the world's largest ocean?",
	corrAnswer: "Pacific Ocean",
	answers: ["Indian Ocean", "Artic Ocean", "Atlantic Ocean", "Pacific Ocean"],
	userChoice: ""
},
{
	quest:"What percent of Earth is covered in water?",
	corrAnswer: "70%",
	answers: ["70%", "30%", "90%", "80%"],
	userChoice: ""
},
{
	quest:"What is the world's largest fish?",
	corrAnswer: "Whale Shark",
	answers: ["Great White Shark", "Basking Shark", "Nurse Shark", "Whale Shark"],
	userChoice: ""
},
{
	quest:"What is the most popular seafood in America?",
	corrAnswer: "Shrimp",
	answers: ["Salmon", "Shrimp", "Catfish", "Crab"],
	userChoice: ""
},
{
	quest:"What is a group of dolphins called?",
	corrAnswer: "A Pod",
	answers: ["A Pod", "A Crash", "A Pack", "A Bale"],
	userChoice: ""
}
];

// FUNCTIONS

// displays the questions and  answers for the game
function trivia(){
	var q = $("#game");

	for (var i = 0; i < questions.length; i++){
		// append question to tag with id game
		q.append("<p>" + questions[i].quest + "</p>");
		for (var j = 0; j < questions[i].answers.length; j++){
			var a = questions[i].answers[j];
			// append answers to each question to tag with element game
			q.append("<input type='radio' name='" + i + "'" + "value=" + "'" + a + "'" + "> " + a + " ");
		}
		q.append("<br><br>");
	}

	// append "Done" button to end of form 
	var dnButton = $("<button>");
	dnButton.attr({
		type: "button",
		id: "done",
		class: "btn btn-primary btn-lg"
	});
	dnButton.text("Done");
	q.append(dnButton);
}

// stores user input into array of objects
function storeInput(index, choice) {
	questions[index].userChoice = choice;
}

// checks radio inputs for user's selected answers
function checkInputs() {
	var q = questions;

	for (var i =0; i < q.length; i++){
		if (q[i].userChoice === q[i].corrAnswer){
			correct++;
		}
		else if (q[i].userChoice === ""){
			unanswered++;
		}
		else {
			incorrect++;
		}
	}
}

// displays the results for the game
function results() {

	// clear timer
	clearTimeout(t);

	// display results to screen
	$("#correct").text(correct);
	$("#incorrect").text(incorrect);
	$("#unanswered").text(unanswered);
}

// function that counts down timer
function countdown(){

	// if timer runs out, switch to results page
	if (c == 0){
		$("#game").hide();
		$("#results").show();

		checkInputs();
		results();
	}

	// show countdown 
	$("#time").text(c);
	c--;
	t = setTimeout(function() {countdown()}, 1000);
}

// after html loaded
$(document).ready(function() {
	// hide game and results divs
	$("#game").hide();
	$("#results").hide();

	$("#start").on("click",function(){
		// remove start button and show game
		this.remove();

		// show hidden game div
		$("#game").show();

		// start countdown
		countdown();
		// display questions and answers
		trivia();		
	})
	
	// gets user inputs and stores them inside userChoice in 
	// array of objects
	$(document).on("click", "input", function(){
		// alert("User choice: " + $(this).val());
		var uChoice = $(this).val();
		var index = $(this).attr("name");

		// FOR TESTING 
		console.log("uchoice: " + uChoice);
		console.log("index: " + index);

		// store user inputs in userChoice in  appropriate index 
		storeInput(index, uChoice);

	})

	// done button that transfers data to results page
	$(document).on("click", "#done", function(){
		// hide game questions
		$("#game").hide();

		// show results page
		$("#results").show();
		checkInputs();
		results();
	})	
});