/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_countTimer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/countTimer */ \"./src/modules/countTimer.js\");\n/* harmony import */ var _modules_toggleMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/toggleMenu */ \"./src/modules/toggleMenu.js\");\n/* harmony import */ var _modules_togglePopUp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/togglePopUp */ \"./src/modules/togglePopUp.js\");\n/* harmony import */ var _modules_scroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/scroll */ \"./src/modules/scroll.js\");\n/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/tabs */ \"./src/modules/tabs.js\");\n/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ \"./src/modules/slider.js\");\n/* harmony import */ var _modules_imgChange__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/imgChange */ \"./src/modules/imgChange.js\");\n/* harmony import */ var _modules_validateInputs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/validateInputs */ \"./src/modules/validateInputs.js\");\n/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/calc */ \"./src/modules/calc.js\");\n/* harmony import */ var _modules_sendForm__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/sendForm */ \"./src/modules/sendForm.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n(0,_modules_countTimer__WEBPACK_IMPORTED_MODULE_0__.default)('09 may 2021');\n(0,_modules_toggleMenu__WEBPACK_IMPORTED_MODULE_1__.default)();\n(0,_modules_togglePopUp__WEBPACK_IMPORTED_MODULE_2__.default)();\n(0,_modules_scroll__WEBPACK_IMPORTED_MODULE_3__.default)();\n(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_4__.default)();\n(0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__.default)();\n(0,_modules_imgChange__WEBPACK_IMPORTED_MODULE_6__.default)();\n(0,_modules_validateInputs__WEBPACK_IMPORTED_MODULE_7__.default)();\n(0,_modules_calc__WEBPACK_IMPORTED_MODULE_8__.default)(100);\n(0,_modules_sendForm__WEBPACK_IMPORTED_MODULE_9__.default)();\n\n//# sourceURL=webpack://3d-glo/./src/index.js?");

/***/ }),

/***/ "./src/modules/calc.js":
/*!*****************************!*\
  !*** ./src/modules/calc.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar calc = function calc() {\n  var price = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;\n  var calcInputs = document.querySelectorAll('input.calc-item'),\n      calcBlock = document.querySelector('.calc-block'),\n      calcType = document.querySelector('.calc-type'),\n      calcSquare = document.querySelector('.calc-square'),\n      calcDay = document.querySelector('.calc-day'),\n      calcCount = document.querySelector('.calc-count'),\n      totalValue = document.getElementById('total');\n\n  var countSum = function countSum() {\n    var total = 0;\n    var countValue = 1,\n        dayValue = 1;\n    var typeValue = calcType.value,\n        squareValue = +calcSquare.value;\n\n    if (calcCount.value > 1) {\n      countValue += (calcCount.value - 1) / 10;\n    }\n\n    if (calcDay.value && calcDay.value < 5) {\n      dayValue *= 2;\n    } else if (calcDay.value && calcDay.value < 10) {\n      dayValue *= 1.5;\n    }\n\n    if (typeValue && squareValue) {\n      total = Math.floor(price * typeValue * squareValue * countValue * dayValue);\n    }\n\n    return total;\n  };\n\n  var animateTotal = function animateTotal() {\n    var target = countSum();\n    var timeoutId;\n    var currentValue = +totalValue.textContent;\n    var speed = 200;\n    var inc = target / speed;\n\n    if (currentValue < target) {\n      totalValue.textContent = Math.floor(currentValue + inc);\n      timeoutId = setTimeout(animateTotal, 5);\n    } else {\n      totalValue.textContent = target;\n      clearTimeout(timeoutId);\n    }\n  };\n\n  calcBlock.addEventListener('change', function (event) {\n    var target = event.target;\n\n    if (target.matches('select') || target.matches('input')) {\n      animateTotal();\n    }\n\n    if (target.matches('select.calc-type')) {\n      if (calcType.value === '') {\n        calcInputs.forEach(function (el) {\n          el.value = '';\n        });\n      }\n    }\n  }); // calcType.addEventListener('change', () => {\n  //     total = 0;\n  // });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);\n\n//# sourceURL=webpack://3d-glo/./src/modules/calc.js?");

/***/ }),

