import { quizzitch } from './questions.js';

// Récupérer HTML
const askQuestion = document.getElementById('question-text');
const answers = document.getElementById('options-text');
const buttonNext = document.getElementById('next-button');
const buttonReplay = document.getElementById('replay-button');
const scoreText = document.getElementById('score-text');
const progressBar = document.getElementById('progressBar');
const time = document.getElementById('timer')

let currentQuestionIndex = 0; // Commence à la première question
let storeQuestion; // On déclare 1 variable pour le localstorage
let score = 0; // initie le score 
let validButton; //Afin d'isoler plus tard la bonne réponse
let maxBar = quizzitch.questions.length; // Max de la barre de progression


/****Fonctions secondaires*******/
function displayBar() {
  progressBar.value = currentQuestionIndex;
  progressBar.max = maxBar;
};

function storage() {
  localStorage.setItem("position", currentQuestionIndex); // stock la valeur du currentQuestionIndex
  storeQuestion = localStorage.getItem("position");  // restitue la valeur 
  return storeQuestion;
};

function colorAskQuestion() {
  if (storeQuestion == 0) {
    askQuestion.style.backgroundColor = '#610a00e8';
    askQuestion.style.color = '#b3a41f';
  } else if (storeQuestion == 1) {
    askQuestion.style.backgroundColor = '#ffd633e8';
    askQuestion.style.color = 'black';
  } else if (storeQuestion == 2) {
    askQuestion.style.backgroundColor = '#0077B3e8';
    askQuestion.style.color = '#f2f2f2';
  } else if (storeQuestion == 3) {
    askQuestion.style.backgroundColor = '#004d00e8';
    askQuestion.style.color = '#e6e6e6';
  }
};

function colorButtonNext() {
  if (buttonNext.disabled == true) {
    buttonNext.style.backgroundColor = '#05446ed1';
    buttonNext.style.color = '#b8b4b4';
  } else if (buttonNext.disabled == false) {
    buttonNext.style.backgroundColor = '#e7e6e2eb';
    buttonNext.style.color = '#463533';
  }
};

function colorOptionButton(boutonReponse) {
  if (storeQuestion == 0) {
    boutonReponse.style.backgroundColor = '#610a00be';
    boutonReponse.style.color = '#b3a41f';
    boutonReponse.style.borderColor = '#b3a41f';
  } else if (storeQuestion == 1) {
    boutonReponse.style.backgroundColor = '#ffd633be';
    boutonReponse.style.color = 'black';
    boutonReponse.style.borderColor = '#1b1b1b';
  } else if (storeQuestion == 2) {
    boutonReponse.style.backgroundColor = '#0077B3be';
    boutonReponse.style.color = '#f2f2f2';
    boutonReponse.style.borderColor = '#f2f2f2';
  } else if (storeQuestion == 3) {
    boutonReponse.style.backgroundColor = '#004d00be';
    boutonReponse.style.color = '#e6e6e6';
    boutonReponse.style.borderColor = '#e6e6e6';
  }
};

function rightAnswer(reponse, bonneReponse) {
  if (reponse.innerText == bonneReponse) { // on compare le texte du bouton au texte de la correctAnswer (pas besoin de rajouter innerText)
    validButton = reponse; //si c'est egal, on stock la valeur de optionButton dans la variable globale validButton qui deviendra donc un "bouton".
  }
};

function colorAnswerAndScore(check, boutonReponse) {
  if (check) /*veut dire == true*/ {
    boutonReponse.style.borderColor = '#85e085';
    score++;
  } else {
    boutonReponse.style.borderColor = '#ff0000';
    validButton.style.borderColor = '#85e085';
  }
};

function checkAnswer(playerChoice, correctAnswer) { // Comparer entre l'event listener et la correct answer sans sortir du callback de l'event listener.
  if (playerChoice == correctAnswer) {
    return true;
  } else {
    return false;
  }
};

