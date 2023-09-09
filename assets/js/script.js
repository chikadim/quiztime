const startButton = document.querySelector('.start-button');
const instruction = document.querySelector('.instruction');
const quitButton = document.querySelector('.quit-button');
const mainSection = document.querySelector('.main-section');
const playNowButton = document.querySelector('.play-now-button');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const homeButton = document.querySelector('.home-btn');
const resultHomeButton = document.querySelector('.result-home-btn');
const tryAgainButton = document.querySelector('.try-again-btn');
const registerUser = document.querySelector('.register-user');
const loginUser = document.querySelector('.login-user');
const signUp = document.querySelector('.sign-up');
const signIn = document.querySelector('.sign-in');
const registerBtn = document.querySelector('.register-btn');
const user = document.querySelector('.user');
const nextButton = document.querySelector('.next-button');
const welcomeText = document.querySelector('.welcome-text');

const form = document.querySelector('.register-form');


startButton.onclick = () => {
    instruction.classList.add('active');
    mainSection.classList.add('active');
    welcomeText.classList.add('active');
}

quitButton.onclick = () => {
    instruction.classList.remove('active');
    mainSection.classList.remove('active');
    welcomeText.classList.remove('active');
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

signUp.onclick = () => {
    welcomeText.classList.add('active');
    quizBox.classList.remove('active');
    registerUser.classList.add('active');
    mainSection.classList.add('active');
    resultBox.classList.remove('active');
    
}

signIn.onclick = () => {
    welcomeText.classList.add('active');
    quizBox.classList.remove('active');
    loginUser.classList.add('active');
    mainSection.classList.add('active');
    resultBox.classList.remove('active');
}

/*registerBtn.onclick = () => {
    registerUser.classList.remove('active');
    mainSection.classList.remove('active');
    quizSection.classList.add('active');
    quizBox.classList.add('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    showQuestions(questionCount);
    questionCounter(questionNumb);
    
    scoreCount();

    user.textContent = emailInput.value;
}*/

form.addEventListener('submit', (e) => {
    
    validateForm();
    
    if (isFormValid() == True) {
        form.submit();
    } else {
        e.preventDefault(); 
    }
})

/*========================================
This function checks if the data entered
in the inputs are valid. If they are valid,
it returns true when called.
=========================================*/
function isFormValid() {
    const inputContainers = form.querySelectorAll('.input-group');
    let result = true;
    inputContainers.forEach((container) => {
        if (container.classList.contains('error')) {
            result = false;
        }
    });

    return result;
}

/*=========================================
This function validates the form inputs
==========================================*/
function validateForm() {
    // Validate Name
    const nameInput = document.querySelector('.name-input');
    if(nameInput.value.trim() == '') {
        setError(nameInput, 'Name cannot be empty');
    } else if(nameInput.value.trim().length < 2  || nameInput.value.trim().length > 15) {
        setError(nameInput, 'Name must be Min 2 and Max 15 characters');
    } else {
        setSuccess(nameInput);
    }

    //Validate Email
    const emailInput = document.querySelector('.email-input');
    if(emailInput.value.trim() == '') {
        setError(emailInput, 'Email cannot be empty');
    } else if(isValidEmail(emailInput.value)) {
        setSuccess(emailInput);
    } else {
        setError(emailInput, 'Provide valid Email address');
    }

    //Validate Password
    const passwordInput = document.querySelector('.password-input');
    if(passwordInput.value.trim() == '') {
        setError(passwordInput, 'Password cannot be empty');
    } else if(passwordInput.value.trim().length < 6 || passwordInput.value.trim().length > 20) {
        setError(passwordInput, 'Pasword must be Min 6 and Max 20 characters');
    } else {
        setSuccess(passwordInput);
    }
}

/*=========================================
This function indicates the error message
when the user enters an invalid name
==========================================*/
function setError(element, errorMessage) {
    const parent = element.parentElement;
    if(parent.classList.contains('success')) {
        parent.classList.remove('success');
    }
    parent.classList.add('error');

    const paragraph = parent.querySelector('p');
    paragraph.textContent = errorMessage;
}

/*========================================
This function indicates success when the user
enters a valid name
========================================*/
function setSuccess(element) {
    const parent = element.parentElement;
    if(parent.classList.contains('error')) {
        parent.classList.remove('error');
    }
    parent.classList.add('success');
}

/*========================================
This function checks if the inputted email
is a valid email address
========================================*/
function isValidEmail(email) {
    const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return reg.test(email);
}



let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

nextButton.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextButton.classList.remove('active');
    }
    else {
        showResultBox();
    }
}

homeButton.onclick = () => {
    quizSection.classList.remove('active');
    welcomeText.classList.remove('active');

}

resultHomeButton.onclick = () => {
    quizSection.classList.remove('active');
    quizBox.classList.remove('active');
    resultBox.classList.remove('active');
    welcomeText.classList.remove('active');
}

tryAgainButton.onclick = () => {
    quizSection.classList.add('active');
    quizBox.classList.add('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    showQuestions(questionCount);
    questionCounter(questionNumb);
    
    scoreCount();
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

    nextButton.classList.add('active');
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
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;

    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;

        progressValue.textContent = `${progressStartValue}%`;
        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
}