/***/ "./src/modules/countTimer.js":
/*!***********************************!*\
  !*** ./src/modules/countTimer.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction countTimer(deadline) {\n  var timerHours = document.querySelector('#timer-hours'),\n      timerMinutes = document.querySelector('#timer-minutes'),\n      timerSeconds = document.querySelector('#timer-seconds');\n  var clear = 0;\n\n  function checkZero(number) {\n    var stringNumber = String(number);\n\n    if (stringNumber.length === 1) {\n      return '0' + stringNumber;\n    }\n\n    return number;\n  }\n\n  function getTimeRemaining() {\n    var dateStop = new Date(deadline).getTime(),\n        dateNow = new Date().getTime(),\n        timeRemaining = (dateStop - dateNow) / 1000,\n        //Для проверок -39250,\n    seconds = Math.floor(timeRemaining % 60),\n        minutes = Math.floor(timeRemaining / 60 % 60),\n        hours = Math.floor(timeRemaining / 60 / 60) % 24; //day = Math.floor(timeRemaining / 60 / 60 / 24);\n\n    return {\n      timeRemaining: timeRemaining,\n      hours: hours,\n      minutes: minutes,\n      seconds: seconds\n    };\n  }\n\n  var idInterval = setInterval(updateClock);\n\n  function updateClock() {\n    var timer = getTimeRemaining();\n    timerHours.textContent = checkZero(timer.hours);\n    timerMinutes.textContent = checkZero(timer.minutes);\n    timerSeconds.textContent = checkZero(timer.seconds);\n\n    if (Math.floor(timer.timeRemaining) <= 0) {\n      clearInterval(idInterval);\n      timerHours.textContent = '00';\n      timerMinutes.textContent = '00';\n      timerSeconds.textContent = '00';\n      var timerDiv = document.getElementById('timer');\n      var timerSpans = timerDiv.getElementsByTagName('span');\n      timerSpans = Array.from(timerSpans);\n      timerSpans.forEach(function (item) {\n        item.style.color = 'red';\n      });\n    }\n  }\n\n  updateClock();\n  clear = setInterval(updateClock, 1000);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (countTimer);\n\n//# sourceURL=webpack://3d-glo/./src/modules/countTimer.js?");

/***/ }),

/***/ "./src/modules/imgChange.js":
/*!**********************************!*\
  !*** ./src/modules/imgChange.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar imgChange = function imgChange() {\n  var teamBlock = document.querySelector('.command'),\n      images = teamBlock.querySelectorAll('.command__photo');\n  images.forEach(function (img) {\n    var defaultImage;\n    img.addEventListener('mouseenter', function (e) {\n      defaultImage = e.target.src;\n      e.target.src = e.target.dataset.img;\n    });\n    img.addEventListener('mouseleave', function (e) {\n      e.target.src = defaultImage;\n    });\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (imgChange);\n\n//# sourceURL=webpack://3d-glo/./src/modules/imgChange.js?");

/***/ }),

/***/ "./src/modules/scroll.js":
/*!*******************************!*\
  !*** ./src/modules/scroll.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar scroll = function scroll() {\n  var menu = document.querySelector('menu'),\n      menuItems = menu.querySelectorAll('ul>li>a'),\n      serviceBlock = document.querySelector('#service-block'),\n      portfolio = document.querySelector('#portfolio'),\n      calc = document.querySelector('#calc'),\n      team = document.querySelector('#command'),\n      connect = document.querySelector('#connect'),\n      img = document.querySelector('#scrollImg');\n\n  function scrollTo(target) {\n    window.scroll({\n      left: 0,\n      top: target.getBoundingClientRect().top,\n      behavior: 'smooth'\n    });\n  }\n\n  ;\n  img.addEventListener('click', function (e) {\n    e.preventDefault();\n    scrollTo(serviceBlock);\n  });\n  menuItems.forEach(function (el) {\n    el.addEventListener('click', function (e) {\n      e.preventDefault();\n      var blockId = el.getAttribute('href');\n\n      if (blockId === '#service-block') {\n        scrollTo(serviceBlock);\n      } else if (blockId === '#portfolio') {\n        scrollTo(portfolio);\n      } else if (blockId === '#calc') {\n        scrollTo(calc);\n      } else if (blockId === '#command') {\n        scrollTo(team);\n      } else if (blockId === '#connect') {\n        scrollTo(connect);\n      }\n    });\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (scroll);\n\n//# sourceURL=webpack://3d-glo/./src/modules/scroll.js?");

/***/ }),

