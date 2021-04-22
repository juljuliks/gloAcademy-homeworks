window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const countTimer = (deadline) => {
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
            return {
                timeRemaining,
                hours,
                minutes,
                seconds
            }
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
            timerMinutes.textContent = addPrefix(timer.minutes);
            timerSeconds.textContent = addPrefix(timer.seconds);

            if (timer.timeRemaining > 0) {
                intervalId = setInterval(updateClock, 1000);
            } else {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
                clearInterval(intervalId);
            }
        }
        updateClock()
    };
    countTimer('23 april 2021');

    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        }

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach(el => {
            el.addEventListener('click', handlerMenu);
        });
    };
    toggleMenu();

    const togglePopUp = () => {
        const popUp = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupContent = document.querySelector('.popup-content');


        popupBtn.forEach(el => {
            el.addEventListener('click', () => {
                if (screen.width > 768) {
                    popUp.style.display = 'block';
                    let start = Date.now();
                    let timer = setInterval(function() {
                        let timePassed = Date.now() - start;
                        popupContent.style.left = timePassed / 5 + '%';
                        if (timePassed >= 180) {
                            console.log(timePassed);
                            clearInterval(timer);
                        } 
                    }, 20)
                } else {
                    popUp.style.display = 'block';
                    popupContent.style.left = '32%';
                }
            });
        });

        popupClose.addEventListener('click', () => {
            popUp.style.display = 'none';
        });
    };
    togglePopUp();

    const scroll = () => {
        const menu = document.querySelector('menu'),
        menuItems = menu.querySelectorAll('ul>li>a'),
        serviceBlock = document.querySelector('#service-block'),
        portfolio = document.querySelector('#portfolio'),
        calc = document.querySelector('#calc'),
        team = document.querySelector('#command'),
        connect = document.querySelector('#connect');

        function scrollTo(target) {
            window.scroll({
                left: 0,
                top: target.getBoundingClientRect().top,
                behavior: 'smooth'
            })
        }

        menuItems.forEach((el) => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                const blockId = el.getAttribute('href');
                if (blockId === '#service-block') {
                    scrollTo(serviceBlock)
                } else if (blockId === '#portfolio') {
                    scrollTo(portfolio);
                } else if (blockId === '#calc') {
                    scrollTo(calc)
                } else if (blockId === '#command') {
                    scrollTo(team)
                } else if (blockId === '#connect') {
                    scrollTo(connect)
                }
            })
        })
    }
    scroll();
});