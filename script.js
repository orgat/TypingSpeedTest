const sentences = [
  "The suspicious tea can't frame the chair.",
  'The artistic village tickles into the phony limit.',
  'What if the foamy tension ate the screen?',
  'The showy audience fastens into the rebel past.',
  'Why did you really have to do that???',
  "The adept guy can't trouble the possibility.",
  'Is the mark upstairs better than the apartment?',
  'Is the breathe protection better than the camera?',
  'The hideous store prays into the prickly spirit.',
  'Looks great, now please leave before I get angry!',
  'Did the chemical external really drag the key?',
  'The symptomatic hospital stitches into the supreme morning.',
  'Did the spiteful doctor really pick the human?',
  "The oblong road can't tremble the exchange.",
  'What if the fine iron ate the bet?',
  'What if the cloudy self ate the tap?',
  'The required solid argues into the level city.',
  'This sentence is a lie...',
  'Please check your incoming messages.',
  'Do not temper with the safety devices.',
  'Do not shake the machines!',
  'Take my humble advice on this good sir.',
  'I am truly sorry for being so late!',
  'COULD YOU PLEASE STOP WRITING IN CAPS?'
];

var timerInterval = null;
var timer = 0;
const timerElem = document.querySelector('.timer');
const sentenceElem = document.querySelector('.sentence');
const inputElem = document.querySelector('.input');
const performanceElem = document.querySelector('.performance');
const overallSpeedElem = document.querySelector('.overall-speed');
const averageSpeedElem = document.querySelector('.average-speed');
const resetBtn = document.querySelector('#reset');

function randomizeSentence() {
  const sentenceElem = document.querySelector('.sentence');
  sentenceElem.textContent =
    sentences[Math.floor(Math.random() * sentences.length)];
}

function begin() {
  if (inputElem.value.length === 0) {
    timerInterval = setInterval(incTimer, 10);
  }
}

function finish() {
  clearInterval(timerInterval);
  inputElem.style.borderColor = '#00FF00';

  let seconds = Math.floor(timer / 100) % 60;
  let minutes = Math.floor(timer / 100 / 60);
  let numOfCharacters = sentenceElem.textContent.length;

  let secondsText;
  if (seconds > 1) {
    secondsText = `${seconds} seconds`;
  } else {
    secondsText = `${seconds} second`;
  }

  let minutesText;
  if (minutes > 1) {
    minutesText = `${minutes} minutes and `;
  } else if (minutes === 1) {
    minutesText = `${minutes} minute and `;
  } else {
    minutesText = '';
  }

  let overallSpeed = `It took you ${minutesText}${secondsText} to type ${numOfCharacters} characters.`;

  let averageSpeed = `Your average typing speed was ${(
    numOfCharacters /
    (timer / 100)
  ).toFixed(2)} characters per second.`;

  overallSpeedElem.textContent = overallSpeed;
  averageSpeedElem.textContent = averageSpeed;
  performanceElem.style.display = 'block';
}

function formatWithZero(val) {
  return val < 10 ? `0${val}` : val;
}

function incTimer() {
  timer++;
  let minutes = formatWithZero(Math.floor(timer / 100 / 60));
  let seconds = formatWithZero(Math.floor(timer / 100) % 60);
  let hundredthsOfSeconds = formatWithZero(timer % 100);
  timerElem.textContent = `${minutes}:${seconds}:${hundredthsOfSeconds}`;
}

function checkInput() {
  if (sentenceElem.textContent === inputElem.value) {
    finish();
  } else if (inputElem.value.length === 0) {
    inputElem.style.borderColor = 'white';
  } else if (sentenceElem.textContent.indexOf(inputElem.value) != -1) {
    inputElem.style.borderColor = 'dodgerblue';
  } else {
    inputElem.style.borderColor = 'red';
  }
}

function reset() {
  randomizeSentence();
  performanceElem.style.display = 'none';
  timerElem.textContent = '00:00:00';
  timer = 0;
  clearInterval(timerInterval);
  inputElem.value = '';
  inputElem.style.borderColor = 'white';
}

inputElem.addEventListener('keypress', begin);
inputElem.addEventListener('keyup', checkInput);
resetBtn.addEventListener('click', reset);

randomizeSentence();
