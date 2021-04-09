'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    
    start = function() {
        do {
            money = +prompt('Ваш месячный доход?');
        } while ( !isNumber(money) )
    };
    start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 500000,
    period: 12,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    targetMonth: 0,


    getBudget: function() {
        let budgetMonth = Math.ceil(money - appData.expensesMonth),
            budgetDay = Math.floor(budgetMonth / 30);
        appData.budgetMonth = budgetMonth;
        appData.budgetDay = budgetDay;

        return appData.budgetMonth, appData.budgetDay;
    },

    getTargetMonth: function getTargetMonth() {
        let targetMonth = Math.ceil(appData.mission / appData.budgetMonth);
        appData.targetMonth = targetMonth;
        return appData.targetMonth;
    },

    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, Продукты');
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке');

        for(let i = 0; i < 2; i++) {
            appData.expenses = appData.expenses[prompt('Введите обязательную статью расходов?')];
            do {
                appData.expenses = prompt('Во сколько это обойдется?');
            } while (!isNumber(appData.expenses))
        }
    },

    getExpensesMonth: function() {
        let sum = 0;
        for(let key in appData.expenses) {
            sum += appData.expenses[key];
        }
        appData.expensesMonth = sum;
        return appData.expensesMonth;
    },

    getStatusIncome: function() {
        if (appData.budgetDay >= 1200) {
            return('У вас высокий уровень дохода');
        } else if (appData.budgetDay >= 600) {
            return('У вас средний уровень дохода');
        } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
            return('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return('Что-то пошло не так');
        }
    },

    displayNumOfMonth: function() {
        if (appData.targetMonth < 0 || !isFinite(appData.targetMonth) ) {
            console.log('Цель не будет достигнута');
        } else {
            console.log(`Цель будет достигнута через ${appData.targetMonth} месяцев(-а)`);
        }
    }
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log('Расходы за месяц', appData.expenses);
appData.displayNumOfMonth();
console.log(appData.getStatusIncome());

for(let key in appData) {
    console.log(`Наша программа включает в себя данные: ${key} : ${appData[key]}`);
}



