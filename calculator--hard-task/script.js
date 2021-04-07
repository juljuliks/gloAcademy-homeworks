// Задание 1

let getTrimmed = function(str) {
    if (typeof str !== 'string') {
        console.log('В качестве аргумента должна быть строка!');
        return;
    } else if (str.length > 30) {
        return str.trim().slice(0, 30) + '...';
    } else {
        return str.trim();
    }
    
}

let result = getTrimmed('     rewh hwteh wth wth wt wth w strjrjwr         ')
console.log(result);

