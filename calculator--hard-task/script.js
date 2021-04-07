// Задание 1

let getTrimmed = function(str) {
    if (typeof str !== 'string') {
        console.log('В качестве аргумента должна быть строка!');
    } else if (str.length > 30) {
        return str.trim().slice(0, 30) + '...';
    } else {
        return str.trim();
    }
    
}

let check = getTrimmed('     rewh hwteh wth wth wt wth w strjrjwr         ');

console.log(check);




