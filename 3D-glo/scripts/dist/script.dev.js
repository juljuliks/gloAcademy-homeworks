"use strict";

window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var countTimer = function countTimer(deadline) {
    var timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
      var dateStop = new Date(deadline).getTime(),
          dateNow = new Date().getTime(),
          timeRemaining = (dateStop - dateNow) / 1000,
          seconds = Math.floor(timeRemaining % 60),
          minutes = Math.floor(timeRemaining / 60 % 60),
          hours = Math.floor(timeRemaining / 60 / 60); // console.log(timeRemaining);

      return {
        timeRemaining: timeRemaining,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      };
    }

    function updateClock() {
      var timer = getTimeRemaining();
      var intervalId;

      function addPrefix(num) {
        var prefix = '0';

        if (num < 10) {
          num = "".concat(prefix).concat(num);
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

    updateClock();
  };

  countTimer('21 april 2021');

  var toggleMenu = function toggleMenu() {
    var btnMenu = document.querySelector('.menu'),
        menu = document.querySelector('menu'),
        closeBtn = document.querySelector('.close-btn'),
        menuItems = menu.querySelectorAll('ul>li');
    window.addEventListener('click', function (event) {
      var target = event.target;

      if (target.closest('.menu') || target.closest('menu')) {
        menu.classList.toggle('active-menu');
      } else if (!target || !target.closest('menu')) {
        menu.classList.remove('active-menu');
      }
    });
  };

  toggleMenu();

  var togglePopUp = function togglePopUp() {
    var popUp = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupContent = document.querySelector('.popup-content');
    var count = 0;
    var animate;

    var animateModal = function animateModal() {
      animate = requestAnimationFrame(animateModal);
      count += 3;

      if (count <= 45) {
        popupContent.style.left = count + '%';
        return;
      } else {
        cancelAnimationFrame(animate);
      }
    };

    popupBtn.forEach(function (el) {
      el.addEventListener('click', function () {
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
    popUp.addEventListener('click', function (event) {
      var target = event.target;

      if (target.classList.contains('popup-close')) {
        popUp.style.display = 'none';
      } else {
        target = target.closest('.popup-content');

        if (!target) {
          popUp.style.display = 'none';
        }
      }
    });
  };

  togglePopUp();

  var scroll = function scroll() {
    var menu = document.querySelector('menu'),
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
    }

    ;
    img.addEventListener('click', function (e) {
      e.preventDefault();
      scrollTo(serviceBlock);
    });
    menuItems.forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var blockId = el.getAttribute('href');

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

  var tabs = function tabs() {
    var tabHeader = document.querySelector('.service-header'),
        tab = tabHeader.querySelectorAll('.service-header-tab'),
        tabContent = document.querySelectorAll('.service-tab');

    var toggleTabContent = function toggleTabContent(index) {
      for (var i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', function (event) {
      var target = event.target;
      target = target.closest('.service-header-tab');

      while (target !== tabHeader) {
        if (target) {
          tab.forEach(function (item, i) {
            if (item === target) {
              toggleTabContent(i);
            }
          });
        }

        return;
      }
    });
  };

  tabs();

  var slider = function slider() {
    var slider = document.querySelector('.portfolio-content'),
        slide = document.querySelectorAll('.portfolio-item'),
        portfolioDots = document.querySelector('.portfolio-dots');
    var currentSlide = 0,
        interval,
        dot;

    var createDots = function createDots() {
      for (var i = 0; i < slide.length; i++) {
        var li = document.createElement('li');
        li.className = 'dot';
        portfolioDots.append(li);
      }

      dot = document.querySelectorAll('.dot');
    };

    createDots();

    var prevSlide = function prevSlide(elem, index, strClass) {
      elem[index].classList.remove(strClass);
    };

    var nextSlide = function nextSlide(elem, index, strClass) {
      elem[index].classList.add(strClass);
    };

    var autoPlaySlide = function autoPlaySlide() {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    var startSlide = function startSlide() {
      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1500;
      interval = setInterval(autoPlaySlide, time);
    };

    var stopSlide = function stopSlide() {
      clearInterval(interval);
    };

    slider.addEventListener('click', function (event) {
      event.preventDefault();
      var target = event.target;

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
        dot.forEach(function (el, i) {
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
    slider.addEventListener('mouseover', function (event) {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        stopSlide();
      }
    });
    slider.addEventListener('mouseout', function (event) {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        startSlide();
      }
    });
    startSlide(1500);
  };

  slider();

  var imgChange = function imgChange() {
    var teamBlock = document.querySelector('.command'),
        images = teamBlock.querySelectorAll('.command__photo');
    images.forEach(function (img) {
      var defaultImage;
      img.addEventListener('mouseenter', function (e) {
        defaultImage = e.target.src;
        e.target.src = e.target.dataset.img;
      });
      img.addEventListener('mouseleave', function (e) {
        e.target.src = defaultImage;
      });
    });
  };

  imgChange();

  var validateInputs = function validateInputs() {
    var calcInputs = document.querySelectorAll('input.calc-item'),
        formName = document.querySelectorAll('[name=user_name]'),
        formMessage = document.querySelectorAll('[name=user_message]'),
        formEmail = document.querySelectorAll('[name=user_email]');

    var validateNumberInputs = function validateNumberInputs() {
      calcInputs.forEach(function (el) {
        el.value = el.value.replace(/[^\d]/g, '');
      });
    };

    var validateLetterInputs = function validateLetterInputs(input) {
      input.value = input.value.replace(/[^а-яё0-9\p{P} ]/gi, '');
    };

    var inputsHandler = function inputsHandler(e) {
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
        e.target.value = e.target.value.replace(/[^\d\(\)\-\+]/g, '');
      }
    };

    var checkInputs = function checkInputs(input, exp) {
      while (!!input.value.match(exp)) {
        input.value = input.value.replace(exp, '');
      }
    };

    var trim = function trim(input) {
      input.value = input.value.replace(/\s+/g, ' ');
      input.value = input.value.replace(/\-+/g, '-');
      var inputToExp = new RegExp("ReGeX" + input.value + "ReGeX");

      if (/^[/ /-]/.test(inputToExp)) {
        input.value = input.value.replace(/^[/ /-]/, '');
      }

      if (/[/ /-]$/.test(inputToExp)) {
        input.value = input.value.replace(/[/ /-]$/, '');
      }
    };

    function capitalize(input) {
      var inputValue = input.value;
      return inputValue.split(' ').map(function (item) {
        return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
      }).join(' ');
    }

    formName.forEach(function (el) {
      el.addEventListener('blur', function () {
        checkInputs(el, /[^а-яё\-\ ]/gi);
        trim(el);
        el.value = capitalize(el);
      });
    });
    formMessage.forEach(function (el) {
      el.addEventListener('blur', function () {
        checkInputs(el, /[а-яё,/d,\,\.\ ]/gi);
        trim(el);
      });
    });
    formEmail.forEach(function (el) {
      el.addEventListener('blur', function () {
        checkInputs(el, /[^a-z\@\_\-\.\!\~\*\']/gi);
        trim(el);
      });
    });
    window.addEventListener('input', inputsHandler);
  };

  validateInputs();

  var calc = function calc() {
    var price = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
    var calcInputs = document.querySelectorAll('input.calc-item'),
        calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total');
    var total = 0;
    var timeout;

    var countSum = function countSum() {
      var countValue = 1,
          dayValue = 1;
      var typeValue = calcType.value,
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
    };

    var animateTotal = function animateTotal() {
      var target = total;
      var count = +totalValue.textContent;
      var speed = 200;
      var inc = target / speed;

      if (count < target) {
        totalValue.textContent = Math.floor(count + inc);
        timeout = setTimeout(animateTotal, 5);
      } else {
        totalValue.textContent = target;
        clearTimeout(timeout);
      }
    };

    calcBlock.addEventListener('change', function (event) {
      var target = event.target;

      if (target.matches('select') || target.matches('input')) {
        countSum();
        animateTotal();
      }
    });
    calcType.addEventListener('change', function () {
      total = 0;
    });
  };

  calc(100);

  var sendForm = function sendForm() {
    var errorMessage = 'Что-то пошло не так',
        loadMessage = 'Загрузка...',
        succesMessage = 'Спасибо, мы скоро с вами свяжемся!';
    var form1 = document.getElementById('form1'),
        form2 = document.getElementById('form2'),
        form3 = document.getElementById('form3');
    var statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem;';

    var createRequest = function createRequest(form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        form.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;
        var formData = new FormData(form);
        var body = {};
        formData.forEach(function (val, key) {
          body[key] = val;
        });
        postData(body, function () {
          statusMessage.textContent = succesMessage;
          var formInputs = form.querySelectorAll('input');
          formInputs.forEach(function (input) {
            input.value = input.defaultValue;
          });
        }, function () {
          statusMessage.textContent = errorMessage;
          console.error(error);
        });
      });
    };

    var postData = function postData(body, outputData, errorData) {
      var request = new XMLHttpRequest();
      request.addEventListener('readystatechange', function () {
        // тут анимация
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          outputData();
        } else {
          errorData(request.status);
        }
      });
      request.open('POST', './server.php');
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(body));
    };

    createRequest(form1);
    createRequest(form2);
    createRequest(form3);
  };

  sendForm();
});