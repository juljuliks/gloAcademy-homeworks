document.addEventListener('DOMContentLoaded', () => {
    const select = document.querySelector('#sort');
    const select2 = document.querySelector('#sort2');
    const request = new XMLHttpRequest();
    request.open('GET', './dbHeroes.json');
    request.setRequestHeader('Content-type', 'application/json');
    let allHeroes = [];

    request.addEventListener('readystatechange', (e) => {
        if (request.readyState === 4 && request.status === 200) {
            allHeroes = JSON.parse(request.responseText);
            renderHeroes(allHeroes);
        }
    })
    request.send();

    const renderHeroes = (arr) => {
        let content = document.querySelector('.content');
        arr.forEach(el => {
            let movies = (el.movies) ? el.movies.join(', ') : '';
            let realName = (el.realName) ? el.realName : '';
            let div = document.createElement('div');
            div.setAttribute('class', 'hero_card')
            div.innerHTML = `<div>
                                <img src="${el.photo}" alt="" width="150px">
                                <h3>${el.name}</h3>
                                <h3>${realName}</h3>
                                <p>${movies}</p>
                                <h3>${el.status}</h3>
                            </div>`
            content.appendChild(div);
        });
    }

    const sortHandler = (e) => {
        select2.innerHTML = '';
        document.querySelector('option').setAttribute('disabled', 'disabled')
        if (e.target.value === '') {
            select2.classList.add('d-none');
        } else if (e.target.value === 'name') {
            select2.classList.add('d-none')
            document.querySelectorAll('.hero_card').forEach(el => el.remove());
            renderHeroes(allHeroes)
        } else if (e.target.value === 'gender') {
            let currentList = getSelectedArr('gender');
            createList(currentList, 'gender');
        } else if (e.target.value === 'name-reversed') {
            select2.classList.add('d-none')
            document.querySelectorAll('.hero_card').forEach(el => el.remove());
            let reversedArr = allHeroes.slice(0).reverse();
            renderHeroes(reversedArr)
        } else if (e.target.value === 'citizenship') {
            let currentList = getSelectedArr('citizenship');
            createList(currentList, 'citizenship');
        } else if (e.target.value === 'movies-count') {
            document.querySelectorAll('.hero_card').forEach(el => el.remove());
            select2.classList.add('d-none')
            let currentList = sortByNumOfFilms();
            renderHeroes(currentList)
        } else if (e.target.value === 'status') {
            let currentList = getSelectedArr('status');
            createList(currentList, 'status');
        } else if (e.target.value === 'species') {
            let currentList = getSelectedArr('species');
            createList(currentList, 'species');
        } else if (e.target.value === 'films') {
            let currentList = sortByFilms()
            createList(currentList, 'film')
        }
    }

    const sortByFilms = () => {
        let curArr = [];
        property = 'movies';
        allHeroes.forEach((el, i) => {
            if (el.hasOwnProperty(property) && el[property][i] !== undefined) {
                if (el[property].length > 0) {
                    el[property].forEach(el => {
                        curArr.push(el)
                    })
                }
            }
        })
        curArr = [...new Set(curArr)];
        return curArr;
    }

    const filterredByFilm = () => {
        let currentFilmList = []
        allHeroes.forEach((el, i) => {
            if (el.hasOwnProperty(property)) {
                if (el[property][i] !== undefined) {
                    if (el['movies'].includes(select2.value)) {
                        currentFilmList.push(el)
                    }
                }
            }
        })
        return currentFilmList;
    }

    const sortByNumOfFilms = () => {
        let curArr = [];
        let property = 'movies'
        allHeroes.forEach((el, i) => {
            if (el.hasOwnProperty(property) && el[property][i] !== undefined) {
                if (el[property].length > 0) {
                    curArr.push(el);
                }
            }
        })
        return curArr.reverse();
    }

    const createList = (arr, name) => {
        select2.classList.remove('d-none');
        let emptyOption = document.createElement('option');
        select2.appendChild(emptyOption);
        emptyOption.setAttribute('disabled', 'disabled')
        emptyOption.text = `Choose ${name}`;
        emptyOption.value = ''
        arr.forEach((item, index) => {
            item = document.createElement('option');
            item.text = arr[index];
            item.value = arr[index];
            select2.appendChild(item);
        })
    }

    const getSelectedArr = (property) => {
        let resultArr = [];
        allHeroes.forEach((el) => {
            if (el[property] !== undefined) {
                if (resultArr.indexOf(el[property].toLowerCase()) === -1) {
                    resultArr.push(el[property].toLowerCase());
                }
            }
        })
        return resultArr;
    }

    const createFilteredArr = () => {
        let curArr = [];
        allHeroes.forEach(el => {
            if (el[select.value] !== undefined) {
                if (el[select.value].toLowerCase() === select2.value) {
                    curArr.push(el)
                }
            }
        })
        return curArr;
    }

    select.addEventListener('change', sortHandler)
    select2.addEventListener('change', () => {
        document.querySelectorAll('.hero_card').forEach(el => {
            el.remove()
        })
        let currentRender = createFilteredArr();
        renderHeroes(currentRender)
        let filtByFilms = filterredByFilm();
        renderHeroes(filtByFilms)
    })
})