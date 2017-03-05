$(document).ready(function () {

    $("h1").html("Math Trivia!");

    var clear;
    var trivia = {
        questions: ["What is 1 + 1?", "What is 7 - 5?", "What is 2 x 4?", "What is 9 / 3?", "What does E=?"],
        correctAnswers: ["2", "2", "8", "3", "mc^2"],
        count: 0,
        answeredCorrect: 0,
        answeredIncorrect: 0,
        display: function () {
            $(".timer").empty();
            if (this.count !== this.questions.length) {
                this.displayQuestion();
                this.displayAnswers();
            } else {
                $(".container").html("<hr>End of Trivia!!!!!!!<hr>");
                $(".container").append("You got " + this.answeredCorrect + " right<hr>");
                $(".container").append("You got " + this.answeredIncorrect + " wrong<hr>");
                $(".container").append($('<button class="reset" >Restart</button>'));
            }
        },
        // DISPLAY QUESTION DUHHH
        displayQuestion: function () {
            this.timer(10);
            $(".container").html('<div class="content question">');
            $(".question").html(this.questions[this.count])
        },
        // DISPLAY ANSWERS DUHHH
        displayAnswers: function () {
            $(".container").append('<div class="content answers">');
            // DISPLAY THE CORRECT ANSWER
            $(".answers").append('<p data="true">' + this.correctAnswers[this.count] + '</p>');
            // DISPLAY THREE INCORRECT ANSWERS
            for (var i = 1; i < 4; i++) {
                var wrongAnswer = this.correctAnswers[this.count];
                // PICK RANDOM ANSWER THAT IS NOT THE CORRECT ANSWER
                while (wrongAnswer == this.correctAnswers[this.count]) {
                    wrongAnswer = Math.round(Math.random() * 10);
                }
                // RANDOMIZE BETWEEN APPEND/PREPEND SO THE CORRECT ANSWER CHANGES ORDER
                var oneTwo = Math.round(Math.random());
                if (oneTwo === 0) {
                    $(".answers").append('<p data="false">' + wrongAnswer + '</p>');
                } else {
                    $(".answers").prepend('<p data="false">' + wrongAnswer + '</p>');
                }
            }
        },
        // CHECK SELECTED ANSWER
        checkAnswer: function (answer = false, pick = "nothing") {
            clearInterval(clear);
            if (answer == "true") {
                this.answeredCorrect++;
            } else {
                this.answeredIncorrect++;
            }
            this.displaySolution(answer, pick)

        },
        // DISPLAY CORRECT OR INCORRECT ANSWER SCREEN AFTER ANSWER SELECTED
        displaySolution: function (solution, pick) {
            if (solution == "true") {
                $(".question").html("Good Job!");
                $(".answers").html(pick + " is the correct answer.")
            } else {
                $(".question").html("ERRRRR!");
                $(".answers").html("You selected " + pick + "<br>");
                $(".answers").append(this.correctAnswers[this.count] + " is the correct answer.")
            }
            this.count++;
            setTimeout(function () {
                trivia.display();
            }, 3000);
        },
        // COUNTDOWN TIMER
        timer: function (time) {
            var countTime = time;
            clear = setInterval(function () {
                $(".timer").html(countTime);
                if (countTime === 0) {
                    if (time === 10) {
                        trivia.checkAnswer();
                    }
                    if (time === 5) {
                        trivia.display();
                    }
                    clearInterval(clear);
                } else {
                    countTime--;
                }
            }, 1000);
        }


    };
    $(document).on('click', ".reset", function (event) {
        trivia.count = 0;
        trivia.answeredCorrect = 0;
        trivia.answeredIncorrect = 0;
        $(".container").html($('<button class="play" >Play</button>'));
    })
    $(document).on('click', "p", function (event) {
        let picked = $(this).attr("data");
        let pick = $(this).text();
        trivia.checkAnswer(picked, pick);
    });

    $(".container").html($('<button class="play" >Play</button>'));

    $(document).on('click', ".play", function (event) {
        trivia.display();
    })

});