/***/ "./src/modules/sendForm.js":
/*!*********************************!*\
  !*** ./src/modules/sendForm.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar sendForm = function sendForm() {\n  var errorMessage = 'Что-то пошло не так',\n      succesMessage = 'Спасибо, мы скоро с вами свяжемся!';\n  var form1 = document.getElementById('form1'),\n      form2 = document.getElementById('form2'),\n      form3 = document.getElementById('form3');\n  var statusMessage = document.createElement('div');\n  var circle = document.createElement('div');\n  circle.classList.add('circle');\n  statusMessage.style.cssText = 'font-size: 2rem; color: #fff';\n\n  var createRequest = function createRequest(form) {\n    form.addEventListener('submit', function (e) {\n      e.preventDefault();\n      form.appendChild(statusMessage);\n      form.appendChild(circle);\n      var formData = new FormData(form);\n      var body = {};\n      formData.forEach(function (val, key) {\n        body[key] = val;\n      });\n      fetch('./server.php', {\n        method: 'POST',\n        headers: {\n          'Content-Type': 'application/json'\n        },\n        body: JSON.stringify(body)\n      }).then(function (response) {\n        if (response.status !== 200) {\n          throw new Error('status network not 200');\n        }\n\n        document.querySelector('.circle').remove();\n        statusMessage.textContent = succesMessage;\n        setTimeout(function () {\n          statusMessage.innerHTML = '';\n          document.querySelector('.popup').style.display = 'none';\n        }, 2000);\n        var formInputs = form.querySelectorAll('input');\n        formInputs.forEach(function (input) {\n          input.value = input.defaultValue;\n        });\n      })[\"catch\"](function (error) {\n        console.error(error);\n        document.querySelector('.circle').remove();\n        statusMessage.textContent = errorMessage;\n        setTimeout(function () {\n          statusMessage.innerHTML = '';\n          document.querySelector('.popup').style.display = 'none';\n        }, 2000);\n      });\n    });\n  };\n\n  createRequest(form1);\n  createRequest(form2);\n  createRequest(form3);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendForm);\n\n//# sourceURL=webpack://3d-glo/./src/modules/sendForm.js?");

/***/ }),

/***/ "./src/modules/slider.js":
/*!*******************************!*\
  !*** ./src/modules/slider.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar slider = function slider() {\n  var slider = document.querySelector('.portfolio-content'),\n      slide = document.querySelectorAll('.portfolio-item'),\n      portfolioDots = document.querySelector('.portfolio-dots');\n  var currentSlide = 0,\n      interval,\n      dot;\n\n  var createDots = function createDots() {\n    for (var i = 0; i < slide.length; i++) {\n      var li = document.createElement('li');\n      li.className = 'dot';\n      portfolioDots.append(li);\n    }\n\n    dot = document.querySelectorAll('.dot');\n  };\n\n  createDots();\n\n  var prevSlide = function prevSlide(elem, index, strClass) {\n    elem[index].classList.remove(strClass);\n  };\n\n  var nextSlide = function nextSlide(elem, index, strClass) {\n    elem[index].classList.add(strClass);\n  };\n\n  var autoPlaySlide = function autoPlaySlide() {\n    prevSlide(slide, currentSlide, 'portfolio-item-active');\n    prevSlide(dot, currentSlide, 'dot-active');\n    currentSlide++;\n\n    if (currentSlide >= slide.length) {\n      currentSlide = 0;\n    }\n\n    nextSlide(slide, currentSlide, 'portfolio-item-active');\n    nextSlide(dot, currentSlide, 'dot-active');\n  };\n\n  var startSlide = function startSlide() {\n    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1500;\n    interval = setInterval(autoPlaySlide, time);\n  };\n\n  var stopSlide = function stopSlide() {\n    clearInterval(interval);\n  };\n\n  slider.addEventListener('click', function (event) {\n    event.preventDefault();\n    var target = event.target;\n\n    if (!target.matches('.portfolio-btn, .dot')) {\n      return;\n    }\n\n    prevSlide(slide, currentSlide, 'portfolio-item-active');\n    prevSlide(dot, currentSlide, 'dot-active');\n\n    if (target.matches('#arrow-right')) {\n      currentSlide++;\n    } else if (target.matches('#arrow-left')) {\n      currentSlide--;\n    } else if (target.matches('.dot')) {\n      dot.forEach(function (el, i) {\n        if (el === target) {\n          currentSlide = i;\n        }\n      });\n    }\n\n    if (currentSlide >= slide.length) {\n      currentSlide = 0;\n    } else if (currentSlide < 0) {\n      currentSlide = slide.length - 1;\n    }\n\n    nextSlide(slide, currentSlide, 'portfolio-item-active');\n    nextSlide(dot, currentSlide, 'dot-active');\n  });\n  slider.addEventListener('mouseover', function (event) {\n    if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {\n      stopSlide();\n    }\n  });\n  slider.addEventListener('mouseout', function (event) {\n    if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {\n      startSlide();\n    }\n  });\n  startSlide(1500);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);\n\n//# sourceURL=webpack://3d-glo/./src/modules/slider.js?");

/***/ }),

