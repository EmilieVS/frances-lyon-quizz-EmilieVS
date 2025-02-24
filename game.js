import { quizzitch } from './questions.js';

// Récupérer HTML
const askQuestion = document.getElementById('question-text');
const answers = document.getElementById('options-text');
const buttonNext = document.getElementById('next-button');
const buttonReplay = document.getElementById('replay-button');
const scoreText = document.getElementById('score-text');

let currentQuestionIndex = 0; // Commence à la première question
let storeQuestion; // On déclare 1 variable pour le localstorage
let score = 0; // initie le score 
let validButton; //Afin d'isoler plus tard la bonne réponse


function storage() {
  localStorage.setItem("position", currentQuestionIndex); // stock la valeur du currentQuestionIndex
  storeQuestion = localStorage.getItem("position");  // restitue la valeur 
  return storeQuestion;
}

function colorAskQuestion () {
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
}

function colorButtonNext () {
  if (buttonNext.disabled == true) {
    buttonNext.style.backgroundColor = '#05446ed1';
    buttonNext.style.color = '#b8b4b4';
  } else if (buttonNext.disabled == false) {
    buttonNext.style.backgroundColor = '#e7e6e2eb'; 
    buttonNext.style.color = '#463533';
  }
}

function colorOptionButton (boutonReponse) {
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
}

function rightAnswer (a, b) {
  if (a.innerText == b) { // on compare le texte du bouton au texte de la correctAnswer (pas besoin de rajouter innerText)
    validButton = a; //si c'est egal, on stock la valeur de optionButton dans la variable globale validButton qui deviendra donc un "bouton".
  }
}

/*******Fonction principale********/
function loadQuestion() {
  storage()
  answers.innerHTML = ''; // Vider le conteneur des options
  let goodAnswer = quizzitch.questions[storeQuestion].correct_answer;
  const currentQuestion = quizzitch.questions[storeQuestion]; // Récup question actuelle + réponses
  colorAskQuestion();
  askQuestion.innerText = currentQuestion.text; // Injecter la question dans le HTML
  buttonNext.disabled = true; // Désactive le boutton "suivant"
  colorButtonNext();
  currentQuestion.options.forEach(option => { // Injecter les options dans le HTML 
    let optionButton; // declaration variable bouton reponse
    optionButton = document.createElement('button');
    optionButton.innerText = option;
    colorOptionButton(optionButton);
    answers.classList.add('options');
    rightAnswer(optionButton, goodAnswer);
    optionButton.addEventListener("click", () => { // placer la suite en une fonction qui sera appelée par l'AEL
      let playerAnswer = optionButton.innerText;
      let coloredAnswer = checkAnswer(playerAnswer, goodAnswer);
      buttonNext.disabled = false; // Au clique d'une réponse, le boutton "suivant" s'active
      colorButtonNext();
      if (coloredAnswer) /*veut dire == true*/ {
        optionButton.style.borderColor = '#85e085';
        score++;
      } else {
        optionButton.style.borderColor = '#ff0000';
        validButton.style.borderColor = '#85e085';
      }

      document.querySelectorAll('#options-text button').forEach(tate => { //Selection de tous les bouttons avec id options-text
        tate.disabled = true; // Pour chacun d'entre eux, désactivation
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
  storage()
  currentQuestionIndex++; // Incrémenter l'index de la question
  if (currentQuestionIndex < quizzitch.questions.length) { // Vérifier s'il reste des questions
    loadQuestion(); // Afficher la question suivante
  } else {
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
    //localStorage.quizzitch = score;
    //alert(localStorage.quizzitch);



  }
});

// Fonction pour réinitialiser le quiz
buttonReplay.addEventListener('click', () => {
  currentQuestionIndex = 0; // Réinitialiser l'index 
  score = 0; //Reset du score 
  buttonNext.style.display = 'inline-block'; // Afficher le bouton Suivant
  buttonReplay.style.display = 'none'; // Désactiver l'affichage du bouton rejouer
  loadQuestion(); // Recharger la première question
  scoreText.style.display = 'none'; //Désactiver l'affichage de scoreText 

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