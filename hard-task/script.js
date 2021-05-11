let allData = [];
let allCities = [];
const selectCitiesInput = document.getElementById('select-cities'),
    dropdownList = document.querySelector('.dropdown-lists'),
    defaultList = document.querySelector('.dropdown-lists__list--default'),
    selectList = document.querySelector('.dropdown-lists__list--select'),
    autocompleteList = document.querySelector('.dropdown-lists__list--autocomplete'),
    label = document.querySelector('.label'),
    closeBtn = document.querySelector('.close-button'),
    linkButton = document.querySelector('.button');
const request = new XMLHttpRequest();
let selectedLocal;

const sendRequest = (lang) => {
    request.open('GET', `http://localhost:3000/${lang}`);
    if (localStorage.getItem('allData') !== null) {
        allData = JSON.parse(localStorage.getItem('allData'));
    } else {
        request.send();
    }
}

if (getCookie('lang')) {
    sendRequest(getCookie('lang'))
} else {
    if (selectedLocal === '') {
        selectedLocal = prompt('Введите локаль');
    } else {
        do {
            selectedLocal = prompt('Введите локаль');
        } while (selectedLocal !== 'RU' && selectedLocal !== 'EN' && selectedLocal !== 'DE')
    }
    sendRequest(selectedLocal);
    saveCookie();
}
const circle = document.createElement('div');
circle.classList.add('circle');

request.addEventListener('readystatechange', () => {
    let main = document.querySelector('.main');
    if (request.readyState !== 4) {
        document.body.appendChild(circle)
        main.style.display = 'none';
    }
    if (request.readyState === 4 && request.status === 200) {
        setTimeout(() => {
            circle.style.display = 'none'
            main.style.display = 'block';
        }, 1200)
        allData = JSON.parse(request.responseText);
        setStorage()

        allData = checkLocale(getCookie('lang'), allData)
        start();
    }
})

const setStorage = () => {
    let storageData = []
    for (const key in allData) {
        storageData.push(allData[key]);
    }
    localStorage.setItem('allData', JSON.stringify(storageData))
}

const start = () => {
    linkButton.setAttribute('disabled', true);
    label.style.display = 'block'
    dropdownList.style.display = 'none';
    renderAllCountries(allData);
    document.querySelectorAll('.dropdown-lists__total-line').forEach(el => {
        el.addEventListener('click', getSelectedCountry);
    })
    allCities = getAllCitiesData();
    selectCitiesInput.addEventListener('input', getAutocomplete);
    document.addEventListener('click', getCityInfo);
}

const checkLocale = (lang, arr) => {
    if (lang === 'EN') {
        [arr[0], arr[2]] = [arr[2], arr[0]];
    }
    if (lang === 'DE') {
        [arr[0], arr[1]] = [arr[1], arr[0]];
    }
    return arr;
}

const getCityInfo = (e) => {
    label.style.display = 'none'
    if (e.target.matches('.dropdown-lists__total-line')) {
        e.preventDefault();
        linkButton.removeAttribute('href')
        linkButton.readOnly = true;
        closeBtn.style.display = 'block';
        selectCitiesInput.value = getTextDataFromInput(e.target.innerText);
        return;
    }
    if (e.target.closest('.dropdown-lists__line') || e.target.closest('.dropdown-lists__count')) {
        linkButton.removeAttribute('disabled');
        closeBtn.style.display = 'block';
        selectCitiesInput.value = getTextDataFromInput(e.target.innerText.split('\n')[0]);
        linkButton.setAttribute('href', getLinkAdress())
    }
    if (e.target.matches('.close-button')) {
        selectCitiesInput.value = '';
        dropdownList.style.display = 'none';
        closeBtn.style.display = 'none';
        linkButton.setAttribute('disabled', true)
        selectList.style.display = 'none';
        defaultList.style.display = 'block';
        defaultList.style.right = '0'
        label.style.display = 'block';
        return;
    }
}

const getTextDataFromInput = (str) => {
    str = str.replace(/[^а-яa-z\-]/gi, '')
    return str;
}

const getLinkAdress = () => {
    let link = ''
    let allCitiesData = getAllCitiesData();
    allCitiesData.forEach(city => {
        if (city.name === selectCitiesInput.value) {
            link = city.link;
        }
    })
    return link
}

const getAutocomplete = (e) => {
    let allCitiesNames = []
    allCities.forEach((city) => {
        allCitiesNames.push(city.name)
    })
    let errorBlock = document.createElement('div');
    autocompleteList.querySelector('.dropdown-lists__col').innerHTML = '';
    label.classList.toggle('hide')
    let searchStr = e.target.value.toLowerCase();
    if (searchStr !== '') {
        const filteredCitiesArr = allCitiesNames.filter((city) => {
            city = city.toLowerCase();
            if (city.slice(0, 1) === searchStr.slice(0, 1)) {
                return city.includes(searchStr);
            }
        })
        if (filteredCitiesArr.length === 0) {
            createNonResultBlock(searchStr, errorBlock)
            return
        }
        renderCurrentCity(filteredCitiesArr)
    } else {
        defaultList.style.display = 'block';
    }
}

