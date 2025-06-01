let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

const display = document.getElementById("time");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("laps");

startPauseBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 10);
    startPauseBtn.textContent = "Pause";
    lapBtn.disabled = false;
    isRunning = true;
  } else {
    clearInterval(intervalId);
    elapsedTime = Date.now() - startTime;
    startPauseBtn.textContent = "Start";
    lapBtn.disabled = true;
    isRunning = false;
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  display.textContent = "00:00:00.000";
  startPauseBtn.textContent = "Start";
  lapBtn.disabled = true;
  lapsList.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
  const lapTime = formatTime(elapsedTime);
  const li = document.createElement("li");
  li.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
  lapsList.appendChild(li);
});

function updateTime() {
  elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
  let milliseconds = ms % 1000;
  let seconds = Math.floor((ms / 1000) % 60);
  let minutes = Math.floor((ms / 60000) % 60);
  let hours = Math.floor(ms / 3600000);

  return (
    String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0") + "." +
    String(milliseconds).padStart(3, "0")
  );
}
