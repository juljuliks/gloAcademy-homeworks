function guessRandomNumber() {
    let randomNumber = Math.floor(Math.random() * 100 + 1);
    let counter = 0;
    let maxTries = 10;
    // console.log('Загаданное число ',randomNumber);

    return function() {
        if (counter === 10) {
            alert('Попытки закончились, хотите сыграть еще?');
            return;
        }
        let userGuess = prompt("Угадай число от 1 до 100");
        // console.log('Догадка пользователя ',userGuess);
        if (userGuess === null) {
            alert('До свидания!');
            return;
        }
        if (isNaN(userGuess) || userGuess.trim() === '') {
            alert('Введите число!');
            control();
        } 
        else if (userGuess > randomNumber) {
            counter++;
            alert(`Загаданное число меньше, осталось попыток ${maxTries - counter}`);
            control();
        } 
        else if (userGuess < randomNumber) {
            counter++;
            alert(`Загаданное число больше, осталось попыток ${maxTries - counter}`);
            control();
        } 
        else if (userGuess === randomNumber) {
            alert('Поздравляю, Вы угадали!!!');
        }
    }
}

const control = guessRandomNumber();
control();
