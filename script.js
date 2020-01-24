
$(document).ready(function () {

    questionArr = [
        {
            question: "Which built-in method returns the index within the calling String object of the first occurrence of the specified value?",
            choice: ["getIndex()", "location()", "indexOf()", "none of the above"],
            answer: "indexOf()"
        },
        {
            question: "What is the correct syntax for a for loop?",
            choice: ["for (i = 0; i < 5; i++) { // code block to be executed };", "for (i < 0; i < 5; i++) { // code block to be executed };", "for (i = 0; i < 5; x++) { // code block to be executed };", "for (i = 0; i < 5; i++) ( // code block to be executed );"],
            answer: "for (i = 0; i < 5; i++) { // code block to be executed };"

        },
        {
            question: " How do you write 'Hello World' in an alert box?",
            choice: ["msgBox('Hello World');", "alertBox('Hello World');", "msg('Hello World');", "alert('Hello World');"],
            answer: "alert('Hello World');"
        },
        {
            question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
            choice: ["<script href='xxx.js'>", "<script name='xxx.js'>", "<script src='xxx.js'>", "<script file='xxx.js'>"],
            answer: "<script src='xxx.js'>"
        },
        {
            question: "Inside which HTML element do we put the JavaScript??",
            choice: ["<script>", "<javascript>", "<js>", "<scripting>"],
            answer: "<script>"
        }
    ]

    let randomOrder = questionArr.sort(() => Math.random() - 0.5)
    let index = 0;
    let timeLeft = 99;


    const startTimer = function () {
        $("#getReady").hide();
        $(".game").show();
        let timerFunc = setInterval(() => {
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
    $("#start").on("click", startTimer)

    let setQuestion = function () {
        $(".choice").remove()
        let answer = randomOrder[index].answer;
        let quest = $("#questiontitle");
        quest.addClass("h1");
        quest.attr("data-question", randomOrder[index].question);
        quest.text(randomOrder[index].question);

        randomOrder[index].choice.forEach(function (elem) {
            let newLi = $("<li>");
            newLi.text(elem);
            newLi.attr("data-num", elem);
            newLi.addClass("choice");
            $("#answeropts").append(newLi);

            $(".choice").on("click", function (event) {
                let userChoice = $(event.target).attr('data-num')
                console.log(event.target)
                console.log(userChoice)
                console.log(answer)
                if (userChoice === answer) {
                    $(this).addClass("correct");
                }
                 if (userChoice !== answer) {
                    $(this).addClass("incorrect");
                    timeLeft -= 10
                }
            })
        })
        index++
    }
    setQuestion()

    $("#next").on("click", setQuestion)

    let endGame = function() {
        
    }

});

