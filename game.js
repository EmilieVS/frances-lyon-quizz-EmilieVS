import {quizzitch} from './questions.js';

// Récupérer les emplacements pour injecter la question et les options et bouton suivant
const askQuestion = document.getElementById('question-text');
const answers = document.getElementById('options-text');
const buttonNext = document.getElementById('next-button');

// Variables pour suivre l'état du quiz
let currentQuestionIndex = 0; // Commence à la première question

// Fonction pour afficher une question basée sur l'index actuel
function loadQuestion() {
  // Vider le conteneur des options
  answers.innerHTML = '';

  // Récupérer la question actuelle (+reponse+correctanswer)
  const currentQuestion = quizzitch.questions[currentQuestionIndex];

  // Injecter la question dans le HTML
  askQuestion.innerText = currentQuestion.text; /*indice en plus ?*/

  // Injecter les options dans le HTML 
  currentQuestion.options.forEach(options => {
    const optionButton = document.createElement('button');
    optionButton.innerText = options;
    answers.classList.add('options');
    answers.appendChild(optionButton);
  });
}


// Ajouter un écouteur d'événements pour le bouton "Suivant"
buttonNext.addEventListener('click', () => {
  // Incrémenter l'index de la question
  currentQuestionIndex++;

  // Vérifier s'il reste des questions
  if (currentQuestionIndex < quizzitch.questions.length) {
    // Afficher la question suivante
    loadQuestion();
  } else {
    // Si plus de questions, indiquer la fin du quiz
    askQuestion.innerText = 'FIN DU QUIZZ';
    answers.innerHTML = ''; // Effacer les options
    buttonNext.style.display = 'none'; // Cacher le bouton Suivant
  }
});

// Charger la première question au chargement de la page
loadQuestion();


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