/***/ "./src/modules/tabs.js":
/*!*****************************!*\
  !*** ./src/modules/tabs.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar tabs = function tabs() {\n  var tabHeader = document.querySelector('.service-header'),\n      tab = tabHeader.querySelectorAll('.service-header-tab'),\n      tabContent = document.querySelectorAll('.service-tab');\n\n  var toggleTabContent = function toggleTabContent(index) {\n    for (var i = 0; i < tabContent.length; i++) {\n      if (index === i) {\n        tab[i].classList.add('active');\n        tabContent[i].classList.remove('d-none');\n      } else {\n        tab[i].classList.remove('active');\n        tabContent[i].classList.add('d-none');\n      }\n    }\n  };\n\n  tabHeader.addEventListener('click', function (event) {\n    var target = event.target;\n    target = target.closest('.service-header-tab');\n\n    while (target !== tabHeader) {\n      if (target) {\n        tab.forEach(function (item, i) {\n          if (item === target) {\n            toggleTabContent(i);\n          }\n        });\n      }\n\n      return;\n    }\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);\n\n//# sourceURL=webpack://3d-glo/./src/modules/tabs.js?");

/***/ }),

/***/ "./src/modules/toggleMenu.js":
/*!***********************************!*\
  !*** ./src/modules/toggleMenu.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar toggleMenu = function toggleMenu() {\n  var menu = document.querySelector('menu');\n  window.addEventListener('click', function (event) {\n    var target = event.target;\n\n    if (target.closest('.menu') || target.matches('a')) {\n      menu.classList.toggle('active-menu');\n    } else if (!target.closest('menu') || target.matches('.close-btn')) {\n      menu.classList.remove('active-menu');\n    }\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toggleMenu);\n\n//# sourceURL=webpack://3d-glo/./src/modules/toggleMenu.js?");

/***/ }),

/***/ "./src/modules/togglePopUp.js":
/*!************************************!*\
  !*** ./src/modules/togglePopUp.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar togglePopUp = function togglePopUp() {\n  var popUp = document.querySelector('.popup'),\n      popupBtn = document.querySelectorAll('.popup-btn'),\n      popupContent = document.querySelector('.popup-content');\n  var count = 0;\n  var animate;\n\n  var animateModal = function animateModal() {\n    animate = requestAnimationFrame(animateModal);\n    count += 3;\n\n    if (count <= 43) {\n      popupContent.style.left = count + '%';\n      return;\n    } else {\n      cancelAnimationFrame(animate);\n    }\n  };\n\n  popupBtn.forEach(function (el) {\n    el.addEventListener('click', function () {\n      popUp.style.display = 'block';\n\n      if (screen.width > 768) {\n        animate = requestAnimationFrame(animateModal);\n        count = 0;\n      } else {\n        popupContent.style.left = '28%';\n        cancelAnimationFrame(animate);\n      }\n    });\n  });\n  popUp.addEventListener('click', function (event) {\n    var target = event.target;\n\n    if (target.classList.contains('popup-close')) {\n      popUp.style.display = 'none';\n    } else {\n      target = target.closest('.popup-content');\n\n      if (!target) {\n        popUp.style.display = 'none';\n      }\n    }\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (togglePopUp);\n\n//# sourceURL=webpack://3d-glo/./src/modules/togglePopUp.js?");

/***/ }),

