
$(document).ready(function () {

    questionArr = [ // Question Array
        {
            question: "Which built-in method returns the index within the calling String object of the first occurrence of the specified value?",
            choice: ["getIndex()", "location()", "indexOf()", "none of the above"],
            answer: 2
        },
        {
            question: "What is the correct syntax for a for loop?",
            choice: ["for (i = 0; i < 5; i++) { // code block to be executed };", "for (i < 0; i < 5; i++) { // code block to be executed };", "for (i = 0; i < 5; x++) { // code block to be executed };", "for (i = 0; i < 5; i++) ( // code block to be executed );"],
            answer: 0

        },
        {
            question: " How do you write 'Hello World' in an alert box?",
            choice: ["msgBox('Hello World');", "alertBox('Hello World');", "msg('Hello World');", "alert('Hello World');"],
            answer: 3
        },
        {
            question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
            choice: ["<script href='xxx.js'>", "<script name='xxx.js'>", "<script src='xxx.js'>", "<script file='xxx.js'>"],
            answer: 2
        },
        {
            question: "Inside which HTML element do we put the JavaScript??",
            choice: ["<script>", "<javascript>", "<js>", "<scripting>"],
            answer: 0
        }
    ]

    let randomOrder = questionArr.sort(() => Math.random() - 0.5); //Randomizes the order of questionArr
    let index = 0; // Sets index of first question object to 0
    let timeLeft = 99;
    let timerFunc;
    let userChoice;


    function startTimer() { // This function hides my start screen and displays the questions
        $("#getReady").hide();
        $(".game").show();
        timerFunc = setInterval(function () { // Timer starts counting down 
            $("#timer").text(timeLeft);
            timeLeft--;
            if (timeLeft < 0) {
                clearInterval(timerFunc); // When timer reaches 0 it hides the questions and shows my save score div
                $("#timer").text("0");
                $(".questBox").hide();
                $(".saveScore").show();
            }
        }, 1000)

    }

    $("#start").on("click", startTimer); // event listener for startTimer func

    function startQuiz() { // this beast of a function runs the whole quiz...
        if ((userChoice === null) && (index >= 1)) { //checks that user selected an answer
            return;
        }
        if (index === randomOrder.length) { // checks if user has reached the end of the questions and if so calls endGame func
            endGame();
            return;
        }
        $(".choice").remove(); //removes previously created li choices
        let answer = randomOrder[index].answer; // question generator 
        let quest = $("#questiontitle");
        quest.addClass("h1");
        quest.attr("data-question", randomOrder[index].question);
        quest.text(randomOrder[index].question);

        userChoice = null;
        randomOrder[index].choice.forEach(function (elem, eIndex) { // creates and assigns text to choice li
            let newLi = $("<li>");
            newLi.text(elem);
            newLi.attr("data-num", eIndex);
            newLi.addClass("choice");
            $("#answeropts").append(newLi);

            $(".choice").on("click", function (event) { //event listener for user choices
                userChoice = $(event.target).attr('data-num');
                if (parseInt(userChoice) === answer) {
                    event.stopImmediatePropagation()
                    $(this).addClass("correct");
                    $(".choice").off("click");
                }
                if (parseInt(userChoice) !== answer) {
                    event.stopImmediatePropagation()
                    $(this).addClass("incorrect");
                    $(".choice").off("click");
                    timeLeft = (timeLeft - 10);
                }
            })
        })


        index++;
    }
    startQuiz();

    $("#next").on("click", startQuiz); //event listener to start the quiz and provide first question 

    function endGame() { // defines what happens after the user has answered the last question 
        clearInterval(timerFunc);
        $(".questBox").hide();
        $(".saveScore").show();
        displayScore();
    }

    function displayScore() { // displays the score for the user to see
        $("#result").text(timeLeft + 1);
    }

    function getHighScores() { // gets saved high scores from local storage
        let myHighScores = JSON.parse(localStorage.getItem("highScores"));
        if (myHighScores === null) {
            myHighScores = [];
        }

        return myHighScores;
    }

    function storeMyScore(highScores) { // function for setting high scores in local storage
        localStorage.setItem("highScores", JSON.stringify(highScores));
    }

    $("#submit").on("click", function (event) { // allows user to submit score and set it in local storage 
        event.preventDefault();

        let initials = $("#name").val();

        if (initials === "") {
            return;
        }

        let newScore = `${initials} ${timeLeft + 1}`;
        let highScores = getHighScores();
        highScores.push(newScore);

        storeMyScore(highScores);
        $("#name").val(" ")
        window.location.href = "highscore.html"

    })

    function displayHighScore() { // displays high scores in highscore.html
        highScores = getHighScores();
        highScores.forEach(function (item) {
            newH2 = $("<h2>");
            newH2.text(item);
            $("#highH1").append(newH2);
        })
    }
    displayHighScore()


    $("#clear").on("click", function () { // allows user to erase scores from local storage 
        localStorage.clear()
        location.reload()
    })

});

