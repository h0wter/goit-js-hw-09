const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};
let isActive = false;
let startInterval = null;

refs.start.addEventListener('click', onStartClick);
refs.stop.addEventListener('click', onStopClick);

function onStartClick() {
  if (isActive) {
    return;
  }
  isActive = true;
  refs.body.style.backgroundColor = getRandomHexColor();
  startInterval = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopClick() {
  clearInterval(startInterval);
  isActive = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
