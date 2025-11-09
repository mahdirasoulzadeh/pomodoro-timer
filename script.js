// انتخاب عناصر
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const sessionCountEl = document.getElementById("session-count");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const musicToggle = document.getElementById("music-toggle");

const alarmSound = document.getElementById("alarm-sound");
const backgroundMusic = document.getElementById("background-music");

let workTime = 25 * 60; // 25 دقیقه
let breakTime = 5 * 60; // 5 دقیقه
let timer = workTime;
let timerInterval = null;
let isRunning = false;
let sessions = 0;

// بارگذاری حالت تاریک و تعداد جلسات
if(localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
    darkModeToggle.checked = true;
}

if(localStorage.getItem("sessions")) {
    sessions = parseInt(localStorage.getItem("sessions"));
    sessionCountEl.textContent = sessions;
}

// نمایش تایمر
function updateTimerDisplay() {
    let m = Math.floor(timer / 60);
    let s = timer % 60;
    minutesEl.textContent = m < 10 ? "0" + m : m;
    secondsEl.textContent = s < 10 ? "0" + s : s;
}

// شروع تایمر
function startTimer() {
    if(isRunning) return;
    isRunning = true;

    if(musicToggle.checked) {
        backgroundMusic.play();
    }

    timerInterval = setInterval(() => {
        if(timer > 0) {
            timer--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            isRunning = false;

            sessions++;
            sessionCountEl.textContent = sessions;
            localStorage.setItem("sessions", sessions);

            alarmSound.play();
            alert("وقت استراحته! 🌟");

            timer = workTime;
            updateTimerDisplay();
        }
    }, 1000);
}

// توقف تایمر
function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    backgroundMusic.pause();
}

// ریست تایمر
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timer = workTime;
    updateTimerDisplay();
    backgroundMusic.pause();
}

// تغییر حالت تاریک
darkModeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});

// دکمه‌ها
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// مقدار اولیه نمایش
updateTimerDisplay();
