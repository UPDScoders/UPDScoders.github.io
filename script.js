const questionText = document.getElementById('question-text');
const options = document.querySelectorAll('.option');
const submitButton = document.getElementById('submit-button');
const resultContainer = document.getElementById('result-container');

let currentQuestion = 0;
let score = 0;

// Define las preguntas y respuestas
const quizData = [
  {
    question: 'She _______ in London for five years.',
    options: ['has been living', 'lives', 'is living', ' has lived'],
    correctAnswer: 0
  },
  {
    question: 'I usually _______ soccer on weekends.',
    options: ['am playing', 'have played', 'play', 'have been playing'],
    correctAnswer: 2
  },
  {
    question: 'They _______ to Spain twice this year.',
    options: ['have been traveling', 'travel', 'are traveling', 'have traveled'],
    correctAnswer: 3
  },
  {
    question: 'He _______ a book at the moment.',
    options: ['has been reading', 'is reading', 'reads', 'has read'],
    correctAnswer: 1
  },
  {
    question: 'We _______ a new car last month.',
    options: ['have bought', 'buy', 'have been buying', 'are buying'],
    correctAnswer: 0
  },
  // Agrega más preguntas y respuestas aquí
];

// Carga la primera pregunta
loadQuestion();

// Agrega un evento click al botón de envío
submitButton.addEventListener('click', () => {
  const selectedOption = document.querySelector('.option.selected');

  if (selectedOption) {
    const selectedAnswer = parseInt(selectedOption.getAttribute('data-id'));
    checkAnswer(selectedAnswer);
  }
});

// Carga la pregunta y opciones actual
function loadQuestion() {
  const currentQuizData = quizData[currentQuestion];

  questionText.textContent = currentQuizData.question;
  options.forEach((option, index) => {
    option.textContent = currentQuizData.options[index];
    option.classList.remove('selected');
    option.style.backgroundColor = '';
    option.setAttribute('data-id', index);
    option.addEventListener('click', selectOption);
  });
}

// Marca la opción seleccionada
function selectOption() {
  options.forEach((option) => {
    option.classList.remove('selected');
    option.style.backgroundColor = '';
  });

  this.classList.add('selected');
  this.style.backgroundColor = '#9AFF9A';
}

// Verifica si la respuesta es correcta
function checkAnswer(answer) {
    const currentQuizData = quizData[currentQuestion];
  
    if (answer === currentQuizData.correctAnswer) {
      score++;
      resultContainer.innerHTML = '<i class="fas fa-check"></i>';
      resultContainer.style.color = 'green';
      resultContainer.style.fontSize = '20rem';
    } else {
        resultContainer.innerHTML = '<i class="fas fa-times"></i>';
        resultContainer.style.color = 'red';
        resultContainer.style.fontSize = '20rem';
    }
  
    options.forEach((option) => {
      option.removeEventListener('click', selectOption);
      option.style.backgroundColor = '';
    });
  
    disableOptions();
    submitButton.disabled = true;
  
    if (currentQuestion < quizData.length - 1) {
      setTimeout(nextQuestion, 1500);
    } else {
      setTimeout(showScore, 1500);
    }
}

// Deshabilita las opciones de respuesta
function disableOptions() {
  options.forEach((option) => {
    option.removeEventListener('click', selectOption);
  });
}

// Carga la siguiente pregunta
function nextQuestion() {
  currentQuestion++;
  loadQuestion();
  resultContainer.textContent = '';
  submitButton.disabled = false;
}

// Muestra la puntuación final
function showScore() {
  questionText.textContent = `Puntuación final: ${score}/${quizData.length}`;
  options.forEach((option) => {
    option.style.display = 'none';
  });
  submitButton.style.display = 'none';
  resultContainer.textContent = '';
}

const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', restartGame);

function restartGame() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    resultContainer.textContent = '';
    options.forEach((option) => {
      option.style.display = 'block';
    });
    submitButton.style.display = 'block';
    submitButton.disabled = false;
  }