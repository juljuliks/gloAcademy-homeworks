document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    const getData = () => {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', './cars.json');
            request.setRequestHeader('Content-type', 'application/json');

            request.addEventListener('readystatechange', () => {
                
                if (request.readyState === 4 && request.status === 200) {
                    console.log(request.readyState);
                    const data = JSON.parse(request.responseText);
                    console.log(data);
                    resolve(data);
                } else {
                    reject()
                }
                request.send();
            });
            
        }).then(() => {
            console.log('here')  
            data.cars.forEach(item => {
                if (item.brand === select.value) {
                    const {
                        brand,
                        model,
                        price
                    } = item;
                    output.innerHTML = `Тачка ${brand} ${model} <br> 
                    Цена: ${price}$`;
                }
            });
        })
        .catch(() => {
            output.innerHTML = 'Произошла ошибка';
        })
    }

    select.addEventListener('change', getData)

});