import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startButton: document.querySelector('button[data-start]'),
  textDays: document.querySelector('span[data-days]'),
  textHours: document.querySelector('span[data-hours]'),
  textMins: document.querySelector('span[data-minutes]'),
  textSecs: document.querySelector('span[data-seconds]'),
};

let dateDiff = null;
let dateChoosen = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.now() < selectedDates[0].getTime()) {
      refs.startButton.removeAttribute('disabled');
      dateChoosen = selectedDates[0].getTime();
    } else {
      dataAlert();
    }
  },
};
refs.startButton.addEventListener('click', onStartClick);
refs.startButton.setAttribute('disabled', '');
flatpickr('input#datetime-picker', options);

function onStartClick() {
  if (dateChoosen < Date.now()) {
    dataAlert();
    return;
  }

  changeHTML(addLeadingZero(convertMs(dateChoosen - Date.now())));
  const timer = setInterval(() => {
    dateDiff = dateChoosen - Date.now();
    if (dateDiff < 0) {
      clearInterval(timer);
      return;
    }
    const convertedData = addLeadingZero(convertMs(dateDiff));
    changeHTML(convertedData);
  }, 1000);
}

function changeHTML(date) {
  refs.textDays.textContent = date.days;
  refs.textHours.textContent = date.hours;
  refs.textMins.textContent = date.minutes;
  refs.textSecs.textContent = date.seconds;
}

function dataAlert() {
  refs.startButton.setAttribute('disabled', '');
  Notiflix.Notify.failure('Please choose a date in the future');
}

function addLeadingZero(value) {
  const days = value.days.toString().padStart(2, 0);
  const hours = value.hours.toString().padStart(2, 0);
  const minutes = value.minutes.toString().padStart(2, 0);
  const seconds = value.seconds.toString().padStart(2, 0);
  return { days, hours, minutes, seconds };
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
