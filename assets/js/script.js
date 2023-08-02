const startButton = document.querySelector('.start-button');
const instruction = document.querySelector('.instruction');
const quitButton = document.querySelector('.quit-button');
const mainSection = document.querySelector('.main-section');
const playNowButton = document.querySelector('.play-now-button');
const quizSection = document.querySelector('.quiz-section');
const welcomeText = document.querySelector('.welcome-text');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');

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
    scoreCount();
}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextButton = document.querySelector('.next-button');

nextButton.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);
    }
    else {
        showResultBox();
    }
}

const answerOptionsTop = document.querySelector('.top');
const answerOptionsBelow = document.querySelector('.below');
const answerOptions = document.querySelector('.answer-options');

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
    let allOptions = answerOptions.children.length;


    if (userAnswer == correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        scoreCount();
    }
    else {
        answer.classList.add('incorrect');

        // if answer incorrect, auto selected correct answer
        for (let i = 0; i < allOptions; i++) {
            if(answerOptionsTop.children[i].textContent == correctAnswer) {
                answerOptionsTop.children[i].setAttribute('class', 'answers correct');
            }
            else if(answerOptionsBelow.children[i].textContent == correctAnswer) {
                answerOptionsBelow.children[i].setAttribute('class', 'answers correct');
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        answerOptionsTop.children[i].classList.add('disabled');
        answerOptionsBelow.children[i].classList.add('disabled');
    }
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function scoreCount() {
    const scoreText = document.querySelector('.user-score');
    scoreText.textContent = `${userScore} / ${questions.length}`;
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const resultScoreText = document.querySelector('.result-score-text');
    resultScoreText.textContent = `You got ${userScore} / ${questions.length}`

    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = 0;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;

        //console.log(progressStartValue);
        progressValue.textContent = `${progressStartValue}%`;
        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
}
    