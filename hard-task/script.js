document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

        const getData = () => {
            return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.addEventListener('readystatechange', () => {
                    if (request.readyState !== 4) {
                        return;
                    }
                    if (request.status === 200) {
                        let data = JSON.parse(request.responseText)
                        resolve(data)
                    }
                    else {
                        let reason = request.readyState
                        reject(reason)
                    }
                });
                request.open('GET', './cars.json', true);
                request.setRequestHeader('Content-type', 'application/json');
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