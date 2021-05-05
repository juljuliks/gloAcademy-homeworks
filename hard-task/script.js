document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    const getData = () => {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', './cars.json', true);
            request.setRequestHeader('Content-type', 'application/json');
            request.addEventListener('readystatechange', () => {
                if (request.status === 200 || request.readyState === 4) {
                    let data = JSON.parse(request.responseText)
                    resolve(data)
                }
                else if (request.status === 200 && request.readyState !== 4) {
                    let reason = request.readyState
                    reject(reason)
                }
            });
            request.send();
        });
    }

    select.addEventListener('change', () => {
        getData()
            .then((data) => {
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
            }).catch((reason) => {
                console.log(reason);
                output.innerHTML = 'Произошла ошибка';
            })
    });
});