const createNonResultBlock = (str, block) => {
    defaultList.style.display = 'none'
    autocompleteList.style.display = 'block'
    let div = autocompleteList.querySelector('.dropdown-lists__col')
    block.innerHTML = `<div class="dropdown-lists__line">
                        <div>По вашему запросу <b>"${str}"</b> ничего не найдено</div>
                      </div>`
    div.appendChild(block);
};

const renderCurrentCity = (arr) => {
    let result = [];
    allCities.forEach(el => {
        arr.forEach(city => {
            if (city === el.name) {
                result.push(el)
            }
        })
    })
    defaultList.style.display = 'none';
    selectList.style.display = 'none';
    autocompleteList.style.display = 'block'
    result.forEach(el => {
        let div = autocompleteList.querySelector('.dropdown-lists__col')
        let block = document.createElement('div');
        block.innerHTML = `<div class="dropdown-lists__line">
                            <div class="dropdown-lists__city">${el['name']}</div>
                            <div class="dropdown-lists__city-info"><span>${el['country']}</span></div>
                          </div>`
        div.appendChild(block)
    })
}

const getSelectedCountry = (e) => {
    for (let key in allData) {
        if (allData[key]['country'] == e.currentTarget.children[0].textContent) {
            animateDropdown(defaultList, selectList, 'right')
            renderSelectedCountry(allData[key])
        }
    }
    selectList.querySelector('.dropdown-lists__total-line').addEventListener('click', (e) => {
        if (getComputedStyle(defaultList).display === 'none') {
            animateDropdown(selectList, defaultList)
        }
    });
}

const animateDropdown = (item, item2, direction = 'left') => {
    item.style.position = 'relative';
    item2.style.position = 'relative';
    let count = 0,
        animate;

    const animation = () => {
        animate = requestAnimationFrame(animation)
        count += 7;
        if (count <= 100) {
            if (direction === 'right') {
                item.style.right = count + '%';
            } else {
                item.style.left = count + '%';
            }
            return;
        } else {
            cancelAnimationFrame(animate);
        }
        if (direction === 'right') {
            item.style.display = 'none'
            item2.style.right = '0';
            item2.style.left = '0';
            item2.style.display = 'block'
        } else {
            item.style.display = 'none';
            item2.style.right = '0';
            item2.style.display = 'block'
        }
    }
    animation()
}

const renderSelectedCountry = (arr) => {
    selectList.innerHTML = '';
    selectList.style.display = 'block';
    let currentCitiesAll = [];
    arr.cities.forEach(el => {
        currentCitiesAll.push(el)
    })
    createCountryBlock(arr['country'], arr['count'], selectList)
    renderCities(currentCitiesAll, selectList)
}

selectCitiesInput.addEventListener('click', () => {
    dropdownList.style.display = 'block';
})

const getTopCities = (arr, count) => {
    let topThreeCities = [];
    let resultTopCities = [];
    for (let city in arr) {
        topThreeCities.push(arr[city]['count']);
    }
    topThreeCities = topThreeCities.sort((a, b) => b - a)
    topThreeCities = topThreeCities.slice(0, count);
    for (let city in arr) {
        topThreeCities.forEach(el => {
            if (el === arr[city]['count']) {
                resultTopCities.push(arr[city])
            }
        })
    }
    return resultTopCities;
}

const renderAllCountries = (arr) => {
    for (const key in arr) {
        createCountryBlock(arr[key]['country'], arr[key]['count'], defaultList)
        let currentTopCities = getTopCities(arr[key]['cities'], 3);
        renderCities(currentTopCities, defaultList)
    }
}

const createCountryBlock = (countryName, countryCount, selector) => {
    let block = document.createElement('div');
    block.innerHTML = `<div class="dropdown-lists__countryBlock">
                            <div class="dropdown-lists__total-line">
                                <div class="dropdown-lists__country">${countryName}</div>
                                <div class="dropdown-lists__count">${countryCount}</div>
                            </div>
                        </div>`
    selector.appendChild(block)
}

const renderCities = (arr, parent = document) => {
    let div = parent.querySelectorAll('.dropdown-lists__countryBlock');
    arr.forEach(el => {
        let block = document.createElement('div');
        block.innerHTML = `<div class="dropdown-lists__line">
                            <div class="dropdown-lists__city">${el['name']}</div>
                            <div class="dropdown-lists__count">${el['count']}</div>
                          </div>`

        div.forEach(el => {
            el.appendChild(block)
        })
    })
}

const getAllCitiesData = () => {
    let allCities = [];
    for (const key in allData) {
        allData[key]['cities'].forEach((city) => {
            let cityData = {
                country: '',
                name: '',
                link: '',
                count: '',
            }
            cityData.country = allData[key]['country'];
            cityData.name = city.name;
            cityData.link = city.link;
            cityData.count = city.count;
            allCities.push(cityData)
        })
    }
    return allCities;
}

start();

function saveCookie() {
    document.cookie = `lang=${selectedLocal}`;
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
}