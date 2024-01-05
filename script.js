let timer;
let isRunning = false;
let startTime;
let lapTimes = [];

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - (lapTimes.length > 0 ? lapTimes.reduce((a, b) => a + b, 0) : 0);
        timer = setInterval(updateTime, 1000);
        document.querySelector('button:nth-child(1)').textContent = 'Pause';
    } else {
        isRunning = false;
        clearInterval(timer);
        document.querySelector('button:nth-child(1)').textContent = 'Resume';
    }
}

function pauseStopwatch() {
    startStopwatch(); // Reuse the same function for pausing and resuming
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(timer);
    document.querySelector('button:nth-child(1)').textContent = 'Start';
    document.getElementById("display").textContent = '00:00:00';
    lapTimes = [];
    updateLapList();
}

function lapTime() {
    if (isRunning) {
        const lap = Date.now() - startTime;
        lapTimes.push(lap);
        updateLapList();
    }
}

function updateTime() {
    const elapsedMilliseconds = Date.now() - startTime;
    const formattedTime = formatTime(elapsedMilliseconds);
    document.getElementById('display').textContent = formattedTime;
}

function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);

    return (
        (hours < 10 ? '0' : '') + hours +
        ':' +
        (minutes < 10 ? '0' : '') + minutes +
        ':' +
        (seconds < 10 ? '0' : '') + seconds
    );
}

function updateLapList() {
    const lapList = document.getElementById('lapList');
    lapList.innerHTML = '';
    lapTimes.forEach((lap, index) => {
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${index + 1}: ${formatTime(lap)}`;
        lapList.appendChild(lapItem);
    });
}
