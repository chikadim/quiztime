const startButton = document.querySelector('.start-button');
const instruction = document.querySelector('.instruction');
const quitButton = document.querySelector('.quit-button');
const mainSection = document.querySelector('.main-section');
const playNowButton = document.querySelector('.play-now-button');
const quizSection = document.querySelector('.quiz-section');
const welcomeText = document.querySelector('.welcome-text');
const quizBox = document.querySelector('.quiz-box');

startButton.onclick = () => {
    instruction.classList.add('active');
    mainSection.classList.add('active');
}

quitButton.onclick = () => {
    instruction.classList.remove('active');
    mainSection.classList.remove('active');
}

playNowButton.onclick = () => {
    quizSection.classList.add('active');
    instruction.classList.remove('active');
    mainSection.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
}

let questionCount = 0;
let questionNumb = 1;

const nextButton = document.querySelector('.next-button');

nextButton.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);
    }
    else {
        console.log("Question completed");
    }
}

const answerOptionsTop = document.querySelector('.top');
const answerOptionsBelow = document.querySelector('.below');

// getting questions and options from array
function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTop = `<span class="answers">${questions[index].options[0]}</span>
        <span class="answers">${questions[index].options[1]}</span>`;
    let optionBelow = `<span class="answers">${questions[index].options[2]}</span>
        <span class="answers">${questions[index].options[3]}</span>`;

    answerOptionsTop.innerHTML = optionTop;
    answerOptionsBelow.innerHTML = optionBelow;

    const answers = document.querySelectorAll('.answers');
    for (let i = 0; i < answers.length; i++) {
        answers[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;

    if (userAnswer == correctAnswer) {
        answer.classList.add('correct');
    }
    else {
        answer.classList.add('incorrect');
    }
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

    