function countdown() { // SetInterval appelle une fonction au bout d'un délai prédéfini
  let counter = 10;
  time.innerText = `Il reste 00:${counter}`;
  const timer = setInterval(function () {
    counter--;
    time.innerText = `Il reste 00:0${counter}`;
    if (counter === 0) {
      goToNextQuestion();
      clearInterval(timer);
    } else if (buttonNext.disabled == false) {
      clearInterval(timer);
    }
  }, 1000);
};

function goToNextQuestion() {
  storage();
  currentQuestionIndex++; // Incrémenter l'index de la question
  if (currentQuestionIndex < quizzitch.questions.length) { // Vérifier s'il reste des questions
    countdown();
    loadQuestion(); // Afficher la question suivante
  } else {
    time.innerHTML = "";
    progressBar.value = maxBar; // Quand plus de questions, la barre de progression est au max
    askQuestion.innerText = `Tu as obtenu ${score}/4 🧙 !` // Si plus de questions, indiquer la fin du quiz
    askQuestion.style.backgroundColor = '#463533e8';
    scoreText.style.display = 'block'; //Afficher le scoreText
    answers.innerHTML = ''; // Effacer les options
    buttonNext.style.display = 'none'; // Désactiver le bouton Suivant
    buttonReplay.style.display = 'inline-block'; // Afficher le bouton rejouer
    if (score == 0) {
      scoreText.innerText = "Normal, t'es un moldu 🤷 ";
    } else if (score == 1) {
      scoreText.innerText = "T'es pas la baguette la plus vive de chez Ollivander 🪄 ";
    } else if (score == 2) {
      scoreText.innerText = "Qui t'as lancé 🪄 Oubliettes 🤯 ?";
    } else if (score == 3) {
      scoreText.innerText = "T'es le fayot de Minerva 🪦🌼";
    } else if (score == 4) {
      scoreText.innerText = "T'as eu optimal à toutes tes B.U.S.E. 🧑‍🎓✨ ";
    }
  }
}

/*******Fonction principale********/
function loadQuestion() {
  storage();
  displayBar();
  answers.innerHTML = ''; // Vider le conteneur des réponses
  const goodAnswer = quizzitch.questions[storeQuestion].correct_answer; // Recup bonne reponse actuelle
  const currentQuestion = quizzitch.questions[storeQuestion]; // Récup question actuelle + réponses actuelles
  colorAskQuestion();
  askQuestion.innerText = currentQuestion.text; // Injecter la question dans le HTML
  buttonNext.disabled = true; // Désactive le boutton "suivant"
  colorButtonNext();
  currentQuestion.options.forEach(elem => { // Injecter les réponses dans le HTML 
    let optionButton = document.createElement('button'); // declaration variable bouton reponse avec creation bouton
    optionButton.innerText = elem;
    colorOptionButton(optionButton);
    answers.classList.add('options');
    rightAnswer(optionButton, goodAnswer);
    optionButton.addEventListener("click", () => {
      let playerAnswer = optionButton.innerText;
      let coloredAnswer = checkAnswer(playerAnswer, goodAnswer);
      buttonNext.disabled = false; // Au clique d'une réponse, le boutton "suivant" s'active
      colorButtonNext();
      colorAnswerAndScore(coloredAnswer, optionButton);
      document.querySelectorAll('#options-text button').forEach(elem => { //Selection de tous les bouttons avec id options-text
        elem.disabled = true; // Pour chacun d'entre eux, désactivation
      });
    })
    answers.appendChild(optionButton);
  })
};

/****Charger la première question et le timer au chargement de la page****/
loadQuestion();
countdown();

buttonNext.addEventListener('click', () => {
  goToNextQuestion()
});

buttonReplay.addEventListener('click', () => {
  currentQuestionIndex = 0; // Réinitialiser l'index 
  score = 0; //Reset du score 
  countdown()
  buttonNext.style.display = 'inline-block'; // Afficher le bouton Suivant
  buttonReplay.style.display = 'none'; // Désactiver l'affichage du bouton rejouer
  loadQuestion(); // Recharger la première question
  scoreText.style.display = 'none'; //Désactiver l'affichage de scoreText 
});