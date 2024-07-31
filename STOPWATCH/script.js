let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCounter = 1;

const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const tablist = document.getElementById('tablist_data');

function updateTime() {
    const now = Date.now();
    const timeDiff = now - startTime + elapsedTime;
    const hours = Math.floor(timeDiff / 3600000);
    const minutes = Math.floor((timeDiff % 3600000) / 60000);
    const seconds = Math.floor((timeDiff % 60000) / 1000);
    const milliseconds = Math.floor((timeDiff % 1000) / 10);

    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
    millisecondsEl.textContent = String(milliseconds).padStart(2, '0');
}

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now();
        timer = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    millisecondsEl.textContent = '00';
    startStopBtn.textContent = 'Start';
    tablist.innerHTML = '';
    lapCounter = 1;
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        // Create table header if not already present
        if (tablist.querySelector('tr') === null) {
            const headerRow = document.createElement('tr');
            const th1 = document.createElement('th');
            th1.textContent = 'SL NO';
            const th2 = document.createElement('th');
            th2.textContent = 'LAP';
            headerRow.appendChild(th1);
            headerRow.appendChild(th2);
            tablist.appendChild(headerRow);
        }
        // Record lap time
        const lapTime = `${hoursEl.textContent}:${minutesEl.textContent}:${secondsEl.textContent}:${millisecondsEl.textContent}`;
        const tr = document.createElement('tr');
        const tdsl = document.createElement('td');
        const tdlap = document.createElement('td');
        tdsl.textContent = lapCounter;
        tdlap.textContent = lapTime;
        tr.appendChild(tdsl);
        tr.appendChild(tdlap);
        tablist.appendChild(tr);
        lapCounter++;
    }
});
