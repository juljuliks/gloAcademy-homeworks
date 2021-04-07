'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    income = 'Фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, Продукты'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 500000,
    period = 12,
    budgetDay,
    expenses = [];

let start = function() {

    do {
        money = prompt('Ваш месячный доход?');
    } while ( !isNumber(money) )

};

start();

let showTypeOf = function(data) {
    console.log(`Тип данных ${data} - ${typeof(data)}`);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log((addExpenses.toLowerCase()).split(','));

function getExpensesMonth() {
    let sum = 0;
    let amount;

    for(let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?');

        do {
            amount = prompt('Во сколько это обойдется?');
            sum += +amount;
        } while ( !isNumber(amount) )
    }
    console.log(expenses);
    return sum;
};

let expensesAmount = getExpensesMonth();

function getAccumulatedMonth() {
    return Math.ceil(money - expensesAmount);
};

let accumulatedMonth = getAccumulatedMonth();

function getTargetMonth() {
    return Math.ceil(mission / accumulatedMonth);
};

let targetMonth = getTargetMonth();
console.log('target month', targetMonth);

budgetDay = Math.floor(accumulatedMonth / 30);

console.log(`Расходы за месяц - ${expensesAmount}`);

console.log(`Бюджет на день ${budgetDay}`);

let getStatusIncome = function() {
    if (budgetDay >= 1200) {
        return('У вас высокий уровень дохода');
    } else if (budgetDay >= 600) {
        return('У вас средний уровень дохода');
    } else if (budgetDay < 600 && budgetDay >= 0) {
        return('К сожалению у вас уровень дохода ниже среднего');
    } else {
        return('Что-то пошло не так');
    }
};

console.log(getStatusIncome());

function displayNumOfMonth() {
    if (getTargetMonth() < 0 || !isFinite(targetMonth) ) {
        console.log('Цель не будет достигнута');
    } else {
        console.log(`Цель будет достигнута через ${targetMonth} месяцев(-а)`);
    }
}

displayNumOfMonth();