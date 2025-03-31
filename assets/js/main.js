// select html elements
let startQuiz = document.querySelector("#start");
let rulesContainer = document.querySelector(".rules-container");
let continueButton = document.querySelector(".continue-button");
let progress = document.querySelector("#progress");
let nextQuestion = document.querySelector("#next-que");
let summary = document.querySelector(".summary");
let count = document.querySelector("#count");
let questionOption = document.querySelectorAll(".question-option");
let scoreCard = document.querySelector("#score");
let timerContainer = document.querySelector(".timer-container");
let exitButton = document.querySelector("#exit-button");
let questionContainer = document.querySelector(".question-container");
let quit = document.querySelector(".quit");
let replay = document.querySelector(".replay");
let progressBar = document.querySelector("#progress");

// Event listener for start quiz button
startQuiz.addEventListener("click", () => {
  // Hide start quiz button and display rules container
  startQuiz.style.display = "none";
  rulesContainer.style.display = "block";
});

// Event listener for exit button
exitButton.addEventListener("click", () => {
  // Hide rules container and display start quiz button
  rulesContainer.style.display = "none";
  startQuiz.style.display = "block";
});

//Event listener for continue button
continueButton.addEventListener("click", () => {
  // Hide rules container and display question container
  rulesContainer.style.display = "none";
  questionContainer.style.display = "block";
  // display the questions
  showQuestion();
  // start timer
  startTimer();
});

// question bank
let questionBank = [
  {
    question: "1. In computing, what does MIDI stand for?",
    correctAnswer: "Musical Instrument Digital Interface",
    incorrectOne: "Musical Interface of Digital Instruments",
    incorrectTwo: "Modular Interface of Digital Instruments",
    incorrectThree: "Musical Instrument Data Interface",
  },
  {
    question:
      "2. Which company was established on April 1st, 1976 by Steve Jobs, Steve Wozniak and Ronald Wayne?",
    correctAnswer: "Apple",
    incorrectOne: "Microsoft",
    incorrectTwo: "Atari",
    incorrectThree: "Commodore",
  },
  {
    question:
      " 3. According to the International System of Units, how many bytes are in a kilobyte of RAM?",
    correctAnswer: "1000",
    incorrectOne: "512",
    incorrectTwo: "1024",
    incorrectThree: "500",
  },
  {
    question: "4. This mobile OS held the largest market share in 2012.",
    correctAnswer: "iOS",
    incorrectOne: "Android",
    incorrectTwo: "BlackBerry",
    incorrectThree: "Symbian",
  },
  {
    question:
      " 5. When Gmail first launched, how much storage did it provide for your email?",
    correctAnswer: "1GB",
    incorrectOne: "512MB",
    incorrectTwo: "5GB",
    incorrectThree: "Unlimited",
  },
  {
    question: "6. What does LTS stand for in the software market?",
    correctAnswer: "Long Term Support",
    incorrectOne: "Long Taco Service",
    incorrectTwo: "Ludicrous Transfer Speed",
    incorrectThree: "Ludicrous Turbo Speed",
  },
  {
    question:
      "7. The programming language &#039;Swift&#039; was created to replace what other programming language?",
    correctAnswer: "Objective-C",
    incorrectOne: "C#",
    incorrectTwo: "Ruby",
    incorrectThree: "C++",
  },
  {
    question:
      "8. The C programming language was created by this American computer scientist. ",
    correctAnswer: "Dennis Ritchie",
    incorrectOne: "Tim Berners Lee",
    incorrectTwo: "al-Khwārizmī",
    incorrectThree: "Willis Ware",
  },
  {
    question: "9. How many values can a single byte represent?",
    correctAnswer: "256",
    incorrectOne: "8",
    incorrectTwo: "1",
    incorrectThree: "1024",
  },
  {
    question: "10. What does GHz stand for?",
    correctAnswer: "Gigahertz",
    incorrectOne: "Gigahotz",
    incorrectTwo: "Gigahetz",
    incorrectThree: "Gigahatz",
  },
];

