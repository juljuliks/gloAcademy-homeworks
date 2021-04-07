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

let check = getTrimmed('      grab reh eh hsfdht tw hshw s wthhtw      ');

console.log(check);




