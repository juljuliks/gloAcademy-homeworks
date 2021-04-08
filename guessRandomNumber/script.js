function guessRandomNumber() {
    let randomNumber = Math.floor(Math.random() * 100 + 1);
    let counter = 0;
    let maxTries = 10;
    // console.log('Загаданное число ',randomNumber);

    return function() {
        if (counter === 10) {
            console.log('Попытки закончились, хотите сыграть еще?');
            return;
        }

        let userGuess = prompt("Угадай число от 1 до 100");
        // console.log('Догадка пользователя ',userGuess);

        if (isNaN(userGuess) || userGuess.trim() === '') {
            console.log('Введите число!');
            control();
        } 

        else if (userGuess === null) {
            console.log('До свидания!');
            return;
        }
        else if (userGuess > randomNumber) {
            counter++;
            console.log(`Загаданное число меньше, осталось попыток ${maxTries - counter}`);
            control();
        } 
        else if (userGuess < randomNumber) {
            counter++;
            console.log(`Загаданное число больше, осталось попыток ${maxTries - counter}`);
            control();
        } 
        else if (userGuess === randomNumber) {
            console.log('Поздравляю, Вы угадали!!!');
        }
    }
}

const control = guessRandomNumber();
control();
