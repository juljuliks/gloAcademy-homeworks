"use strict";

var allData = [];
var allCities = [];
var selectCitiesInput = document.getElementById('select-cities'),
    dropdownList = document.querySelector('.dropdown-lists'),
    defaultList = document.querySelector('.dropdown-lists__list--default'),
    selectList = document.querySelector('.dropdown-lists__list--select'),
    autocompleteList = document.querySelector('.dropdown-lists__list--autocomplete'),
    label = document.querySelector('.label'),
    closeBtn = document.querySelector('.close-button'),
    linkButton = document.querySelector('.button');
var request = new XMLHttpRequest();
var selectedLocal;

if (getCookie('lang')) {
  sendRequest(getCookie('lang'));
} else {
  if (selectedLocal === '') {
    selectedLocal = prompt('Введите локаль');
  } else {
    do {
      selectedLocal = prompt('Введите локаль');
    } while (selectedLocal !== 'RU' && selectedLocal !== 'EN' && selectedLocal !== 'DE');
  }

  sendRequest(selectedLocal);
  saveCookie();
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function sendRequest(lang) {
  request.open('GET', "http://localhost:3000/".concat(lang));
  request.send();
}

linkButton.setAttribute('disabled', true);
request.addEventListener('readystatechange', function () {
  if (request.readyState === 4 && request.status === 200) {
    allData = JSON.parse(request.responseText);
    var storageData = [];

    for (var key in allData) {
      storageData.push(allData[key]);
    }

    localStorage.setItem('allData', JSON.stringify(storageData));

    if (localStorage.getItem('allData') !== null) {
      allData = JSON.parse(localStorage.getItem('allData'));
    }

    allData = checkLocale(getCookie('lang'), allData);
    start();
  }
});

function saveCookie() {
  document.cookie = "lang=".concat(selectedLocal);
}

var start = function start() {
  dropdownList.style.display = 'none';
  renderAllCountries(allData);
  document.querySelectorAll('.dropdown-lists__total-line').forEach(function (el) {
    el.addEventListener('click', getSelectedCountry);
  });
  allCities = getAllCitiesData();
  selectCitiesInput.addEventListener('input', getAutocomplete);
  document.addEventListener('click', getCityInfo);
};

var checkLocale = function checkLocale(lang, arr) {
  if (lang === 'EN') {
    var _ref = [arr[2], arr[0]];
    arr[0] = _ref[0];
    arr[2] = _ref[1];
  }

  if (lang === 'DE') {
    var _ref2 = [arr[1], arr[0]];
    arr[0] = _ref2[0];
    arr[1] = _ref2[1];
  }

  return arr;
};

var getCityInfo = function getCityInfo(e) {
  label.style.display = 'none';

  if (e.target.matches('.dropdown-lists__total-line')) {
    e.preventDefault();
    closeBtn.style.display = 'block';
    selectCitiesInput.value = getTextDataFromInput(e.target.innerText);
  }

  if (e.target.matches('.dropdown-lists__line') || e.target.closest('.dropdown-lists__line')) {
    linkButton.removeAttribute('disabled');
    closeBtn.style.display = 'block';
    console.log(e.target.innerText.split(' '));
    selectCitiesInput.value = getTextDataFromInput(e.target.innerText);
    linkButton.setAttribute('href', getLinkAdress());
  }

  if (e.target.matches('.close-button')) {
    selectCitiesInput.value = '';
    label.style.display = 'block';
    dropdownList.style.display = 'none';
    closeBtn.style.display = 'none';
    selectList.style.display = 'none';
    defaultList.style.display = 'block';
    return;
  }
};

var getTextDataFromInput = function getTextDataFromInput(str) {
  // str = str.trim();
  str = str.replace(/[^а-яa-z\-]/gi, '');
  return str;
};

var getLinkAdress = function getLinkAdress() {
  var link = '';
  var allCitiesData = getAllCitiesData();
  allCitiesData.forEach(function (city) {
    if (city.name === selectCitiesInput.value) {
      link = city.link;
    }
  });
  return link;
};

var getAutocomplete = function getAutocomplete(e) {
  var allCitiesNames = [];
  allCities.forEach(function (city) {
    allCitiesNames.push(city.name);
  });
  var errorBlock = document.createElement('div');
  autocompleteList.querySelector('.dropdown-lists__col').innerHTML = '';
  label.classList.toggle('hide');
  var searchStr = e.target.value.toLowerCase();

  if (searchStr !== '') {
    var filteredCitiesArr = allCitiesNames.filter(function (city) {
      city = city.toLowerCase();

      if (city.slice(0, 1) === searchStr.slice(0, 1)) {
        return city.includes(searchStr);
      }
    });

    if (filteredCitiesArr.length === 0) {
      createNonResultBlock(searchStr, errorBlock);
      return;
    }

    renderCurrentCity(filteredCitiesArr);
  } else {
    defaultList.style.display = 'block';
  }
};

var createNonResultBlock = function createNonResultBlock(str, block) {
  defaultList.style.display = 'none';
  autocompleteList.style.display = 'block';
  var div = autocompleteList.querySelector('.dropdown-lists__col');
  block.innerHTML = "<div class=\"dropdown-lists__line\">\n                        <div>\u041F\u043E \u0432\u0430\u0448\u0435\u043C\u0443 \u0437\u0430\u043F\u0440\u043E\u0441\u0443 <b>\"".concat(str, "\"</b> \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E</div>\n                      </div>");
  div.appendChild(block);
};

var renderCurrentCity = function renderCurrentCity(arr) {
  var result = [];
  allCities.forEach(function (el) {
    arr.forEach(function (city) {
      if (city === el.name) {
        result.push(el);
      }
    });
  });
  defaultList.style.display = 'none';
  selectList.style.display = 'none';
  autocompleteList.style.display = 'block';
  result.forEach(function (el) {
    var div = autocompleteList.querySelector('.dropdown-lists__col');
    var block = document.createElement('div');
    block.innerHTML = "<div class=\"dropdown-lists__line\">\n                            <div class=\"dropdown-lists__city\">".concat(el['name'], "</div>\n                            <div class=\"dropdown-lists__city-info\"><span>").concat(el['country'], "</span></div>\n                          </div>");
    div.appendChild(block);
  });
};

var getSelectedCountry = function getSelectedCountry(e) {
  for (var key in allData) {
    if (allData[key]['country'] == e.currentTarget.children[0].textContent) {
      defaultList.style.display = 'none';
      renderSelectedCountry(allData[key]);
    }
  }

  selectList.querySelector('.dropdown-lists__total-line').addEventListener('click', function (e) {
    if (getComputedStyle(defaultList).display === 'none') {
      defaultList.style.display = 'block';
      selectList.style.display = 'none';
    }
  });
};

var renderSelectedCountry = function renderSelectedCountry(arr) {
  selectList.innerHTML = '';
  selectList.style.display = 'block';
  var currentCitiesAll = [];
  arr.cities.forEach(function (el) {
    currentCitiesAll.push(el);
  });
  createCountryBlock(arr['country'], arr['count'], selectList);
  renderCities(currentCitiesAll, selectList);
};

selectCitiesInput.addEventListener('click', function () {
  dropdownList.style.display = 'block';
}); // selectCitiesInput.addEventListener('blur', () => {
//     dropdownList.style.display = 'none';
// })

var getTopCities = function getTopCities(arr, count) {
  var topThreeCities = [];
  var resultTopCities = [];

  for (var city in arr) {
    topThreeCities.push(arr[city]['count']);
  }

  topThreeCities = topThreeCities.sort(function (a, b) {
    return b - a;
  });
  topThreeCities = topThreeCities.slice(0, count);

  var _loop = function _loop(_city) {
    topThreeCities.forEach(function (el) {
      if (el === arr[_city]['count']) {
        resultTopCities.push(arr[_city]);
      }
    });
  };

  for (var _city in arr) {
    _loop(_city);
  }

  return resultTopCities;
};

var renderAllCountries = function renderAllCountries(arr) {
  for (var key in arr) {
    createCountryBlock(arr[key]['country'], arr[key]['count'], defaultList);
    var currentTopCities = getTopCities(arr[key]['cities'], 3);
    renderCities(currentTopCities, defaultList);
  }
};

var createCountryBlock = function createCountryBlock(countryName, countryCount, selector) {
  var block = document.createElement('div');
  block.innerHTML = "<div class=\"dropdown-lists__countryBlock\">\n                            <div class=\"dropdown-lists__total-line\">\n                                <div class=\"dropdown-lists__country\">".concat(countryName, "</div>\n                                <div class=\"dropdown-lists__count\">").concat(countryCount, "</div>\n                            </div>\n                        </div>");
  selector.appendChild(block);
};

var renderCities = function renderCities(arr) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  var div = parent.querySelectorAll('.dropdown-lists__countryBlock');
  arr.forEach(function (el) {
    var block = document.createElement('div');
    block.innerHTML = "<div class=\"dropdown-lists__line\">\n                            <div class=\"dropdown-lists__city\">".concat(el['name'], "</div>\n                            <div class=\"dropdown-lists__count\">").concat(el['count'], "</div>\n                          </div>");
    div.forEach(function (el) {
      el.appendChild(block);
    });
  });
};

var getAllCitiesData = function getAllCitiesData() {
  var allCities = [];

  var _loop2 = function _loop2(key) {
    allData[key]['cities'].forEach(function (city) {
      var cityData = {
        country: '',
        name: '',
        link: '',
        count: ''
      };
      cityData.country = allData[key]['country'];
      cityData.name = city.name;
      cityData.link = city.link;
      cityData.count = city.count;
      allCities.push(cityData);
    });
  };

  for (var key in allData) {
    _loop2(key);
  }

  return allCities;
};