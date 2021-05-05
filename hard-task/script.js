let rates = {};

const usdBlock = document.querySelector('[data-value="USD"]');
const eurBlock = document.querySelector('[data-value="EUR"]');
const select = document.querySelectorAll('select.form-control')
const select1 = select[0];
const select2 = select[1];
const result = document.querySelector('#result');
const input = document.querySelector('#input');

fetch('https://www.cbr-xml-daily.ru/daily_json.js').then((response) => {
    return response.json();
}).then((data) => {
    rates.USD = data.Valute.USD;
    rates.EUR = data.Valute.EUR;
    rates.RUB = {Value: 1};
    return rates;
}).then(() => {
    usdBlock.textContent = rates.USD.Value.toFixed(2);
    eurBlock.textContent = rates.EUR.Value.toFixed(2);
    input.addEventListener('input', convert);
    select.forEach(el => {
        el.addEventListener('change', convert)
    });
})

function convert() {
    input.innerHTML = ''
    result.value = ((+input.value * rates[select1.value].Value) / rates[select2.value].Value).toFixed(2)
}


