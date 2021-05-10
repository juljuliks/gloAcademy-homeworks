const request = new XMLHttpRequest();
request.open('GET', './db_cities.json');
let allData = [];
let allCities = [];
const selectCitiesInput = document.getElementById('select-cities');
const dropdownList = document.querySelector('.dropdown-lists');
let lang = 'RU'
request.send();
request.addEventListener('readystatechange', () => {
    if (request.readyState === 4 && request.status === 200) {
        allData = JSON.parse(request.responseText);
        start();
    }

    const style = document.createElement('style');
    style.innerHTML = `
    .hide {
        display: none;
    }
    .show {
        display: none;
    }
`
    document.head.appendChild(style)
})

const getAllCities = () => {
    let cities = document.querySelectorAll('.dropdown-lists__city');
    cities.forEach(el => {
        allCities.push(el.innerText);
    })
    return allCities;
}

const start = () => {
    dropdownList.style.display = 'none';
    renderAllCountries(allData[lang]);
    document.querySelectorAll('.dropdown-lists__total-line').forEach(el => {
        el.addEventListener('click', getSelectedCountry);
    })
    allCities = getAllCities();
    selectCitiesInput.addEventListener('input', getAutocomplete)
}

const getAutocomplete = (e) => {
    let searchStr = e.target.value;
    const filteredCitiesArr = allCities.filter((city) => {
        return city.includes(searchStr);
    })
    renderCurrentCity(filteredCitiesArr)
}

const renderCurrentCity = (arr) => {
    let result = [];
    for (const key in allData[lang]) {
        let cities = allData[lang][key]['cities']
        cities.forEach(el => {
            arr.forEach(city => {
                if (city === el['name']) {
                    result.push(el);
                }
            })
        })
    }

    const defaultList = document.querySelector('.dropdown-lists__list--default');
    const autocompleteList = document.querySelector('.dropdown-lists__list--autocomplete');
    defaultList.style.display = 'none';
    autocompleteList.style.display = 'block'
    
    console.log(result);
    result.forEach(el => {
        let div = autocompleteList.querySelector('.dropdown-lists__col')
        let block = document.createElement('div');
        block.innerHTML = `<div class="dropdown-lists__line">
                            <div class="dropdown-lists__city">${el['name']}</div>
                            <div class="dropdown-lists__count">${el['count']}</div>
                          </div>`
        div.appendChild(block)
    })
}

const getSelectedCountry = (e) => {
    let defaultList = document.querySelector('.dropdown-lists__list--default');
    let selectList = document.querySelector('.dropdown-lists__list--select');
    for (let key in allData[lang]) {
        if (allData[lang][key]['country'] == e.currentTarget.children[0].textContent) {
            defaultList.style.display = 'none';
            renderSelectedCountry(allData[lang][key])
        }
    }

    selectList.querySelector('.dropdown-lists__total-line').addEventListener('click', (e) => {
        if (getComputedStyle(defaultList).display === 'none') {
            defaultList.style.display = 'block';
        }
    });
}

const renderSelectedCountry = (arr) => {
    const dropdownList = document.querySelector('.dropdown-lists__list--select').querySelector('.dropdown-lists__col');
    dropdownList.innerHTML = '';
    let block = document.createElement('div');
    block.innerHTML = `<div class="dropdown-lists__countryBlock">
                                <div class="dropdown-lists__total-line">
                                    <div class="dropdown-lists__country">${arr['country']}</div>
                                    <div class="dropdown-lists__count">${arr['count']}</div>
                                </div>
                            </div>`
    dropdownList.appendChild(block);
    document.querySelector('.dropdown-lists__list--select').style.display = 'block';

    let currentCitiesAll = [];
    arr.cities.forEach(el => {
        currentCitiesAll.push(el)
    })
    renderCities(currentCitiesAll)
}

selectCitiesInput.addEventListener('click', () => {
    dropdownList.style.display = 'block';
})

// selectCitiesInput.addEventListener('blur', () => {
//     dropdownList.style.display = 'none';
// })

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

const renderCities = (arr) => {
    let div = document.querySelectorAll('.dropdown-lists__countryBlock');
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

const renderAllCountries = (arr) => {
    const dropdownList = document.querySelector('.dropdown-lists__list--default').querySelector('.dropdown-lists__col');

    for (const key in arr) {
        let block = document.createElement('div');
        let currentTopCities = getTopCities(arr[key]['cities'], 3);

        block.innerHTML = `<div class="dropdown-lists__countryBlock">
                                <div class="dropdown-lists__total-line">
                                    <div class="dropdown-lists__country">${arr[key]['country']}</div>
                                    <div class="dropdown-lists__count">${arr[key]['count']}</div>
                                </div>
                            </div>`
        dropdownList.appendChild(block)
        renderCities(currentTopCities)
    }
}