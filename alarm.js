const alarmSound = new Audio();
alarmSound.src = "https://loganhoup.com/alarm.mp3";
let alarmTimer;

function setAlarm(button) {
  let ms =
    new Date().setHours(0, 0, 0, 0) +
    document.getElementById("alarmTime").valueAsNumber;
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
  button.innerText = "Cancel Alarm";
  button.setAttribute("onclick", "cancelAlarm(this);");
}

function cancelAlarm(button) {
  clearTimeout(alarmTimer);
  button.innerText = "Set Alarm";
  button.setAttribute("onclick", "setAlarm(this);");
}

function initAlarm() {
  alarmSound.play();
  document.getElementbyId("alarmOptions").style.display = "";
}

function stopAlarm() {
  alarmSound.pause();
  alarmSound.currentTime = 0;
  document.getElementbyId("alarmOptions").style.display = "none";
}

function snooze() {
  stopAlarm();
  setTimeout(initAlarm, 6000);
}
