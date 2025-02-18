import {quizzitch} from './questions.js';

// Récupérer les emplacements pour injecter la question et les options
const question = document.getElementById('question');
const options = document.getElementById('options');

// Récupérer la première question
const firstQuestion = quizzitch.questions[0];

// Injecter le texte de la question dans l'emplacement dédié
question.innerText = firstQuestion.text;

// Pour chaque option, créer un bouton et l'ajouter au conteneur
firstQuestion.options.forEach((options) => {
  const optionButton = document.createElement('button');
  optionButton.innerText = options;
  __________.classList.add('__________');
  __________.appendChild(__________);
});
