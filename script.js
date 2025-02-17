const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");
const option4 = document.querySelector("#option4");



option1.addEventListener("click", () => {
    document.getElementById('option1').style.borderColor = 'red';
    document.getElementById('option2').style.borderColor = 'green';
});
 
option2.addEventListener("click", () => {
    document.getElementById('option2').style.borderColor = 'green';
});

option3.addEventListener("click", () => {
    document.getElementById('option3').style.borderColor = 'red';
    document.getElementById('option2').style.borderColor = 'green';
});

option4.addEventListener("click", () => {
    document.getElementById('option4').style.borderColor = 'red';
    document.getElementById('option2').style.borderColor = 'green';
});
