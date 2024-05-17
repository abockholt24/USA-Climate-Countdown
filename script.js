const finalScreen = document.getElementById("final-screen");
document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            question: "What percentage of U.S. greenhouse gas emissions come from burning fossil fuels?",
            answers: [
                { text: "12.5%", correct: false },
                { text: "30%", correct: false },
                { text: "55%", correct: false },
                { text: "85%", correct: true }
            ]
        },
        {
            question: "How much has the average temperature in the contiguous U.S. increased since the beginning of the 20th century?",
            answers: [
                { text: "0.9°F", correct: false },
                { text: "1.8°F ", correct: true },
                { text: "2.3°F", correct: false },
                { text: "3.1°F", correct: false }
            ]
        },
        {
            question: "How much could sea levels rise in the U.S. by 2100?",
            answers: [
                { text: "3-4 inches", correct: false },
                { text: "6-9 inches", correct: false },
                { text: "1-4 feet", correct: true },
                { text: "5-7 feet", correct: false }
            ]
        },
        {
            question: "How many labor hours are projected to be lost annually in the U.S. by 2090 due to extreme heat?",
            answers: [
                { text: "500 thousand", correct: false },
                { text: "50 million", correct: false },
                { text: "450 million", correct: false },
                { text: "2 billion", correct: true }
            ]
        },
        {
            question: "What percentage of the U.S. population lives in areas with unhealthy air quality?",
            answers: [
                { text: "6%", correct: false },
                { text: "17%", correct: false },
                { text: "30%", correct: true },
                { text: "41%", correct: false }
            ]
        },
        {
            question: "By how much is the global average surface temperature expected to increase by 2100 under a higher emissions scenario (RCP8.5), compared to preindustrial levels?",
            answers: [
                { text: "0.7°F", correct: false },
                { text: "2.2°F", correct: false },
                { text: "4.9°F", correct: false },
                { text: "9.0°F", correct: true }
            ]
        },
        {
            question: "How much has the ocean acidity increased since the preindustrial era?",
            answers: [
                { text: "25-40%", correct: true },
                { text: "45-60%", correct: false },
                { text: "65-80%", correct: false },
                { text: "85-100%", correct: false }
            ]
        },
        {
            question: "How much are annual losses in some U.S. economic sectors projected to reach by the end of the century due to climate change?",
            answers: [
                { text: "$10,000,000", correct: false },
                { text: "$100,000,000", correct: false },
                { text: "$1,000,000,000", correct: false },
                { text: "$100,000,000,000+", correct: true }
            ]
        }
    ];

    const startScreen = document.getElementById("start-screen");
    const questionContainer = document.getElementById("question-container");
    const resultContainer = document.getElementById("result");
    const questionImage = document.getElementById("question-image");

    let currentQuestion = 0;
    let score = 0;

    // Start screen logic
    const beginButton = document.getElementById("begin-button");
    beginButton.addEventListener("click", () => {
        startScreen.style.display = "none";
        questionContainer.style.display = "block";
        questionImage.style.display = "block";
        questionImage.src = "images/Result Image.jpg"; // Set the image source here 
    displayQuestion(); // Then display the first question
});

    function displayQuestion() {
        const questionData = questions[currentQuestion];

        questionContainer.innerHTML = ""; 

        const questionElement = document.createElement("div");
        questionElement.textContent = questionData.question;
        questionContainer.appendChild(questionElement);

        questionImage.src = questionData.image; // Move this line here

        const answerButtons = document.createElement("div");

        questionData.answers.forEach(answer => {
            const button = document.createElement("button");
            button.textContent = answer.text;
            button.classList.add("answer-btn");

            button.addEventListener("click", () => {
                checkAnswer(answer, button);
            });

            answerButtons.appendChild(button);
        });

        questionContainer.appendChild(answerButtons);
        questionImage.src = questionData.image; // Set the image for the current question
    }


    function checkAnswer(answer, clickedButton) {
        clickedButton.disabled = true;

        if (answer.correct) {
            clickedButton.classList.add("correct");
            score++;
        } else {
            clickedButton.classList.add("incorrect");

            const correctButton = Array.from(questionContainer.querySelectorAll(".answer-btn")).find(button => {
                return button.textContent === questions[currentQuestion].answers.find(a => a.correct).text;
            });
            correctButton.classList.add("correct");
        }
        createNextButton(); 
    }

    // Function to create the Next Question button
    function createNextButton() {
        if (currentQuestion === questions.length - 1) {
            // Last question answered, display results directly
            questionContainer.style.display = "none"; // Hide the question container
            finalScreen.style.display = "block"; // Show the final screen
            displayResult(); // Call the function to show results
        } else {
            const nextButton = document.createElement("button");
            nextButton.textContent = "Next Question";
            
            nextButton.addEventListener("click", () => {
                currentQuestion++;
                displayQuestion();
            });
            
            questionContainer.appendChild(nextButton);
        }
    }

    function displayResult() {
        resultContainer.style.display = "block"; // Show result container
        resultContainer.innerHTML = `You scored ${score} out of ${questions.length}!`;

        if (score >= 6) {
            resultContainer.innerHTML += "<p>Impressive! You've got a solid grasp of the climate crisis facing the U.S. But knowledge is only the first step. Now it's time to turn understanding into action.  Get ready for my next game, where you'll face the challenges of creating a sustainable future for our planet. Are you ready to make a difference?</p>";
        } else {
            resultContainer.innerHTML += "<p>Don't worry, everyone starts somewhere. The important thing is that you're learning about the urgent challenges facing our planet.  Climate change is a complex issue, but we can all be part of the solution.  Get ready for my next game, where you can test your knowledge and learn how to take action for a sustainable future. Together, we can make a difference.</p>";
        }
    }
});
