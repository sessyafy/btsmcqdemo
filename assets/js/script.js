const questions = [
  { 
    question: 
    "Which language is used for web development?", 
    options: ["Python", "C++", "JavaScript", "Java"], 
    answer: "JavaScript" 
  },
  {
    question:
    " Which type of JavaScript language is ___",
    options: ["Object-Oriented", "Object-Based", "Assembly-language", "High-level"],
    answer: "Object-Based"
  },
  {
   question:
    " Which property is used to get the length of a string in JavaScript?",
    options: ["strlen", "len", "length", "Leg"],
    answer: "length"
  },
  {
    question:
     " Which keyword is used to define a JavaScript function?",
     options: ["module", "function", "func", "fun"],
     answer: "function"
   },
   {
    question:
     " Does JavaScript support increment (++) and decrements (--) Operators?",
     options: ["Yes", "Maybe", "No", "None of the above"],
     answer: "Yes"
   },
   {
    question:
     " Which symbol is used separate JavaScript statements?",
     options: ["Comma (,)", "Semicolon (;)", "Hyphen (_)", "Colon (:)"],
     answer: "Semicolon (;)"
   },
   {
    question:
     " Which JavaScript method is used to write into an alert box?",
     options: ["window.alertHTML()", "window.alert()", "window.alertBox()", "window.alertContent()"],
     answer: "window.alert()"
   },
   {
    question:
     " JavaScript arrays are written with _____.",
     options: ["round brackets ()", "curly brackets {}", "double quotes (;)", "square brackets []"],
     answer: "square brackets []"
   },
   {
    question:
     " Which of the following function of Array object reverses the order of the elements of an array?",
     options: ["reverse()", "push()", "reduce()", "reduceRight()"],
     answer: "reverse()"
   },
   {
    question:
     " Which of the following methods is used to access HTML elements using Javascript?",
     options: ["getElementByID", "getElementsByClassName", "Both 1-2", "None of the above"],
     answer: "Both 1-2"
   }
];

let shuffledQuestions = [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;
let selectedAnswers = {};

const labels = ["A", "B", "C", "D"];

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

document.addEventListener("DOMContentLoaded", () => {
    const userName = localStorage.getItem("userName");
    document.getElementById("welcomeMessage").innerText = `Welcome, ${userName}!`;

    shuffledQuestions = shuffleArray([...questions]).map(q => ({
        ...q,
        options: shuffleArray([...q.options])
    }));

    loadQuestion();
    startTimer();
});

function startTimer() {
    timerInterval = setInterval(() => {
        document.getElementById("timer").innerText = `${timeLeft} sec`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            finishQuiz();
        }
        timeLeft--;
    }, 1000);
}

function loadQuestion() {
    const q = shuffledQuestions[currentQuestion];
    document.getElementById("question").innerText = `${currentQuestion + 1}: ${q.question}`;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach((option, index) => {
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "quizOption";
        input.value = option;
        input.id = `option_${option}`;

        if (selectedAnswers[currentQuestion] === option) {
            input.checked = true;
        }

        const labelElement = document.createElement("label");
        labelElement.innerText = `${labels[index]}. ${option}`;
        labelElement.htmlFor = `option_${option}`;

        optionsDiv.appendChild(input);
        optionsDiv.appendChild(labelElement);
        optionsDiv.appendChild(document.createElement("br"));
    });
}

function nextQuestion() {
    const selectedOption = document.querySelector("input[name='quizOption']:checked");
    if (!selectedOption) {
        alert("Please select an answer before proceeding!");
        return;
    }

    selectedAnswers[currentQuestion] = selectedOption.value;

    if (selectedOption.value === shuffledQuestions[currentQuestion].answer) {
        score++;
    }

    if (currentQuestion < shuffledQuestions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        finishQuiz();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function finishQuiz() {
    clearInterval(timerInterval);
    document.getElementById("quizContainer").style.display = "none";
    document.getElementById("scoreMessage").innerText = `${score} out of ${shuffledQuestions.length}`;
}
