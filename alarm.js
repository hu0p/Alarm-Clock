//declare variables we'll need
const alarmButton = document.querySelector(".btn-alarm");
const snoozeButton = document.querySelector(".btn-snooze");
const stopButton = document.querySelector(".btn-stopalarm");
const ALARMSOUND = new Audio();
ALARMSOUND.src = "https://loganhoup.com/alarm.mp3";
let alarmTimer;

// initially hide snooze and stop alarm options until they're useful
document.querySelector(".options").style.display = "none";

function setAlarm() {
  let ms =
    new Date().setHours(0, 0, 0, 0) +
    document.querySelector(".alarm-time").valueAsNumber;
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
  // display snooze and cancel buttons after alarm is set
  document.querySelector(".options").style.display = "";
}

function cancelAlarm() {
  clearTimeout(alarmTimer);
  alarmButton.innerText = "Set Alarm";
  alarmButton.setAttribute("onclick", "setAlarm(this);");
  document.querySelector(".options").style.display = "none";
}

function initAlarm() {
  ALARMSOUND.play();
  ALARMSOUND.loop = true;
  document.querySelector(".options").style.display = "";
}

function stopAlarm() {
  ALARMSOUND.pause();
  ALARMSOUND.currentTime = 0;
  document.querySelector(".options").style.display = "none";
}

function snooze() {
  stopAlarm();
  setTimeout(initAlarm, 5000);
}

alarmButton.addEventListener("click", setAlarm, false);
snoozeButton.addEventListener("click", snooze, false);
stopButton.addEventListener("click", stopAlarm, false);
