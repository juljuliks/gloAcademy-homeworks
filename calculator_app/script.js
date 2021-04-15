'use strict';

let calculateBtn = document.getElementById('start'),
    cancelBtn = document.querySelector('#cancel'),
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
    numbersInputs = document.querySelectorAll('[placeholder="Сумма"]'),
    allInputElems = document.querySelectorAll('[type="text"]');

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
    calculateClicked: false,
    cancelClicked: false,

    start: function() {
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getBudget();
        this.getAddExpenses();
        this.getAddIncome();
        this.showResults();
    },

    reset: function() {
        appData.cancelClicked = true;
        letterInputs.forEach(el => {
            el.value = el.defaultValue;
        });
        numbersInputs.forEach(el => {
            el.value = el.defaultValue;
        });
        additionalExpensesItem.value = additionalExpensesItem.defaultValue;
        appData.start();

        calculateBtn.style.display = 'block';
        cancelBtn.style.display = 'none'

        allInputElems.forEach(el => {
            el.removeAttribute('disabled')
        })

        appData.start();
        
    },

    calculate: function(event) {
        appData.calculateClicked = true;
        if(salaryAmount.value === '' || salaryAmount.value.trim() === '' || !isNumber(salaryAmount.value)) {
            alert('Ошибка, поле "Месячный доход" должно быть заполнено');
            return;
        }

        allInputElems.forEach(el => {
            el.setAttribute('disabled', true);
        })

        calculateBtn.style.display = 'none';
        cancelBtn.style.display = 'block'
    },

    showResults: function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        incomePeriodValue.value = this.calcSavedMoney();
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        
        range.addEventListener('input', () => {
            incomePeriodValue.value = this.calcSavedMoney();
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
        expensesItems.forEach(el => {
            el.addEventListener('input', (event) => {
                console.log(event.target);
                if (appData.calculateClicked) {
                    event.target.setAttribute('disabled', true)
                }
            });
        });
        if (expensesItems.length == 3) {
            expensesPlus.style.display = 'none';
        }
        
    },

    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.childNodes.forEach(el => {
            el.value = '';
            el.addEventListener('input', function(event) {
                if (event.target.getAttribute('placeholder') === 'Наименование') {
                    el.value = el.value.replace(/[^а-яА-Я]/, '');
                } else if (event.target.getAttribute('placeholder') === 'Сумма') {
                    el.value = el.value.replace(/[^\d]/g, '');
                }
            });
            el.addEventListener('input', function(event) {
                console.log(event.target);
                if (appData.calculateClicked) {
                    event.target.setAttribute('disabled', true)
                }
            })
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
            this.incomeMonth += +this.income[key];
        }
    },

    changePeriodAmount: function() {
        let periodAmount = document.querySelector('.period-amount');
        periodAmount.textContent = range.value;
    },

    getBudget: function() {
        appData.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        appData.budgetDay = Math.floor(this.budgetMonth / 30);
    },

    getTargetMonth: function getTargetMonth() {
        let result = Math.ceil(targetAmount.value / this.budgetMonth);
        result = (isNaN(result)) ? 'Срок' : result;
        return result;
    },

    getExpensesMonth: function() {
        for(let key in this.expenses) {
            this.expensesMonth += +appData.expenses[key];
        }
    },

    getStatusIncome: function() {
        if (this.budgetDay >= 1200) {
            return('У вас высокий уровень дохода');
        } else if (this.budgetDay >= 600) {
            return('У вас средний уровень дохода');
        } else if (this.budgetDay < 600 && appData.budgetDay >= 0) {
            return('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return('Что-то пошло не так');
        }
    },

    displayNumOfMonth: function() {
        if (this.targetMonth < 0 || !isFinite(this.targetMonth) ) {
            console.log('Цель не будет достигнута');
        } else{
            console.log(`Цель будет достигнута через ${this.targetMonth} месяцев(-а)`);
        }
    },

    getInfoDeposit: function() {
        let persentDeposit, moneyDeposit;
        if(this.deposit) {
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
        let result = this.budgetMonth * range.value;
        result = (isNaN(result)) ? 0 : result;
        return result;
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

let bindFoo = function(foo) {
    foo = foo.bind(appData);
    return foo;
}
// let start = appData.start.bind(appData);
calculateBtn.addEventListener('click', bindFoo(appData.start));
cancelBtn.addEventListener('click', appData.reset);
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