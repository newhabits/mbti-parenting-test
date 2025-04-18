document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("start-btn");

  startButton.addEventListener("click", function () {
    showScreen("quiz-container");
    initializeQuiz();
  });
});

function showScreen(idToShow) {
  const screens = ["intro-container", "quiz-container", "result-container"];
  screens.forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove("active");
  });
  document.getElementById(idToShow).classList.add("active");
}

const questions = [
  {
    question: "아이와 놀 때 당신의 스타일은?",
    answers: [
      { text: "같이 몸을 움직이며 신나게 논다", scores: { E: 1 } },
      { text: "조용히 책이나 블럭 놀이를 한다", scores: { I: 1 } }
    ]
  }
];

let currentQuestionIndex = 0;
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
let previousAnswers = [];

function initializeQuiz() {
  currentQuestionIndex = 0;
  scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  previousAnswers = [];
  renderQuestion();
}

function renderQuestion() {
  const question = questions[currentQuestionIndex];
  const questionElement = document.getElementById("question");
  const answersElement = document.getElementById("answers");

  questionElement.innerText = "";
  answersElement.innerHTML = "";

  questionElement.innerText = question.question;

  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.onclick = () => {
      previousAnswers.push({ questionIndex: currentQuestionIndex, scores: answer.scores });
      Object.keys(answer.scores).forEach((key) => {
        scores[key] += answer.scores[key];
      });
      nextQuestion();
    };
    answersElement.appendChild(button);
  });

  const progress = document.querySelector('.progress');
  const progressPercentage = (currentQuestionIndex / questions.length) * 100;
  progress.style.width = `${progressPercentage}%`;
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    showScreen("result-container");
    document.getElementById("result").innerText = "테스트 완료! (가짜 결과)";
  }
}
