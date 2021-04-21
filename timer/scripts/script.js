window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);

            // console.log(timeRemaining);
            return {timeRemaining,hours,minutes,seconds}
        }

        function updateClock() {
            let timer = getTimeRemaining();
            let intervalId;

            function addPrefix(num) {
                let prefix = '0';
                if (num < 10) {
                    num = `${prefix}${num}`
                }
                return num;
            }

            timerHours.textContent = addPrefix(timer.hours);
            timerMinutes.textContent  = addPrefix(timer.minutes);
            timerSeconds.textContent = addPrefix(timer.seconds);

            if (timer.timeRemaining > 0) {
                intervalId = setInterval(updateClock, 1000);
            } else {
                timerHours.textContent = '00';
                timerMinutes.textContent  = '00';
                timerSeconds.textContent = '00';
                clearInterval(intervalId);
            }
        }
        updateClock()
    }
    countTimer('22 april 2021')
});