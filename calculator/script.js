'use strict';

let money = 100000,
    income = 'Фриланс',
    addExpenses = 'Аренда квартиры, интернет, коммунальные платежи, питание, развлечения',
    deposit = true,
    mission = 500000,
    period = 12,
    budgetDay = (money / 30).toFixed(2),

    expenses1,
    expenses2,
    amount1,
    amount2,
    budgetMonth,
    monthToComplete;

console.log(`Тип данных money - ${typeof(money)}, 
Тип данных income - ${typeof(income)},
Тип данных deposit - ${typeof(deposit)}`);  
console.log(`addExpenses lenght - ${addExpenses.length}`);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
console.log((addExpenses.toLowerCase()).split(','));

money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
expenses1 = prompt('Введите обязательную статью расходов?');
expenses2 = prompt('Введите обязательную статью расходов?');
amount1 = +prompt('Во сколько это обойдется?');
amount2 = +prompt('Во сколько это обойдется?');
budgetMonth = Math.ceil(money - (amount1 + amount2));
budgetDay = Math.floor(budgetMonth / 30);
monthToComplete = Math.ceil(mission / budgetMonth);

console.log(`Бюджет на месяц ${budgetMonth}`);
console.log(`Бюджет на день ${budgetDay}`);

let displayNumOfMonth = (monthToComplete !== Infinity) ? console.log(`Цель будет достигнута через ${monthToComplete} месяцев`) : console.log('Нужно увеличить доход');
console.log(displayNumOfMonth);

if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay < 600 && budgetDay >= 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log('Что-то пошло не так');
}

