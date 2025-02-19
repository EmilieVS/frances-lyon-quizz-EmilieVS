import { quizzitch } from './questions.js';

// Récupérer les emplacements pour injecter la question et les options et bouton suivant
const askQuestion = document.getElementById('question-text');
const answers = document.getElementById('options-text');
const buttonNext = document.getElementById('next-button');
const buttonReplay = document.getElementById('replay-button');
let score = 0;
let scoreText = document.getElementById('score-text');

// Variables pour suivre l'état du quiz
let currentQuestionIndex = 0; // Commence à la première question

// Fonction pour afficher une question basée sur l'index actuel
function loadQuestion() {
  let goodAnswer = quizzitch.questions[currentQuestionIndex].correct_answer;
  answers.innerHTML = ''; // Vider le conteneur des options
  const currentQuestion = quizzitch.questions[currentQuestionIndex]; // Récup question actuelle + réponses
  askQuestion.innerText = currentQuestion.text; // Injecter la question dans le HTML
  // Injecter les options dans le HTML 
  let validButton; //Afin d'isoler plus tard la bonne réponse
  buttonNext.disabled = true; // Désactive le boutton "suivant"

  currentQuestion.options.forEach(option => {
    const optionButton = document.createElement('button');
    optionButton.innerText = option;
    answers.classList.add('options');
    if (optionButton.innerText == goodAnswer) { // on compare le texte du bouton au texte de la correctAnswer (pas besoin de rajouter innerText)
      validButton = optionButton; //si c'est egal, on stock la valeur de optionButton dans la variable globale validButton qui deviendra donc un "bouton".
    }
    optionButton.addEventListener("click", () => {
      let playerAnswer = optionButton.innerText;
      let coloredAnswer = checkAnswer(playerAnswer, goodAnswer);
      buttonNext.disabled = false; // Au clique d'une réponse, le boutton "suivant" s'active
      if (coloredAnswer) /*veut dire == true*/ {
        optionButton.style.borderColor = 'green';
        score++;
      } else {
        optionButton.style.borderColor = 'red';
        validButton.style.borderColor = 'green';
      }
      document.querySelectorAll('#options-text button').forEach(toto => { //Selection de tous les bouttons avec id options-text
        toto.disabled = true; // Pour chacun d'entre eux, désactivation
      });
    })
    answers.appendChild(optionButton);
  })
};
// Charger la première question au chargement de la page
loadQuestion();

// Comparer entre l'event listener et la correct answer sans sortir du callback de l'event listener.
function checkAnswer(playerChoice, correctAnswer) {
  if (playerChoice == correctAnswer) {
    return true;
  } else {
    return false;
  }
};
// const correctAnswer = quizzitch.questions[0].options[0]
// Ajouter un écouteur d'événements pour le bouton "Suivant"
buttonNext.addEventListener('click', () => {

  currentQuestionIndex++; // Incrémenter l'index de la question
  if (currentQuestionIndex < quizzitch.questions.length) { // Vérifier s'il reste des questions
    loadQuestion(); // Afficher la question suivante
  } else {
    askQuestion.innerText = `Tu as obtenu ${score}/4 !` // Si plus de questions, indiquer la fin du quiz
    answers.innerHTML = ''; // Effacer les options
    buttonNext.style.display = 'none'; // Cacher le bouton Suivant
    buttonReplay.style.display = 'inline-block'; // Afficher le bouton rejouer
    if (score == 0) { 
      scoreText.innerText = "toto";
    } else if (score == 1) {
      scoreText.innerText = "tutu";
    } else if (score == 2) {
      scoreText.innerText = "tata";
    } else if (score == 3) {
      scoreText.innerText = "tati";
    } else if (score == 4) {
      scoreText.innerText = "tate";
    };
  }
});

// Fonction pour réinitialiser le quiz
buttonReplay.addEventListener('click', () => {
  currentQuestionIndex = 0; // Réinitialiser l'index 
  score = 0; //Reset du score 
  scoreText.innerHTML = "";
  buttonNext.style.display = 'inline-block'; // Afficher le bouton Suivant
  buttonReplay.style.display = 'none'; // Cacher le bouton rejouer
  loadQuestion(); // TODO Recharger la première question
});

//*********** ETAPE 4 **************   
// // // Récupérer la première question ainsi que ses réponses + la bonne reponse
// const firstQuestion = quizzitch.questions[0];

// // Injecter le texte de la question dans l'emplacement dédié
// askQuestion.innerText = firstQuestion.text;

// // Pour chaque option, créer un bouton et l'ajouter au conteneur
// firstQuestion.options.forEach(options => {
//   const optionButton = document.createElement('button');
//   optionButton.innerText = options;
//   answers.classList.add('options');
//   answers.appendChild(optionButton);
// }); ******/