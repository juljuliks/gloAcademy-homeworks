// Задание 1

let getTrimmed = function(str) {

    if (typeof str !== 'string') {
        console.log('В качестве аргумента должна быть строка!');
        return;
    }

    str = str.slice(0, 30) + '...';
    return str.trim();
}

let result = getTrimmed('    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, veniam placeat ipsa libero quo dolores magnam beatae sapiente. Qui, deserunt itaque nesciunt exercitationem eos quod tempore est adipisci sit ex? eos quod tempore est adipisci sit ex?   ');
console.log(result);

// Решение с callback-функцией 

let getTrimmed = function(str, callback) {
    if (typeof str !== 'string') {
        console.log('В качестве аргумента должна быть строка!');
        callback(str);
    }
};

(getTrimmed('Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, veniam placeat ipsa libero quo dolores magnam beatae sapiente. Qui, deserunt itaque nesciunt exercitationem eos quod tempore est adipisci sit ex? eos quod tempore est adipisci sit ex?   ', function(str) {
    str = str.trim().slice(0, 30) + '...';
    console.log(str);
}));
