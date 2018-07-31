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

// initially hides snooze and stop alarm options until they're useful
options.style.display = "none";

function setAlarm() {
  let ms =
    new Date().setHours(0, 0, 0, 0) +
    time.valueAsNumber;
  if (isNaN(ms)) {
    alert("You've got to give me something to work with here, friend.");
    return;
  }
  let alarm = new Date(ms);
  var dt = new Date().getTime();
  let differenceInMs = alarm.getTime() - dt;

  if (differenceInMs < 0) {
    alert(
      "It looks like that's a date from the past! Are you a time traveler?!"
    );
    return;
  }
  alarmTimer = setTimeout(initAlarm, differenceInMs);
  alarmButton.innerText = "Cancel Alarm";
  alarmButton.setAttribute("onclick", "cancelAlarm(this);");
  options.style.display = "";
}

function cancelAlarm() {
  clearTimeout(alarmTimer);
  alarmButton.innerText = "Set Alarm";
  alarmButton.setAttribute("onclick", "setAlarm(this);");
  options.style.display = "none";
}

function initAlarm() {
  alarmSound.play();
  alarmSound.loop = true;
  options.style.display = "";
}

function stopAlarm() {
  alarmSound.pause();
  alarmSound.currentTime = 0;
  options.style.display = "none";
}

function snooze() {
  stopAlarm();
  setTimeout(initAlarm, 5000);
}

alarmButton.addEventListener("click", setAlarm, false);
snoozeButton.addEventListener("click", snooze, false);
stopButton.addEventListener("click", stopAlarm, false);
