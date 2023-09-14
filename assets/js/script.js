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
const signOut = document.querySelector('.sign-out');
const registerBtn = document.querySelector('.register-btn');
const user = document.querySelector('.user');
const nextButton = document.querySelector('.next-button');
const welcomeText = document.querySelector('.welcome-text');

const registerForm = document.querySelector('.register-form');
const loginForm = document.querySelector('.login-form');
const nameInput = document.querySelector('.name-input');
const registerFormcloseBtn = document.querySelector('.register-form-close-btn');
const loginFormCloseBtn = document.querySelector('.login-form-close-btn');
const loginBtn = document.querySelector('.login-btn');
const checkEmail = document.querySelector('.check-email');

const categoriesArea = document.querySelector('.categories-area');



startButton.onclick = () => {
    instruction.classList.add('active');
    mainSection.classList.add('active');
    welcomeText.classList.add('active');
}

quitButton.onclick = () => {
    instruction.classList.remove('active');
    mainSection.classList.remove('active');
    welcomeText.classList.remove('active');

    window.location.reload();
}

signOut.onclick = () => {
    instruction.classList.remove('active');
    mainSection.classList.remove('active');
    welcomeText.classList.remove('active');

    signOut.classList.remove('active');
    signIn.classList.remove('active');
    signUp.classList.remove('active');

    window.location.reload();
}

playNowButton.onclick = () => {
    quizSection.classList.add('active');
    instruction.classList.remove('active');
    mainSection.classList.remove('active');
    quizBox.classList.add('active');

    //loadGenKnowledge(0);
    //questionCounter(1);
    //scoreCount();

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    let getInitialCategory = initialCategory.textContent;

    if (getInitialCategory == 'General Knowledge') {
        loadGenKnowledge(questionCount);
        questionCounter(questionNumb);
    
        scoreCount();

    } else if (getInitialCategory == 'Sports') {
        loadSports(questionCount);

        questionCounter(questionNumb);
    
        scoreCount();

    }
}

signUp.onclick = () => {
    welcomeText.classList.add('active');
    quizBox.classList.remove('active');
    registerUser.classList.add('active');
    mainSection.classList.add('active');
    resultBox.classList.remove('active');
    
}

registerFormcloseBtn.onclick = () => {
    registerUser.classList.remove('active');
    mainSection.classList.remove('active');
    welcomeText.classList.remove('active');

    window.location.reload();
}

loginFormCloseBtn.onclick = () => {
    loginUser.classList.remove('active');
    mainSection.classList.remove('active');
    welcomeText.classList.remove('active');

    window.location.reload();
}

signIn.onclick = () => {
    welcomeText.classList.add('active');
    quizBox.classList.remove('active');
    loginUser.classList.add('active');
    mainSection.classList.add('active');
    resultBox.classList.remove('active');
}

categoriesArea.onclick = () => {
    showCategory(questionCount);
    categorySelected();
}

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    validateRegisterForm();
    
    if (isRegisterFormValid() == true) {
        registerUser.classList.remove('active');
        mainSection.classList.remove('active');
        quizSection.classList.add('active');
        quizBox.classList.add('active');
        signUp.classList.add('active');
        signIn.classList.add('active');
        signOut.classList.add('active');


        questionCount = 0;
        questionNumb = 1;
        userScore = 0;

        loadGenKnowledge(questionCount);
        questionCounter(questionNumb);
        
        scoreCount();

        user.textContent = nameInput.value;
    } else {
        e.preventDefault();
    }
})

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    validateLoginForm();

    if (isLoginFormValid() == true) {
        loginUser.classList.remove('active');
        mainSection.classList.remove('active');
        quizSection.classList.add('active');
        quizBox.classList.add('active');
        signUp.classList.add('active');
        signIn.classList.add('active');
        signOut.classList.add('active');


        questionCount = 0;
        questionNumb = 1;
        userScore = 0;

        loadGenKnowledge(questionCount);

        questionCounter(questionNumb);
        
        scoreCount();

        user.textContent = checkEmail.value;
        
    } else {
        e.preventDefault();
    }
})

/*
 *This function checks if the data entered
 *in the inputs are valid. If they are valid,
 *it returns true when called.
 */
function isRegisterFormValid() {
    const inputContainers = registerForm.querySelectorAll('.input-group');
    let result = true;
    inputContainers.forEach((container) => {
        if (container.classList.contains('error')) {
            result = false;
        }
    });

    return result;
}

function isLoginFormValid() {
    const inputContainers = loginForm.querySelectorAll('.input-group');
    let result = true;
    inputContainers.forEach((container) => {
        if (container.classList.contains('error')) {
            result = false;
        }
    });

    return result;
}

/*
 *   This function validates the form register form
 */
