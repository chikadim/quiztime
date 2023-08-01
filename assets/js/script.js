const startButton = document.querySelector('.start-button');
const instruction = document.querySelector('.instruction');
const quitButton = document.querySelector('.quit-button');
const mainSection = document.querySelector('.main-section');
const playNowButton = document.querySelector('.play-now-button');
const quizSection = document.querySelector('.quiz-section');
const welcomeText = document.querySelector('.welcome-text');

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
}