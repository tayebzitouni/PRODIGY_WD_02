// متغيرات لتتبع الوقت
let startTime, updatedTime, difference, tInterval, running = false;
let pauseTime = 0; // الوقت الذي توقف فيه المؤقت

// الحصول على العناصر من DOM
const timerDisplay = document.querySelector('.timer-display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('Pause');
const resetButton = document.getElementById('reset');

// وظيفة لبدء أو استئناف المؤقت
function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - pauseTime; // تعديل وقت البدء بناءً على وقت التوقف
        tInterval = setInterval(updateDisplay, 1);
        running = true;
    }
}

// وظيفة لإيقاف المؤقت
function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        updatedTime = new Date().getTime();
        pauseTime = updatedTime - startTime; // احفظ الوقت الذي توقف فيه المؤقت
        running = false;
    }
}

// وظيفة لإعادة تعيين المؤقت
function resetTimer() {
    clearInterval(tInterval);
    running = false;
    pauseTime = 0; // إعادة تعيين وقت التوقف
    timerDisplay.textContent = '00 : 00 : 00 : 000';
}

// وظيفة لتحديث عرض المؤقت
function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    // حساب الساعات والدقائق والثواني والميلي ثانية
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor(difference % 1000);

    // تنسيق الوقت مع أصفار بادئة
    const formattedHours = (hours < 10) ? '0' + hours : hours;
    const formattedMinutes = (minutes < 10) ? '0' + minutes : minutes;
    const formattedSeconds = (seconds < 10) ? '0' + seconds : seconds;
    const formattedMilliseconds = (milliseconds < 100) ? '0' + milliseconds : milliseconds;
    timerDisplay.textContent = `${formattedHours} : ${formattedMinutes} : ${formattedSeconds} : ${formattedMilliseconds}`;
}

// مستمعو الأحداث للأزرار
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);


