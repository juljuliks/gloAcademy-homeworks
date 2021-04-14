'use strict';

let calculateBtn = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    plusBtnSecond = document.querySelectorAll('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('result-total budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('result-total budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('result-total expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('result-total additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('result-total additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('result-total income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('result-total target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    income = document.querySelectorAll('.income-title')[1],
    incomeItems = document.querySelectorAll('.income-items'),
    expenses = document.querySelectorAll('.expenses-title')[1],
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    range = document.querySelector('.period-select'),
    letterInputs = document.querySelectorAll('[placeholder="Наименование"]'),
    numbersInputs = document.querySelectorAll('[placeholder="Сумма"]');

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function(str) {
    return str === '' || str.trim() === '' || str === null || isNumber(str);
};
    
let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    expensesMonth: 0,
    deposit: false,
    persentDeposit: 0,
    moneyDeposit: 0,
    targetMonth: 0,

    start: function() {
        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();

        appData.getExpensesMonth();
        appData.getBudget();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.showResults();
    },

    calculate: function(event) {
        if(salaryAmount.value === '' || salaryAmount.value.trim() === '' || !isNumber(salaryAmount.value)) {
            alert('Ошибка, поле "Месячный доход" должно быть заполнено');
            return;
        }
    },

    showResults: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        incomePeriodValue.value = appData.calcSavedMoney();
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        
        range.addEventListener('input', () => {
            incomePeriodValue.value = appData.calcSavedMoney();
        });
    },

    getAddExpenses: function() {
        let addexpenses = additionalExpensesItem.value.split(',');
        addexpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        })
    },

    getAddIncome: function() {
        additionalIncomeItems.forEach(function(item) {
            let itemValue = item.value.trim();
            if (item.value !== '') {
                appData.addIncome.push(itemValue);
            }
        })
    },

    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.childNodes.forEach(el => {
            el.value = '';
            el.addEventListener('input', function(event) {
                if (event.target.getAttribute('placeholder') === 'Наименование') {
                    el.value = el.value.replace(/[^а-яА-Я]/, '');
                } else if (event.target.getAttribute('placeholder') === 'Сумма') {
                    el.value = el.value.replace(/[^\d]/g, '');
                }
            });
        });
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length == 3) {
            expensesPlus.style.display = 'none';
        }
    },

    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        console.log(cloneIncomeItem.childNodes);
        cloneIncomeItem.childNodes.forEach(el => {
            el.value = '';
            el.addEventListener('input', function(event) {
                if (event.target.getAttribute('placeholder') === 'Наименование') {
                    el.value = el.value.replace(/[^а-яА-Я]/, '');
                } else if (event.target.getAttribute('placeholder') === 'Сумма') {
                    el.value = el.value.replace(/[^\d]/g, '');
                }
            });
        });
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length == 3) {
            incomePlus.style.display = 'none';
        }
    },
    
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        })
    },

    getIncome: function() {
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }

        })

        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },

    changePeriodAmount: function() {
        let periodAmount = document.querySelector('.period-amount');
        periodAmount.textContent = range.value;
        appData.period = +range.value;
    },

    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    getTargetMonth: function getTargetMonth() {
        return Math.ceil(targetAmount.value / appData.budgetMonth);
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
    },

    validateNumberInputs: function() {
        numbersInputs.forEach(el => {
            el.value = el.value.replace(/[^\d]/g, '');
        })
    },

    validateLetterInputs: function() {
        letterInputs.forEach(el => {
            el.value = el.value.replace(/[^а-яА-Я]/, '');
        })
    }
};

calculateBtn.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
range.addEventListener('input', appData.changePeriodAmount);
calculateBtn.addEventListener('click', appData.calculate);
letterInputs.forEach(el => {
    el.addEventListener('input', appData.validateLetterInputs);
})
numbersInputs.forEach(el => {
    el.addEventListener('input', appData.validateNumberInputs);
})
additionalExpensesItem.addEventListener('input', function() {
    additionalExpensesItem.value = additionalExpensesItem.value.replace(/[^а-яА-Я\,\ ]/, '');
})

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