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
    countTimer('21 april 2021');

    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        window.addEventListener('click', (event) => {
            let target = event.target;
            if (target.closest('.menu') || target.closest('menu')) {
                menu.classList.toggle('active-menu');
            } else if (!target || !target.closest('menu')) {
                menu.classList.remove('active-menu');
            }
        })

    };
    toggleMenu();

    const togglePopUp = () => {
        const popUp = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = document.querySelector('.popup-content');

        let count = 0;
        let animate;

        const animateModal = () => {
            animate = requestAnimationFrame(animateModal)
            count += 3;
            if (count <= 45) {
                popupContent.style.left = count + '%';
                return;
            } else {
                cancelAnimationFrame(animate);
            }
        }

        popupBtn.forEach(el => {
            el.addEventListener('click', () => {
                popUp.style.display = 'block';
                if (screen.width > 768) {
                    animate = requestAnimationFrame(animateModal);
                    count = 0;
                } else {
                    popupContent.style.left = '28%';
                    cancelAnimationFrame(animate);
                }
            });
        });

        popUp.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popUp.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popUp.style.display = 'none';
                }
            }
        })
    };
    togglePopUp();

    const scroll = () => {
        const menu = document.querySelector('menu'),
            menuItems = menu.querySelectorAll('ul>li>a'),
            serviceBlock = document.querySelector('#service-block'),
            portfolio = document.querySelector('#portfolio'),
            calc = document.querySelector('#calc'),
            team = document.querySelector('#command'),
            connect = document.querySelector('#connect'),
            img = document.querySelector('#scrollImg');

        function scrollTo(target) {
            window.scroll({
                left: 0,
                top: target.getBoundingClientRect().top,
                behavior: 'smooth'
            });
        };

        img.addEventListener('click', (e) => {
            e.preventDefault()
            scrollTo(serviceBlock);
        });

        menuItems.forEach((el) => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                const blockId = el.getAttribute('href');
                if (blockId === '#service-block') {
                    scrollTo(serviceBlock);
                } else if (blockId === '#portfolio') {
                    scrollTo(portfolio);
                } else if (blockId === '#calc') {
                    scrollTo(calc);
                } else if (blockId === '#command') {
                    scrollTo(team);
                } else if (blockId === '#connect') {
                    scrollTo(connect);
                }
            });
        });
    };
    scroll();

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            while (target !== tabHeader) {

                if (target) {
                    tab.forEach((item, i) => {
                        if (item === target) {
                            toggleTabContent(i);
                        }
                    });
                }
                return;
            }
        })
    };
    tabs()

    const slider = () => {
        const slider = document.querySelector('.portfolio-content'),
            slide = document.querySelectorAll('.portfolio-item'),
            portfolioDots = document.querySelector('.portfolio-dots');

        let currentSlide = 0,
            interval, dot;

        const createDots = () => {
            for (let i = 0; i < slide.length; i++) {
                let li = document.createElement('li');
                li.className = 'dot';
                portfolioDots.append(li);
            }
            dot = document.querySelectorAll('.dot');
        };
        createDots();

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 1500) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();
            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((el, i) => {
                    if (el === target) {
                        currentSlide = i;
                    }
                });
            }
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            } else if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500);
    };
    slider()

    const imgChange = () => {
        const teamBlock = document.querySelector('.command'),
            images = teamBlock.querySelectorAll('.command__photo');

        images.forEach(img => {
            let defaultImage;
            img.addEventListener('mouseenter', (e) => {
                defaultImage = e.target.src;
                e.target.src = e.target.dataset.img;
            });
            img.addEventListener('mouseleave', (e) => {
                e.target.src = defaultImage;
            });
        })


    };
    imgChange()

    const validateInputs = () => {
        const calcInputs = document.querySelectorAll('input.calc-item'),
            formName = document.querySelectorAll('[name=user_name]'),
            formMessage = document.querySelectorAll('[name=user_message]'),
            formEmail = document.querySelectorAll('[name=user_email]');

        const validateNumberInputs = () => {
            calcInputs.forEach(el => {
                el.value = el.value.replace(/[^\d]/g, '');
            })
        };

        const validateLetterInputs = (input) => {
            input.value = input.value.replace(/[^а-яё\-\ ]/gi, '');
        };

        const inputsHandler = (e) => {
            if (e.target.matches('.calc-item')) {
                validateNumberInputs();
            }
            if (e.target.matches('[name=user_name]')) {
                validateLetterInputs(e.target);
            }
            if (e.target.matches('#form2-message')) {
                validateLetterInputs(e.target);
            }
            if (e.target.matches('[name=user_email]')) {
                e.target.value = e.target.value.replace(/[^a-z\@\_\-\.\!\~\*\']/gi, '');
            }
            if (e.target.matches('[type=tel]')) {
                e.target.value = e.target.value.replace(/[^\d\(\)\-]/g, '');
            }
        }

        const checkInputs = (input, exp) => {
            while (!!input.value.match(exp)) {
                input.value = input.value.replace(exp, '');
            }
        }

        const trim = (input) => {
            input.value = input.value.replace(/\s+/g, ' ');
            input.value = input.value.replace(/\-+/g, '-');

            let inputToExp = new RegExp("ReGeX" + input.value + "ReGeX");
            if (/^[/ /-]/.test(inputToExp)) {
                input.value = input.value.replace(/^[/ /-]/, '')
            }
            if (/[/ /-]$/.test(inputToExp)) {
                input.value = input.value.replace(/[/ /-]$/, '')
            }
        }

        function capitalize(input) {
            let inputValue = input.value
            return inputValue.split(' ').map(item =>
                item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()).join(' ');
        }

        formName.forEach(el => {
            el.addEventListener('blur', () => {
                checkInputs(el, /[^а-яё\-\ ]/gi);
                trim(el);
                el.value = capitalize(el)
            })
        })

        formMessage.forEach(el => {
            el.addEventListener('blur', () => {
                checkInputs(el, /[^а-яё\-\ ]/gi);
                trim(el);
            })
        })

        formEmail.forEach(el => {
            el.addEventListener('blur', () => {
                checkInputs(el, /[^a-z\@\_\-\.\!\~\*\']/gi);
                trim(el);
            })
        })

        window.addEventListener('input', inputsHandler);
    }
    validateInputs();

    const calc = (price = 100) => {
        const calcInputs = document.querySelectorAll('input.calc-item'),
            calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        let total = 0;
        let timeout;

        const countSum = () => {
            let countValue = 1,
                dayValue = 1;

            const typeValue = calcType.value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }
            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }
            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }
            total = Math.floor(total);
        }

        const animateTotal = () => {
            const target = total;
            const count = +totalValue.textContent;
            const speed = 200;

            const inc = target / speed;

            if (count < target) {
                totalValue.textContent = Math.floor(count + inc);
                timeout = setTimeout(animateTotal, 5);
            } else {
                totalValue.textContent = target;
                clearTimeout(timeout);
            }
        }

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;
            if (target.matches('select') || target.matches('input')) {
                countSum();
                animateTotal();
            }
        });

        calcType.addEventListener('change', () => {
            total = 0;
        });
    }
    calc(100);
});