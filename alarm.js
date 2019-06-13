//declare variables we'll need
const alarmButton = document.querySelector(".btn-alarm");
const snoozeButton = document.querySelector(".btn-snooze");
const stopButton = document.querySelector(".btn-stopalarm");
const time = document.querySelector(".alarm-time");
const options = document.querySelector(".options");
const alarmSound = new Audio();

/*
 * I cannot guarantee this url
 * will not change and break
 * the sound functionality.
 */

alarmSound.src = "http://soundbible.com/mp3/Rooster-SoundBible.com-1114473528.mp3";
let alarmTimer;

// initially hide snooze button until it's useful
options.style.display = "none";

function setAlarm() {
  let ms = new Date().setHours(0, 0, 0, 0) + time.valueAsNumber;
  if (isNaN(ms)) {
    return alert("You've got to give me something to work with here, friend.");
  }
  let alarm = new Date(ms);
  var dt = new Date().getTime();
  let differenceInMs = alarm.getTime() - dt;

  if (differenceInMs < 0) {
    return alert("It looks like that's a date from the past! Are you a time traveler?!");
  }
  alarmTimer = setTimeout(initAlarm, differenceInMs);
  alarmButton.innerText = "Cancel Alarm";
  options.style.display = "";
  alarmButton.removeEventListener("click", setAlarm);
  alarmButton.addEventListener("click", cancelAlarm);
}

function cancelAlarm() {
  alarmSound.pause();
  alarmSound.currentTime = 0;
  clearTimeout(alarmTimer);
  alarmButton.innerText = "Set Alarm";
  options.style.display = "none";
  alarmButton.removeEventListener("click", cancelAlarm);
  alarmButton.addEventListener("click", setAlarm);
}

function initAlarm() {
  alarmSound.play();
  alarmSound.loop = true;
  alarmButton.innerText = "Stop Alarm";
  snoozeButton.addEventListener("click", snooze, false);
}

function snooze() {
  alarmSound.pause();
  alarmButton.innerText = "Cancel Alarm";
  setTimeout(initAlarm, 5000);
}

alarmButton.addEventListener("click", setAlarm, false);
