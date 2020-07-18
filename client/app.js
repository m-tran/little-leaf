// import { Strategy } from "passport-local";

const start = document.getElementById('start');
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");


let questions = [
    {
        question: 'What size is your room?',
        imgSrc: './assets/img/plantroom.jpg',
        choiceA: 'Small',
        choiceB: 'Medium',
        choiceC: 'Large',
    },
    {
        question: 'What are you looking for?',
        imgSrc: './assets/img/plants.jpg',
        choiceA: 'Improve air quality',
        choiceB: 'Sleep assitance',
    },
    {
        question: 'Do you prefer:',
        imgSrc: './assets/img/maintenance.jpg',
        choiceA: 'High Maintenance',
        choiceB: 'Low maintenance',
    },
];

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
let score = 0;

function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
}

$('#A').on('click', function () {
    count++;
    console.log(count);

});
$('#B').on('click', function () {
    count += 2;
    console.log(count);

}); $('#C').on('click', function () {
    count += 3;
    console.log(count);

});





















