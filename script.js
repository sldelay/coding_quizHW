
$(document).ready(function () {

    questionArr = [
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

    let randomOrder = questionArr.sort(() => Math.random() - 0.5);
    let index = 0;
    let timeLeft = 99;
    let timerFunc;


    function startTimer() {
        $("#getReady").hide();
        $(".game").show();
        timerFunc = setInterval(function() {
            $("#timer").text(timeLeft);
            timeLeft--;
            if (timeLeft < 0) {
                clearInterval(timerFunc);
                $("#timer").text("0");
                $(".questBox").hide();
                $(".saveScore").show();
            }
        }, 1000)

    }

    $("#start").on("click", startTimer);

    function setQuestion() {
        if (index === randomOrder.length) {
            endGame();
            return;
        }
        $(".choice").remove();
        let answer = randomOrder[index].answer;
        let quest = $("#questiontitle");
        quest.addClass("h1");
        quest.attr("data-question", randomOrder[index].question);
        quest.text(randomOrder[index].question);

        randomOrder[index].choice.forEach(function (elem, eIndex) {
            let newLi = $("<li>");
            newLi.text(elem);
            newLi.attr("data-num", eIndex);
            newLi.addClass("choice");
            $("#answeropts").append(newLi);
        })

        $(".choice").on("click", function (event) {
            let userChoice = $(event.target).attr('data-num');
            if (parseInt(userChoice) === answer) {
                $(this).addClass("correct");
                $(".choice").off("click");
            }
            if (parseInt(userChoice) !== answer) {
                $(this).addClass("incorrect");
                $(".choice").off("click");
                timeLeft -= 10;
            }
        })
        index++;
    }
    setQuestion();

    $("#next").on("click", setQuestion);

    function endGame() {
        clearInterval(timerFunc);
        $(".questBox").hide();
        $(".saveScore").show();
        displayScore();
    }

    function displayScore() {
        $("#result").text(timeLeft + 1);
    }

    function getHighScores() {
        let myHighScores = JSON.parse(localStorage.getItem("highScores"));
        if (myHighScores === null) {
            myHighScores = [];
        }

        return myHighScores;
    }

    function storeMyScore(highScores) {
        localStorage.setItem("highScores", JSON.stringify(highScores));
    }

    $("#submit").on("click", function(event) {
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

    function displayHighScore() {
        highScores = getHighScores();
        highScores.forEach(function(item) {
            newH2 = $("<h2>");
            newH2.text(item);
            $("#highH1").append(newH2);
        })
    } 
    displayHighScore()


    $("#clear").on("click", function() {
        localStorage.clear()
        location.reload()
    })

});