/***/ "./src/modules/validateInputs.js":
/*!***************************************!*\
  !*** ./src/modules/validateInputs.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar validateInputs = function validateInputs() {\n  var calcInputs = document.querySelectorAll('input.calc-item'),\n      formName = document.querySelectorAll('[name=user_name]'),\n      formMessage = document.querySelectorAll('[name=user_message]'),\n      formEmail = document.querySelectorAll('[name=user_email]'),\n      formPhone = document.querySelectorAll('[name=user_phone]');\n\n  var validateNumberInputs = function validateNumberInputs() {\n    calcInputs.forEach(function (el) {\n      el.value = el.value.replace(/[^\\d]/g, '');\n    });\n  };\n\n  var inputsHandler = function inputsHandler(e) {\n    if (e.target.matches('.calc-item')) {\n      validateNumberInputs();\n    }\n\n    if (e.target.matches('[name=user_name]')) {\n      e.target.value = e.target.value.replace(/[^а-яё\\-\\ ]/gi, '');\n    }\n\n    if (e.target.matches('#form2-message')) {\n      e.target.value = e.target.value.replace(/[^а-яё0-9\\.\\,\\:\\-\\!\\?]/gi, '');\n    }\n\n    if (e.target.matches('[name=user_email]')) {\n      e.target.value = e.target.value.replace(/[^a-z\\@\\_\\-\\.\\!\\~\\*\\']/gi, '');\n    }\n\n    if (e.target.matches('[name=user_phone]')) {\n      e.target.value = e.target.value.replace(/[^\\d\\(\\)\\-\\+]/g, '');\n\n      if (e.target.value.length > 10) {\n        e.target.value = e.target.value.substring(0, 11);\n      }\n    }\n  };\n\n  var trim = function trim(input) {\n    input.value = input.value.replace(/\\s+/g, ' ');\n    input.value = input.value.replace(/\\-+/g, '-');\n    var inputToExp = new RegExp(\"ReGeX\" + input.value + \"ReGeX\");\n\n    if (/^[/ /-]/.test(inputToExp)) {\n      input.value = input.value.replace(/^[/ /-]/, '');\n    }\n\n    if (/[/ /-]$/.test(inputToExp)) {\n      input.value = input.value.replace(/[/ /-]$/, '');\n    }\n  };\n\n  var capitalize = function capitalize(input) {\n    var inputValue = input.value;\n    return inputValue.split(' ').map(function (item) {\n      return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();\n    }).join(' ');\n  };\n\n  var controlInputs = function controlInputs(input, exp) {\n    if (!input.value.match(exp)) {\n      input.value = '';\n    }\n  };\n\n  formName.forEach(function (el) {\n    el.addEventListener('blur', function () {\n      trim(el);\n      el.value = capitalize(el);\n      controlInputs(el, /[а-яё]{2,}/gi);\n    });\n  });\n  formMessage.forEach(function (el) {\n    el.addEventListener('blur', function () {\n      controlInputs(el, /[^а-яё0-9\\.\\,\\:\\-\\!\\? ]/gi);\n      trim(el);\n    });\n  });\n  formEmail.forEach(function (el) {\n    el.addEventListener('blur', function () {\n      trim(el);\n      controlInputs(el, /\\w+@\\w+\\.\\w{2,3}/g);\n    });\n  });\n  formPhone.forEach(function (el) {\n    el.addEventListener('blur', function () {\n      trim(el);\n      controlInputs(el, /\\+?([-()]*\\d){7,}/g);\n    });\n  });\n  window.addEventListener('input', inputsHandler);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validateInputs);\n\n//# sourceURL=webpack://3d-glo/./src/modules/validateInputs.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;