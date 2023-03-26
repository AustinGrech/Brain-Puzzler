// Get references to DOM elements
var timerShow = document.querySelector('.timer');
var btnStart = document.querySelector('.start-btn');
var HighscorePage = document.querySelector('.highscore');
var rightWrong = document.getElementById("rightwrong");
var gameContainer = document.getElementById('Qcontainer');
var questionId = document.getElementById('question');
var choicesId = document.getElementById("choices");
var scores = document.getElementById("score");
var highScoreNames = document.getElementById('hsnames');
var nameForm = document.getElementById("nameform");
var submitButton = document.getElementById("submit");
var initials = document.getElementById("initials");




// quiz questions, choices, and answers
const addIn = [
  {
    question: "Commonly Used data types DO NOT include:",
    choices: ["strings", "alerts", "booleans", "numbers"],
    answer: "alerts"
  },
  {
    question: "The condition in an if / else statment is enclosed within _____.",
    choices: ["parentheses", "quotes", "curly brackets", "square brackets"],
    answer: "parentheses"
  },
  {
    question: "Arrays in Javascript can be used to store ____.",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above"
  },
  {
    question: "String values must be enclosed within ____ when being assigned to variables",
    choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
    answer: 'quotes'
  },
  {
    question: "A very useful tool to be used during development and debugging for printing content to the debugger is:",
    choices: ["Javascript", "terminal / bash", "for loops", "console log"],
    answer: "console log"
  }
];

// set starting display to none for elements on the page
nameForm.style.display = "none";
scores.style.display = "none";
gameContainer.style.display = "none";
rightWrong.style.display = "none";

// variables to keep track of what question we are on and remaining time
var currentAddIn = 0;
var secondsleft = 100;

//function to start the quiz
function start() {
  
  btnStart.style.display = 'none';
  gameContainer.style.display = '';
  scores.style.display = 'none';
  askMyQuestion();
  setTime(); 
  
}


//function to display questions and choices

function askMyQuestion() {
const question = addIn[currentAddIn];

questionId.textContent = question.question;
choicesId.innerHTML = "";

for (let i = 0; i < question.choices.length; i++) {
  const choice = question.choices[i];

  var choiceDiv = document.createElement("button");

  choiceDiv.innerText = choice;

  choiceDiv.addEventListener("click", function() {

    if (choice === question.answer) {
      rightWrong.style.display = "";
      rightWrong.innerText = "Correct!"
      currentAddIn++;

      if (currentAddIn < addIn.length) {

        askMyQuestion();

      } else {

        gameOver();

      }

    } else {
      rightWrong.style.display = "";
      rightWrong.innerText = "Incorrect!"
      secondsleft -= 10;

      if (secondsleft <= 0) {

        gameOver();

      }
    }
  });
  choicesId.appendChild(choiceDiv);
}
}

//function to display a countdown for the time left
function setTime() {
  
    timerInterval = setInterval(function() {

    secondsleft--;

    timerShow.textContent = 'you have ' + secondsleft + ' seconds left';

    if(secondsleft <= 0) {

      gameOver();//when time hits zero its game over

    }

  }, 1000);

}
//function stops the time 
function gameOver() {

  clearInterval(timerInterval)

  gameContainer.style.display = "none";

  nameForm.style.display = "";

  rightWrong.style.display = "none";

}

// an array to push values for initials and time
var nameBox = [];
//function showing highscores of players
function showScore() {
  
  initialString = localStorage.getItem("score");
  
 
  HighscorePage.textContent = "Restart the quiz!";

  nameForm.style.display = "none";

  scores.style.display = "";

  HighscorePage.addEventListener("click", function(event){

    event.preventDefault()

    location.reload()

  })

  for (var i = 0; i < nameBox.length; i++) {

  var scoreId = document.createElement("li");

  scoreId.textContent = nameBox[i].initial + " finished with " + nameBox[i].timeLeft + " seconds left";

  highScoreNames.appendChild(scoreId);

  }
  
}

//event listener which submits the players initials and time left when the submit button is entered
submitButton.addEventListener("click", function(event) {

  event.preventDefault();

  var initial = document.querySelector("#initials").value;

  if (!initial) {
    alert("Please enter your initials!");
    return;
  }
  
  var timeLeft = secondsleft

  var personScore = {

    initial: initial,

    timeLeft: timeLeft

  };

  localStorage.setItem(initial, timeLeft)
  

  nameBox.push(personScore);
  

  showScore();
  
})
// for loop used to get the initials and time left of the player and adding it to the array nameBox
for (var i = 0; i < localStorage.length; i++) {

  var key = localStorage.key(i)

  var value = localStorage.getItem(key);

  var personScore = {

    initial: key,

    timeLeft: value

  };

  nameBox.push(personScore);

}

// event listener so when the view highscore is clicked it shows the highscores of players.
HighscorePage.addEventListener("click", function(event){

  event.preventDefault()

  btnStart.style.display = "none";

  HighscorePage.textContent = "Restart the quiz!"

  showScore()

// event listener for when you are looking at highscores you can click the option to restart the quiz.  
  HighscorePage.addEventListener("click", function(event){

    event.preventDefault()

    location.reload()

  })
})

// event listener to start the game
btnStart.addEventListener("click", start);