const questions = [
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
    answer: "Delhi"
  },
  {
    question: "HTML stands for?",
    options: ["HighText Machine Language", "HyperText Markup Language", "HyperTool Markup Language", "None"],
    answer: "HyperText Markup Language"
  },
  {
    question: "Which is not a programming language?",
    options: ["Python", "Java", "HTML", "C++"],
    answer: "HTML"
  },
  {
    question: "What is the aim of your life?",
    options: ["Data Analyst", "Full Stack Developer", "Software Developer", "Others"],
    answer: "Others"
  },
  {
    question: "Which framework do you prefer?",
    options: ["React", "Angular", "Vue", "Others"],
    answer: "Others"
  },
  {
    question: "What is your favorite programming language?",
    options: ["JavaScript", "Python", "Java", "Others"],
    answer: "Others"
  }
];

let index = 0;
let score = 0;

const frontPage = document.getElementById("frontPage");
const quizPage = document.getElementById("quizPage");
const questionBox = document.getElementById("question");
const optionsBox = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultBox = document.getElementById("answer");

function loadQuestion() {
  const current = questions[index];
  questionBox.style.opacity = 0;
  optionsBox.style.opacity = 0;
  resultBox.innerHTML = "";
  nextBtn.style.display = "none";

  setTimeout(() => {
    questionBox.innerText = current.question;
    optionsBox.innerHTML = "";

    current.options.forEach(option => {
      const btn = document.createElement("button");
      btn.innerText = option;
      btn.classList.add("options");
      btn.onclick = () => {
        if (option === "Others") {
          showOtherInput();
        } else {
          checkAnswer(btn, option);
        }
      };
      optionsBox.appendChild(btn);
    });

    questionBox.style.opacity = 1;
    optionsBox.style.opacity = 1;
  }, 300);
}

function showOtherInput() {
  optionsBox.innerHTML = "";

  const input = document.createElement("input");
  input.type = "text";
  input.id = "otherInput";
  input.placeholder = "Please specify your answer";
  input.style.marginTop = "10px";
  input.style.padding = "8px";
  input.style.width = "80%";
  optionsBox.appendChild(input);

  const submitBtn = document.createElement("button");
  submitBtn.innerText = "Submit";
  submitBtn.style.marginTop = "10px";
  submitBtn.onclick = () => {
    const userInput = input.value.trim();
    if (userInput === "") {
      alert("Please enter your answer.");
      return;
    }
    // Create a dummy button element to pass to checkAnswer for styling
    const dummyBtn = document.createElement("button");
    dummyBtn.style.backgroundColor = "green"; // default green for correct
    checkAnswer(dummyBtn, userInput);
  };
  optionsBox.appendChild(submitBtn);
}

function checkAnswer(button, selected) {
  const correct = questions[index].answer;
  if (selected === correct) {
    score++;
    button.style.backgroundColor = "green";
  } else {
    button.style.backgroundColor = "red";
  }
  // Disable all buttons after selection
  Array.from(optionsBox.children).forEach(btn => {
    btn.disabled = true;
    if (btn.innerText === correct) {
      btn.style.backgroundColor = "green";
    }
  });
  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  index++;
  if (index < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionBox.style.display = "none";
  optionsBox.style.display = "none";
  nextBtn.style.display = "none";
  resultBox.innerHTML = `<h2>Your Score: ${score} / ${questions.length}</h2>`;
}

// Function to handle front page slide up and show quiz page
function startTransition() {
  frontPage.style.animation = "slideUp 1s forwards";
  frontPage.addEventListener("animationend", () => {
    frontPage.style.display = "none";
    quizPage.style.display = "flex";
    loadQuestion();
  });
}

function showQuizPage() {
  frontPage.style.display = "none";
  quizPage.style.display = "flex";
  loadQuestion();
}

window.addEventListener("load", () => {
  // Show front page for 5 seconds, then show quiz page
  setTimeout(() => {
    showQuizPage();
  }, 5000);
});