function validateRegisterForm() {
    // Validates name input
    const nameInput = document.querySelector('.name-input');
    if(nameInput.value.trim() == '') {
        setError(nameInput, 'Name cannot be empty');
    } else if(nameInput.value.trim().length < 2  || nameInput.value.trim().length > 15) {
        setError(nameInput, 'Name must be Min 2 and Max 15 characters');
    } else {
        setSuccess(nameInput);
    }

    //Validates email input
    const emailInput = document.querySelector('.email-input');
    if(emailInput.value.trim() == '') {
        setError(emailInput, 'Email cannot be empty');
    } else if(isValidEmail(emailInput.value)) {
        setSuccess(emailInput);
    } else {
        setError(emailInput, 'Provide valid Email address');
    }

    //Validates password input
    const passwordInput = document.querySelector('.password-input');
    if(passwordInput.value.trim() == '') {
        setError(passwordInput, 'Password cannot be empty');
    } else if(passwordInput.value.trim().length < 6 || passwordInput.value.trim().length > 20) {
        setError(passwordInput, 'Pasword must be Min 6 and Max 20 characters');
    } else {
        setSuccess(passwordInput);
    }
}

/*
 *   This function validates the form inputs
 */
function validateLoginForm() {
    //Validates email input
    if(checkEmail.value.trim() == '') {
        setError(checkEmail, 'Email cannot be empty');
    } else if(isValidEmail(checkEmail.value)) {
        setSuccess(checkEmail);
    } else {
        setError(checkEmail, 'Provide valid Email address');
    }

    //Validate password input
    const checkPassword = document.querySelector('.check-password');
    if(checkPassword.value.trim() == '') {
        setError(checkPassword, 'Password cannot be empty');
    } else if(checkPassword.value.trim().length < 6 || checkPassword.value.trim().length > 20) {
        setError(checkPassword, 'Pasword must be Min 6 and Max 20 characters');
    } else {
        setSuccess(checkPassword);
    }
}

/*
 *   This function indicates the error message
 *   when the user enters an invalid name
 */
function setError(element, errorMessage) {
    const parent = element.parentElement;
    if(parent.classList.contains('success')) {
        parent.classList.remove('success');
    }
    parent.classList.add('error');

    const paragraph = parent.querySelector('p');
    paragraph.textContent = errorMessage;
}

/*
 *   This function indicates success when the user
 *   enters a valid name
 */
function setSuccess(element) {
    const parent = element.parentElement;
    if(parent.classList.contains('error')) {
        parent.classList.remove('error');
    }
    parent.classList.add('success');
}

/*
 *   This function checks if the inputted email
 *   is a valid email address
 */
function isValidEmail(email) {
    const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return reg.test(email);
}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const initialCategory = document.querySelector('.initial-category');


/*
 *   This function loads questions and answers
 *   belonging to the category that is
 */
