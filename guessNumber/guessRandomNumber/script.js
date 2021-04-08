let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let userAnswer;

function getRandomNum() {
    Math.round((Math.random() * 100 + 1));
}

let start = function() {
    userAnswer = prompt('Угадай число от 1 до 100')
}

