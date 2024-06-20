// Declaração de variáveis
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ['a', 'b', 'c', 'd'];
let points = 0;
let actualQuestion = 0;

// Perguntas
const questions = [
  {
    "question": "PHP foi desenvolvido para qual fim?",
    "answers": [
      {
        "answer": "back-end",
        "correct": true
      },
      {
        "answer": "front-end",
        "correct": false
      },
      {
        "answer": "Sistema operacional",
        "correct": false
      },
      {
        "answer": "Banco de dados",
        "correct": false
      },
    ]
  },
  {
    "question": "Uma forma de declarar variável em JavaScript:",
    "answers": [
      {
        "answer": "$var",
        "correct": false
      },
      {
        "answer": "var",
        "correct": true
      },
      {
        "answer": "@var",
        "correct": false
      },
      {
        "answer": "#let",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual o seletor de id no CSS?",
    "answers": [
      {
        "answer": "#",
        "correct": true
      },
      {
        "answer": ".",
        "correct": false
      },
      {
        "answer": "@",
        "correct": false
      },
      {
        "answer": "/",
        "correct": false
      },
    ]
  },
  {
    "question": "Considerando a linguagem Python, as bibliotecas NLTK e Pandas e a linguagem R, julgue o item. Na linguagem R, a atribuição de valores a variáveis pode ser realizada por meio do operador <‑.",
    "answers": [
      {
        "answer": "Verdadeiro",
        "correct": true
      },
      {
        "answer": "Falso",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual das seguintes opções não é uma linguagem de programação?",
    "answers": [
      {
        "answer": "Python",
        "correct": false
      },
      {
        "answer": "C++",
        "correct": false
      },
      {
        "answer": "Java",
        "correct": false
      },
      {
        "answer": "HTML",
        "correct": true
      },
    ]
  },
  {
    "question": "A linguagem Python é considerada dinamicamente tipada, pois os tipos das variáveis de seus programas podem ser modificados durante a execução.",
    "answers": [
      {
        "answer": "Verdadeiro",
        "correct": true
      },
      {
        "answer": "Falso",
        "correct": false
      },
    ]
  },
  {
    "question": "O que é JavaScript?",
    "answers": [
      {
        "answer": "Não é uma linguagem de programação",
        "correct": false
      },
      {
        "answer": "JavaScript é uma linguagem de programação de baixo nível, dinâmica e interpretada.",
        "correct": false
      },
      {
        "answer": "JavaScript não permite aos desenvolvedores criar interações dinâmicas dentro de páginas web.",
        "correct": false
      },
      {
        "answer": "JavaScript é uma linguagem de programação amplamente utilizada no desenvolvimento web.",
        "correct": true
      },
    ]
  },
  {
    "question": "Padrão Web: É uma parte essencial do desenvolvimento web moderno, sendo suportada por todos os principais navegadores web?",
    "answers": [
      {
        "answer": "Word, office, python, teams e afins",
        "correct": false
      },
      {
        "answer": "Bloco de notas, google, captura de telas",
        "correct": false
      },
      {
        "answer": "Chrome, Firefox, Safari, Edge, etc.",
        "correct": true
      },
      {
        "answer": "Clima, cisco, camera e calculadora.",
        "correct": false
      },
    ]
  },
  {
    "question": "JavaScript é crucial para o desenvolvimento web moderno, oferecendo poderosas capacidades de interatividade e dinamismo para páginas e aplicações web.",
    "answers": [
      {
        "answer": "Verdadeiro",
        "correct": true
      },
      {
        "answer": "Falso",
        "correct": false
      },
    ]
  },
  {
    "question": "Python é uma linguagem de programação de alto nível, interpretada, multiparadigma e de propósito geral. ",
    "answers": [
      {
        "answer": "Python é amplamente suportado em diferentes plataformas, incluindo Windows, macOS e Linux.",
        "correct": true
      },
      {
        "answer": "Python não é utilizado em uma ampla variedade de domínios",
        "correct": false
      },
      {
        "answer": "Torna mais dificil encontrar suporte, tutoriais e soluções para desafios de programação",
        "correct": false
      },
      {
        "answer": "Python possui uma comunidade pequena e desativa de desenvolvedores que contribuem com pacotes de código aberto e recursos educacionais. ",
        "correct": false
      },
    ]
  },
]

// Substituição do layout pela primeira questão
function init() {
  createQuestion(0)
}

// Create a question 
function createQuestion(i) {

  // Limpa questão anterior
  const oldButtons = answersBox.querySelectorAll("button");

  oldButtons.forEach(function(btn) {
    btn.remove();
  });

  // Altera texto da pergunta
  const questionText = question.querySelector("#question-text");
  const questionNumber = question.querySelector("#question-number");

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  // Insere alternativas
  questions[i].answers.forEach(function(answer, i) {
    
    // Altera texto do template
    const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

    const letterBtn = answerTemplate.querySelector(".btn-letter");
    const answerText = answerTemplate.querySelector(".question-answer");

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute("correct-answer", answer["correct"]);

    // remove classe de hide e template do template
    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answer-template");

    // Insere template na tela
    answersBox.appendChild(answerTemplate);

  });

  // Cria evento em todos os botões
  const buttons = answersBox.querySelectorAll("button");

  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      checkAnswer(this, buttons);
    });
  });

  // Incrementa o número atual de questões
  actualQuestion++;

}

// Verificando se resposta está correta
function checkAnswer(btn, buttons) {
  
  // Exibir respostas erradas e a certa
  buttons.forEach(function(button) {

    if(button.getAttribute("correct-answer") === "true") {
      button.classList.add("correct-answer");
      // checa se o usuário acertou
      if(btn === button) {
        // incrementa os pontos
        points++;
      }
    } else {
      button.classList.add("wrong-answer");
    }

  });

  nextQuestion();

}

// Exibe a próxima pergunta
function nextQuestion() {

  // Timer para ver se acertou ou errou
  setTimeout(function() {

    // checa se ainda há mais perguntas
    if(actualQuestion >= questions.length) {
      // apresenta msg de sucesso
      showSuccessMessage();
      return;
    }

    createQuestion(actualQuestion)

  }, 1000);

}

// Tela final
function showSuccessMessage() {

  hideOrShowQuizz();

  // calc score
  const score = ((points / questions.length) * 100).toFixed(2);
  const scoreDisplay = document.querySelector("#display-score span");

  scoreDisplay.textContent = score.toString();

  // alterar número de perguntas corretas
  const correctAnswers = document.querySelector("#correct-answers");
  correctAnswers.textContent = points;

  // alterar total de perguntas
  const totalQuestions = document.querySelector("#questions-qty");
  totalQuestions.textContent = questions.length;

}

// Reiniciar Quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function() {
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});

// Mostra ou exibe o quizz
function hideOrShowQuizz() {
  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");
}

// Inicialização
init();

