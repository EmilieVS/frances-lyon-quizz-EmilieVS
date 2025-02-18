import {quizzitch} from './questions.js';

// Récupérer les emplacements pour injecter la question et les options
const askQuestion = document.getElementById('question-text');
const answers = document.getElementById('options-text');

// Récupérer la première question
const firstQuestion = quizzitch.questions[0];

// Injecter le texte de la question dans l'emplacement dédié
askQuestion.innerText = firstQuestion.text;

// Pour chaque option, créer un bouton et l'ajouter au conteneur
firstQuestion.options.forEach(options => {
  const optionButton = document.createElement('button');
  optionButton.innerText = options;
  answers.classList.add('options');
  answers.appendChild(optionButton);
});
