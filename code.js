var startBtn = document.querySelector(".startButton");
var startDiv = document.querySelector(".quizStart");
var highScores = document.querySelector("#highScores");
var timer = document.querySelector(".timer");
var timeText = document.querySelector(".timeText");
var rightOrWrong = document.querySelector("#answerDisplay");
var questionDisplay = document.querySelector("#questionh2");
var questionIndex = 0;
var timeInterval
var timeLeft = questions.length * 15;
var gameOverDiv = document.querySelector("#gameOverDiv");
var gameend = false;
var inputBox = document.querySelector("#initials");
var scoreHere = document.querySelector("#scoreHere");
var names;
var initialSubmitButton = document.querySelector("#initialSubmitButton");
var savedHighScores = document.querySelector("#savedHighScores");
var highScoreDiv = document.querySelector("#highScoreDiv");
var clearScores = document.querySelector("#clearScores")


// Landing Page/Start Quiz:
startBtn.addEventListener("click", startQuiz);

function startQuiz() {

    gameend = false;
    var timeInterval = setInterval(function () {
        timer.textContent = ("Time: ") + timeLeft;
        timeLeft--;
        timeText.textContent = "";


        if (timeLeft === 0) {
            timer.textContent = "Time: 0";
            clearInterval(timeInterval);
        }
        if (gameend === true) {
            clearInterval(timeInterval);
        }

    }, 1000);

    displayQuestion();

}

function displayQuestion() {

    var question = questions[questionIndex];
    questionDisplay.textContent = question.title;
    document.getElementById("popUpBody").textContent = "";
    for (var i = 0; i < question.choices.length; i++) {
        var createButton = document.createElement("Button");
        document.getElementById("popUpBody").appendChild(createButton);
        createButton.setAttribute("class", "answerBtn");
        createButton.innerHTML = question.choices[i];
        createButton.addEventListener('click', choiceSelected);
    }

}

function choiceSelected(event) {
    var question = questions[questionIndex];
    var answer = question.answer;
    var selectedAnswer = event.target;

    questionIndex++;
    if (questionIndex >= questions.length) {
        gameend = true;
        endOfGame();
        return;
    }

    if (selectedAnswer.innerHTML === answer) {
        // display that is right
        rightOrWrong.textContent = "You are correct!!!";
    }

    else {
        // display that is wrong
        timeLeft = timeLeft - 5;
        rightOrWrong.textContent = "I'm sorry that is wrong!";
    }

    console.log(event.target);
    console.log("correct answer: " + answer);

    displayQuestion();
}

function endOfGame() {
    questionh2.style.display = "none";
    popUpBody.style.display = "none";
    answerDisplay.style.display = "none";
    gameOverDiv.style.display = "block";
    highScoreDiv.style.visibility = "hidden";
    scoreHere.textContent = "Your Score is: " + timeLeft;

}


function storeInitials() {
    //stringify and set "names" in localStorage
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    highscores.push(names)
    localStorage.setItem("highscores", JSON.stringify(highscores));
    renderInitials();
}
initialSubmitButton.addEventListener("click", function (event) {
    event.preventDefault();
    var initialText = inputBox.value.trim();
    var initialsAndScore = { name: initialText, score: timeLeft };

    //  add new initialText to names array
    names = initialsAndScore;

    console.log(names);

    storeInitials();


});






function renderInitials() {
    var storedNames = JSON.parse(localStorage.getItem("highscores")) || [];
    highScoreDiv.style.visibility = "visible";
    questionh2.style.display = "none";
    popUpBody.style.display = "none";
    answerDisplay.style.display = "none";
    gameOverDiv.style.display = "none";
    for (var i = 0; i < storedNames.length; i++) {
        savedHighScores.textContent += "| Name: " + storedNames[i].name + " Score: " + storedNames[i].score + " |" + "\n";
    };
    console.log(storedNames);
    console.log(storedNames.length);

}

//Need to set this up to display in div/hide others
highScores.addEventListener("click", function (event) {
    event.preventDefault();
});










//   MODAL for questions:
var modal = document.querySelector(".modal");

// closeBtn.addEventListener("click", close);
startBtn.addEventListener("click", displayModal);

function displayModal() {
    modal.style.display = "block";
}