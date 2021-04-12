'use strict';

let calculateBtn = document.getElementById('start'),
    plusBtnFirst = document.getElementsByTagName('button')[0],
    plusBtnSecond = document.querySelectorAll('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeInputs = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('result-total budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('result-total budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('result-total expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('result-total additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('result-total additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('result-total income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('result-total target_month-value')[0],

    salaryAmount = document.querySelector('.salary-amount'),
    income = document.querySelectorAll('.income-title')[1],
    incomeAmount = document.querySelector('.income-amount'),
    expenses = document.querySelectorAll('.expenses-title')[1],
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalexpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    range = document.querySelector('.period-select');

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function(str) {
    return str === '' || str.trim() === '' || str === null || isNumber(str);
};

let money,
    start = function() {
        do {
            money = prompt('Ваш месячный доход?', '100000');
        } while ( !isNumber(money) )
    };
    start();
    
let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    persentDeposit: 0,
    moneyDeposit: 0,
    mission: 500000,
    period: 12,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    targetMonth: 0,


    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    getTargetMonth: function getTargetMonth() {
        let targetMonth = Math.ceil(appData.mission / appData.budgetMonth);
        appData.targetMonth = targetMonth;
        return appData.targetMonth;
    },

    asking: function() {

        if (confirm('Есть ли у Вас дополнительный заработок')) {
            let itemIncome, cashIncome;
            do {
                itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Фриланс');
            } while(isString(itemIncome))
            do {
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', '10000');
            } while (!isNumber(cashIncome))
            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'квартплата, продукты');
            appData.addExpenses = addExpenses.split(', ');
            
            for (const key in appData.addExpenses) {
                appData.addExpenses[key] = appData.addExpenses[key].charAt(0).toUpperCase() + appData.addExpenses[key].slice(1);
                }
            console.log(appData.addExpenses.join(', '));
            appData.deposit = confirm('Есть ли у вас депозит в банке');

        for(let i = 0; i < 2; i++) {
                let itemExpenses, cashExpenses;
            do {
                itemExpenses = prompt('Введите обязательную статью расходов?');
            } while (isString(itemExpenses))
             do {
                cashExpenses = prompt('Во сколько это обойдется?');
            } while (!isNumber(cashExpenses))
            appData.expenses[itemExpenses] = cashExpenses;
        }
    },

    getExpensesMonth: function() {
        for(let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
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
        } else{
            console.log(`Цель будет достигнута через ${appData.targetMonth} месяцев(-а)`);
        }
    },

    getInfoDeposit: function() {
        let persentDeposit, moneyDeposit;
        if(appData.deposit) {
            do {
                persentDeposit = prompt('Какой годовой процент');
            } while (!isNumber(persentDeposit))
            do {
                moneyDeposit = prompt('Какая сумма заложена?');
            } while (!isNumber(moneyDeposit))
        }
        appData.persentDeposit = persentDeposit;
        appData.moneyDeposit = moneyDeposit;
    },

    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    }
};
// appData.asking();
// appData.getExpensesMonth();
// appData.getBudget();
// appData.getTargetMonth();
// appData.getStatusIncome();

// console.log(appData.addExpenses);

// for(let key in appData.expenses) {
//     console.log(`Расход за месяц ${key} составляет ${appData.expenses[key]}`);
// }

// console.log('Сумма расходов за месяц ' + appData.expensesMonth);
// appData.displayNumOfMonth();

// for(let key in appData) {
//     console.log(`Наша программа включает в себя данные: ${key} : ${appData[key]}`);
// }