nextButton.onclick = () => {
    let getInitialCategory = initialCategory.textContent;
    
    if (getInitialCategory == 'General Knowledge' && questionCount < categories[0].questions.length - 1) {

        questionCount++;
        loadGenKnowledge(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextButton.classList.remove('active');

    } else if (getInitialCategory == 'Sports' && questionCount < categories[1].questions.length - 1) {

        questionCount++;
        loadSports(questionCount);

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

    let getInitialCategory = initialCategory.textContent;

    if (getInitialCategory == 'General Knowledge') {
        loadGenKnowledge(questionCount);
        questionCounter(questionNumb);
    
        scoreCount();

    } else if (getInitialCategory == 'Sports') {
        loadSports(questionCount);

        questionCounter(questionNumb);
    
        scoreCount();

    }
}

const answerOptionsTop = document.querySelector('.top');
const answerOptionsBelow = document.querySelector('.below');
const answerOptions = document.querySelector('.answer-options');

/*
 *   This function loads the questions and 
 *   answers for general knowledge category
*/
function loadGenKnowledge(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${categories[0].questions[index].numb}. ${categories[0].questions[index].question}`;

    let optionTop = `<span class="answers">${categories[0].questions[index].options[0]}</span>
        <span class="answers">${categories[0].questions[index].options[1]}</span>`;
    let optionBelow = `<span class="answers">${categories[0].questions[index].options[2]}</span>
        <span class="answers">${categories[0].questions[index].options[3]}</span>`;

    answerOptionsTop.innerHTML = optionTop;
    answerOptionsBelow.innerHTML = optionBelow;

    const answers = document.querySelectorAll('.answers');
    for (let i = 0; i < answers.length; i++) {
        answers[i].setAttribute('onclick', 'optionSelected(this)');
    }
}


/*
 *   This function loads the questions and 
 *   answers for sports category
*/
function loadSports(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${categories[1].questions[index].numb}. ${categories[1].questions[index].question}`;

    let optionTop = `<span class="answers">${categories[1].questions[index].options[0]}</span>
        <span class="answers">${categories[1].questions[index].options[1]}</span>`;
    let optionBelow = `<span class="answers">${categories[1].questions[index].options[2]}</span>
        <span class="answers">${categories[1].questions[index].options[3]}</span>`;

    answerOptionsTop.innerHTML = optionTop;
    answerOptionsBelow.innerHTML = optionBelow;

    const answers = document.querySelectorAll('.answers');
    for (let i = 0; i < answers.length; i++) {
        answers[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

/*
 *   This function lists all categories to select from  
*/
function showCategory(index) {
    const rotateAngle = document.querySelector('.rotate');

    rotateAngle.style.transform = 'rotate(-180deg)';

    const categoryList = document.querySelector('.category-list');
    let categoryNames = `
    <li class="category-name">${categories[0].category}</li>
    <li class="category-name">${categories[1].category}</li>`;

    if (categoryList.classList.contains('active')) {
        rotateAngle.style.transform = 'rotate(0deg)';

        setTimeout(() => {
            categoryList.innerHTML = '';
            
        }, 200);

        categoryList.classList.remove('active');
    } else {
        categoryList.classList.add('active');
        categoryList.innerHTML = categoryNames;
    }
}

/*
 *   This function calls the functios to load
 *   the category selected
*/
function categorySelected() {
    const categoryList = document.querySelector('.category-list');
    const categoryName = document.querySelectorAll('.category-name');
    const initialCategory = document.querySelector('.initial-category');
    const rotateAngle = document.querySelector('.rotate');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    for (let i = 0; i < categoryName.length; i++) {
        const listElement = categoryName[i]

        listElement.addEventListener('click', (e) => {
            const selected = e.target.textContent;

            initialCategory.textContent = selected;

            rotateAngle.style.transform = 'rotate(0deg)';

            if (selected == 'General Knowledge') {

                loadGenKnowledge(questionCount);

            } else if (selected == 'Sports') {

                loadSports(questionCount);   
            }


            categoryList.classList.remove('active');

            setTimeout(() => {
                categoryList.innerHTML = '';

            }, 200);
        })
    }
}

/*
 *   This function handles the answers section
*/
function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let generalKnowledgeCorrectAnswer = categories[0].questions[questionCount].answer;
    let sportsCorrectAnswer = categories[1].questions[questionCount].answer;
    let allOptions = answerOptions.children.length;

    let getInitialCategory = initialCategory.textContent;

    if (getInitialCategory == 'General Knowledge' && userAnswer == generalKnowledgeCorrectAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        scoreCount();

    } else if (getInitialCategory == 'Sports' && userAnswer == sportsCorrectAnswer ) {
        answer.classList.add('correct');
        userScore += 1;
        scoreCount();

    }
    else {
        answer.classList.add('incorrect');

        // if answer incorrect, auto selected correct answer
        for (let i = 0; i < allOptions; i++) {
            if(answerOptionsTop.children[i].textContent == generalKnowledgeCorrectAnswer) {
                answerOptionsTop.children[i].setAttribute('class', 'answers correct');
            }
            else if(answerOptionsBelow.children[i].textContent == generalKnowledgeCorrectAnswer) {
                answerOptionsBelow.children[i].setAttribute('class', 'answers correct');
            }
            else if(answerOptionsTop.children[i].textContent == sportsCorrectAnswer) {
                answerOptionsTop.children[i].setAttribute('class', 'answers correct');
            }
            else if(answerOptionsBelow.children[i].textContent == sportsCorrectAnswer) {
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

/*
 *   This function counts the questions when they
 *   are selected
*/
function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');

    let getInitialCategory = initialCategory.textContent;

    if (getInitialCategory == 'General Knowledge') {
        questionTotal.textContent = `${index} of ${categories[0].questions.length} Questions`;

    } else if (getInitialCategory == 'Sports') {
        questionTotal.textContent = `${index} of ${categories[1].questions.length} Questions`;
    }
    
}

/*
 *   This function counts the scores for the user  
*/
function scoreCount() {
    const scoreText = document.querySelector('.user-score');

    let getInitialCategory = initialCategory.textContent;

    if (getInitialCategory == 'General Knowledge') {
        scoreText.textContent = `${userScore} / ${categories[0].questions.length}`;

    } else if (getInitialCategory == 'Sports') {
        scoreText.textContent = `${userScore} / ${categories[1].questions.length}`;

    }
}

/*
 *   This function displays the calculated score
 *   of the user 
*/
function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    let getInitialCategory = initialCategory.textContent;

    if (getInitialCategory == 'General Knowledge') {

        const resultScoreText = document.querySelector('.result-score-text');
        resultScoreText.textContent = `You got ${userScore} / ${categories[0].questions.length}`

        const progressValue = document.querySelector('.progress-value');
        let progressStartValue = -1;
        let progressEndValue = (userScore / categories[0].questions.length) * 100;

        let speed = 20;

        let progress = setInterval(() => {
            progressStartValue++;

            progressValue.textContent = `${progressStartValue}%`;
            if (progressStartValue == progressEndValue) {
                clearInterval(progress);
            }
        }, speed);

    } else if (getInitialCategory == 'Sports') {

        const resultScoreText = document.querySelector('.result-score-text');
        resultScoreText.textContent = `You got ${userScore} / ${categories[1].questions.length}`

        const progressValue = document.querySelector('.progress-value');
        let progressStartValue = -1;
        let progressEndValue = (userScore / categories[1].questions.length) * 100;

        let speed = 20;

        let progress = setInterval(() => {
            progressStartValue++;

            progressValue.textContent = `${progressStartValue}%`;
            if (progressStartValue == progressEndValue) {
                clearInterval(progress);
            }
        }, speed);

    }
}