// text content variables
let question = document.querySelector("#question"),
  optionOne = document.querySelector("#option-one"),
  optionTwo = document.querySelector("#option-two"),
  optionThree = document.querySelector("#option-three"),
  optionFour = document.querySelector("#option-four");

// function to display questions and options
let currentItem = 0;
function showQuestion() {
  let item = questionBank[currentItem];
  question.textContent = item.question;
  optionOne.textContent = item.correctAnswer;
  optionTwo.textContent = item.incorrectOne;
  optionThree.textContent = item.incorrectTwo;
  optionFour.textContent = item.incorrectThree;
};

// Event listener for next question button
nextQuestion.addEventListener("click", () => {
  // Increment current item index
  currentItem++;
  // Update question count display
  count.innerHTML = `${currentItem + 1} of 10`;
  // Start timer for next question
  startTimer();
  // Hide next question button
  nextQuestion.style.display = "none";

  // Change button text to "Submit" on last question
  if (currentItem === 9) {
    nextQuestion.innerHTML = "Submit";
  }
  // Hide question container and display summary page on submit
  if (currentItem > 9) {
    questionContainer.style.display = "none";
    summary.style.display = "block";
    scoreCard.innerHTML = score;
  }
  // Show next question
  showQuestion();

  // Reset options for next question
  resetOptions();
  progressBar.style.width = "0%";
});

// option selection status
let optionSelected = false;
// user score
let score = 0;
// add event listener to user choice
questionOption.forEach((option) => {
  option.addEventListener("click", () => {
    if (optionSelected) return;

    let item = questionBank[currentItem];
    //check if option is correct
    if (option.textContent === item.correctAnswer) {
      //increment score
      score++;

      option.style.backgroundColor = "lightgreen";
    } else {
      option.style.backgroundColor = "pink";
      // highlight correct answer
      questionOption.forEach((opt) => {
        if (opt.textContent === item.correctAnswer) {
          opt.style.backgroundColor = "lightgreen";
        }
      });
    }
    optionSelected = true;
    // clear the timer and set display the next question button
    clearInterval(timer);
    // timerContainer.innerHTML = innerHTML = "Time left: 0";
    nextQuestion.style.display = "block";
  });
});

function resetOptions() {
  questionOption.forEach((option) => {
    option.style.backgroundColor = "";
  });
  optionSelected = false;
}

// Function to reset quiz state
function resetQuiz() {
  summary.style.display = "none";
  clearInterval(timer);
  resetOptions();
  resetAllCount();
}
// reset all previous count
function resetAllCount() {
  currentItem = 0;
  score = 0;
  count.innerHTML = "1 of 10";
  nextQuestion.innerHTML = "Next Que.";
}
// Event listener for replay button
replay.addEventListener("click", () => {
  resetQuiz();
  questionContainer.style.display = "block";
  startTimer();
  showQuestion();
});
// Event listener for quit button
quit.addEventListener("click", () => {
  resetQuiz();
  startQuiz.style.display = "block";
});

// timer functionality
let timer;
function startTimer() {
  let timeLeft = 15;
  timerContainer.innerHTML = `Time left: ${timeLeft}`;
  timer = setInterval(() => {
    timeLeft -= 1;
    timerContainer.innerHTML = `Time left: ${timeLeft}`;

    // Update progress bar
    let progress = ((15 - timeLeft) / 15) * 100;
    progressBar.style.width = `${progress}%`;

    if (timeLeft === 0) {
      clearInterval(timer);
      timerContainer.innerHTML = `Time Elapsed: ${timeLeft}`;

      // highlight correct answer
      let item = questionBank[currentItem];
      questionOption.forEach((option) => {
        if (option.textContent === item.correctAnswer) {
          option.style.backgroundColor = "lightgreen";
        }
      });
      // show next question button
      nextQuestion.style.display = "block";
    }
  }, 1000);
}
