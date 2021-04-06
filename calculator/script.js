'use strict';

let money = +prompt('Ваш месячный доход?'),
    income = 'Фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 500000,
    period = 12,
    budgetDay,

    expenses1 = prompt('Вопрос #1: Введите обязательную статью расходов?'),
    expenses2 = prompt('Вопрос #2: Введите обязательную статью расходов?'),
    amount1 = +prompt('Вопрос #3: Во сколько это обойдется?'),
    amount2 = +prompt('Вопрос #4: Во сколько это обойдется?');

let showTypeOf = function(data) {
    console.log(`Тип данных ${data} - ${typeof(money)}`);
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log((addExpenses.toLowerCase()).split(','));

let getExpensesMonth = function() {
    return amount1 + amount2;
}

function getAccumulatedMonth() {
    return Math.ceil(money - getExpensesMonth());
}

let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function() {
    return Math.ceil(mission / accumulatedMonth);
}

budgetDay = Math.floor(accumulatedMonth / 30);

console.log(`Расходы за месяц - ${getExpensesMonth()}`);

console.log(`Бюджет на день ${budgetDay}`);

let getStatusIncome = function() {
    if (budgetDay >= 1200) {
        console.log('У вас высокий уровень дохода');
    } else if (budgetDay >= 600) {
        console.log('У вас средний уровень дохода');
    } else if (budgetDay < 600 && budgetDay >= 0) {
        console.log('К сожалению у вас уровень дохода ниже среднего');
    } else {
        console.log('Что-то пошло не так');
    }
}

getStatusIncome();

let displayNumOfMonth = ( getTargetMonth() !== Infinity || getTargetMonth() !== NaN) ? console.log(`Цель будет достигнута через ${getTargetMonth()} месяцев`) : console.log('Нужно увеличить доход');
console.log(displayNumOfMonth);
