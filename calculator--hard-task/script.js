// Задание 1

let getTrimmed = function(str) {
    str = str.trim();
    if (typeof str !== 'string') {
        console.log('В качестве аргумента должна быть строка!');
        return;
    } else if (str.length > 30) {
        return str.slice(0, 30) + '...';
    }
    return str;
}

let result = getTrimmed('    Lorem                    ')
console.log(result);

