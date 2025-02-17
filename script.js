const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");
const option4 = document.querySelector("#option4");
const nextButton = document.querySelector("#next-button");
//nextButton.document.getElementById('nextButton').disabled = false



option1.addEventListener("click", () => {
    document.getElementById('option1').style.borderColor = 'red';
    document.getElementById('option2').style.borderColor = 'green';
    document.getElementById("option1").disabled = true;
    document.getElementById("option2").disabled = true;
    document.getElementById("option3").disabled = true;
    document.getElementById("option4").disabled = true;
});
 
option2.addEventListener("click", () => {
    document.getElementById('option2').style.borderColor = 'green';
    document.getElementById("option1").disabled = true;
    document.getElementById("option2").disabled = true;
    document.getElementById("option3").disabled = true;
    document.getElementById("option4").disabled = true;
});

option3.addEventListener("click", () => {
    document.getElementById('option3').style.borderColor = 'red';
    document.getElementById('option2').style.borderColor = 'green';
    document.getElementById("option1").disabled = true;
    document.getElementById("option2").disabled = true;
    document.getElementById("option3").disabled = true;
    document.getElementById("option4").disabled = true;
});

option4.addEventListener("click", () => {
    document.getElementById('option4').style.borderColor = 'red';
    document.getElementById('option2').style.borderColor = 'green';
    document.getElementById("option1").disabled = true;
    document.getElementById("option2").disabled = true;
    document.getElementById("option3").disabled = true;
    document.getElementById("option4").disabled = true;
});

nextButton.addEventListener("click", () => {
    nextButton.innerText = "Toto"

});
