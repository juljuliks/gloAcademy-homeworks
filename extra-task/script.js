document.addEventListener('DOMContentLoaded', () => {
    const select = document.querySelector('#heroes');
    const request = new XMLHttpRequest();
    request.open('GET', './dbHeroes.json');
    request.setRequestHeader('Content-type', 'application/json');
    let allHeroes = [];

    request.addEventListener('readystatechange', (e) => {
        if (request.readyState === 4 && request.status === 200) {
            allHeroes = JSON.parse(request.responseText);
            renderUsers(allHeroes);
        }
    })
    request.send();

    const renderUsers = (arr) => {
        arr.forEach(el => {
            let movies = (el.movies) ? el.movies : '';
            let realName = (el.realName) ? el.realName : '';
            let div = document.createElement('div');
            div.setAttribute('id', 'hero_card')
            div.innerHTML = `<div id="hiro_card">
                                <img src="${el.photo}" alt="" width="150px">
                                <h3>${el.name}</h3>
                                <h3>${realName}</h3>
                                <p>${movies}</p>
                                <h3>${el.status}</h3>
                            </div>`
            document.body.appendChild(div);
        });
    }

    const sort = (e) => {
        // console.log(allHeroes);
        if (e.target.value === 'gender') {
            getSelectedArr(allHeroes, 'gender')
            // createList()
        }
        // console.log(e.target.value);
    }

    const getSelectedArr = (arr, property, curProperty) => {
        let resultArr = [];
        arr.forEach(el => {
            console.log(el[property]);
        })
    }  

    select.addEventListener('change', sort)
})