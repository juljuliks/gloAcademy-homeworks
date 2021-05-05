"use strict";

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var select = document.getElementById('cars'),
      output = document.getElementById('output'); // const request = new XMLHttpRequest();
  // request.open('GET', './cars.json');
  // request.setRequestHeader('Content-type', 'application/json');
  // request.send();

  var getData = function getData() {
    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      request.open('GET', './cars.json');
      request.setRequestHeader('Content-type', 'application/json');
      request.send();
      console.log(request.readyState);
      console.log(request.status);
      request.addEventListener('readystatechange', function () {
        if (request.readyState == 4 && request.status == 200) {
          console.log('here');
          console.log(request.responseText);
          var data = JSON.parse(request.responseText);
          resolve(data);
        } else {
          reject();
        }
      });
    });
  };

  select.addEventListener('change', function () {
    getData().then(function (data) {
      data.cars.forEach(function (item) {
        console.log('resolve');

        if (item.brand === select.value) {
          var brand = item.brand,
              model = item.model,
              price = item.price;
          output.innerHTML = "\u0422\u0430\u0447\u043A\u0430 ".concat(brand, " ").concat(model, " <br>\n                    \u0426\u0435\u043D\u0430: ").concat(price, "$");
        }
      });
    }, function () {
      output.innerHTML = 'Произошла ошибка';
    });
  });
});