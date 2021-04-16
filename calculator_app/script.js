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
    periodAmount = document.querySelector('.period-amount'),
    letterInputs = document.querySelectorAll('[placeholder="Наименование"]'),
    numbersInputs = document.querySelectorAll('[placeholder="Сумма"]'),
    allInputElems = document.querySelectorAll('[type="text"]'),
    depositCheckmark = depositCheck.querySelector('.deposit-checkmark');

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function(str) {
    return str === '' || str.trim() === '' || str === null || isNumber(str);
};
  
const AppData = function() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [],
    this.expensesMonth = 0;
    this.deposit = false,
    this.persentDeposit = 0;
    this.moneyDeposit = 0;
    this.targetMonth = 0;

}

AppData.prototype.start = function() {
    console.log(this);
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getBudget();
    this.getAddExpenses();
    this.getAddIncome();
    this.showResults();
};

AppData.prototype.calculate = function() {
    if(salaryAmount.value === '' || salaryAmount.value.trim() === '' || !isNumber(salaryAmount.value)) {
        alert('Ошибка, поле "Месячный доход" должно быть заполнено');
        return;
    }

    allInputElems.forEach(el => {
        el.setAttribute('disabled', true);
    })
 
    incomePlus.style.display = 'none';
    expensesPlus.style.display = 'none';

    calculateBtn.style.display = 'none';
    cancelBtn.style.display = 'block'

    depositCheck.setAttribute('disabled', true);
    range.setAttribute('disabled', true);
};

AppData.prototype.reset = function() {
    letterInputs.forEach(el => {
        el.value = el.defaultValue;
    });
    numbersInputs.forEach(el => {
        el.value = el.defaultValue;
    });
    allInputElems.forEach(el => {
        el.value = el.defaultValue;
    });
    additionalExpensesItem.value = additionalExpensesItem.defaultValue;
    appData.start();

    incomePlus.style.display = 'block';
    expensesPlus.style.display = 'block';

    calculateBtn.style.display = 'block';
    cancelBtn.style.display = 'none'

    allInputElems.forEach(el => {
        el.removeAttribute('disabled')
    })
    
    depositCheck.checked = false;
    range.value = range.defaultValue;
    periodAmount.textContent = '1';
    this.unshowResults();
};

AppData.prototype.showResults = function() {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    incomePeriodValue.value = this.calcSavedMoney();
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    range.addEventListener('input', () => {
        incomePeriodValue.value = _this.calcSavedMoney();
    });
};

AppData.prototype.unshowResults = function() {
    allInputElems.forEach(el => {
        el.setAttribute('disabled', true);
    })
    budgetMonthValue.value = budgetMonthValue.defaultValue;
    budgetDayValue.value = budgetDayValue.defaultValue;
    expensesMonthValue.value = '0';
    incomePeriodValue.value = incomePeriodValue.defaultValue;
    additionalExpensesValue.value = additionalExpensesValue.defaultValue;
    additionalIncomeValue.value = additionalIncomeValue.defaultValue;
    targetMonthValue.value = targetMonthValue.defaultValue;
};

AppData.prototype.getAddExpenses = function() {
    const _this = this;
    let addexpenses = additionalExpensesItem.value.split(',');
    addexpenses.forEach(function(item) {
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    })
};

AppData.prototype.getAddIncome = function() {
    const _this = this;
    additionalIncomeItems.forEach(function(item) {
        let itemValue = item.value.trim();
        if (item.value !== '') {
            _this.addIncome.push(itemValue);
        }
    })
};

AppData.prototype.addExpensesBlock =  function() {
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
    calculateBtn.addEventListener('click', () => {
            cloneExpensesItem.childNodes[1].setAttribute('disabled', true);
            cloneExpensesItem.childNodes[3].setAttribute('disabled', true);
    });
    cancelBtn.addEventListener('click', () => {
        cloneExpensesItem.childNodes[1].style.display = 'none';
        cloneExpensesItem.childNodes[3].style.display = 'none';
    })
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length == 3) {
        expensesPlus.style.display = 'none';
    }
    
};

AppData.prototype.addIncomeBlock = function() {
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
    });
    calculateBtn.addEventListener('click', () => {
            cloneIncomeItem.childNodes[1].setAttribute('disabled', true);
            cloneIncomeItem.childNodes[3].setAttribute('disabled', true);
    });
    cancelBtn.addEventListener('click', () => {
        cloneIncomeItem.childNodes[1].style.display = 'none';
        cloneIncomeItem.childNodes[3].style.display = 'none';
    })
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length == 3) {
        incomePlus.style.display = 'none';
    }
};

AppData.prototype.getExpenses = function() {
    const _this = this;
    expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = cashExpenses;
        }
    })
};

AppData.prototype.getIncome = function() {
        const _this = this;
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                _this.income[itemIncome] = cashIncome;
            }
        })

        for (let key in appData.income) {
            this.incomeMonth += +this.income[key];
        }
};

AppData.prototype.changePeriodAmount = function() {
    periodAmount.textContent = range.value;
};

AppData.prototype.getBudget = function() {
    appData.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    appData.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function getTargetMonth() {
    let result = Math.ceil(targetAmount.value / this.budgetMonth);
    result = (isNaN(result)) ? 'Срок' : result;
    return result;
};

AppData.prototype.getExpensesMonth = function() {
    for(let key in this.expenses) {
        this.expensesMonth += +appData.expenses[key];
    }
};

AppData.prototype.getStatusIncome = function() {
    if (this.budgetDay >= 1200) {
        return('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600) {
        return('У вас средний уровень дохода');
    } else if (this.budgetDay < 600 && appData.budgetDay >= 0) {
        return('К сожалению у вас уровень дохода ниже среднего');
    } else {
        return('Что-то пошло не так');
    }
};

AppData.prototype.displayNumOfMonth = function() {
    if (this.targetMonth < 0 || !isFinite(this.targetMonth) ) {
        console.log('Цель не будет достигнута');
    } else{
        console.log(`Цель будет достигнута через ${this.targetMonth} месяцев(-а)`);
    }
};

AppData.prototype.getInfoDeposit = function() {
    let persentDeposit, moneyDeposit;
    if(this.deposit) {
        do {
            persentDeposit = prompt('Какой годовой процент');
        } while (!isNumber(persentDeposit))
        do {
            moneyDeposit = prompt('Какая сумма заложена?');
        } while (!isNumber(moneyDeposit))
    }
    this.persentDeposit = persentDeposit;
    this.moneyDeposit = moneyDeposit;
};

AppData.prototype.calcSavedMoney = function() {
    let result = this.budgetMonth * range.value;
    result = (isNaN(result) || result < 0) ? 0 : result;
    return result;
};

AppData.prototype.validateNumberInputs = function() {
    numbersInputs.forEach(el => {
        el.value = el.value.replace(/[^\d]/g, '');
    })
};

AppData.prototype.validateLetterInputs = function() {
    letterInputs.forEach(el => {
        el.value = el.value.replace(/[^а-яА-Я]/, '');
    })
};

AppData.prototype.addListeners = function() {
    const _this = this;
    calculateBtn.addEventListener('click', appData.start.bind(appData));
    calculateBtn.addEventListener('click', appData.calculate);
    cancelBtn.addEventListener('click', appData.reset);
    expensesPlus.addEventListener('click', appData.addExpensesBlock);
    incomePlus.addEventListener('click', appData.addIncomeBlock);
    range.addEventListener('input', appData.changePeriodAmount);
    letterInputs.forEach(el => {
        el.addEventListener('input', appData.validateLetterInputs);
    })
    numbersInputs.forEach(el => {
        el.addEventListener('input', appData.validateNumberInputs);
    })
    additionalExpensesItem.addEventListener('input', function() {
        additionalExpensesItem.value = additionalExpensesItem.value.replace(/[^а-яА-Я\,\ ]/, '');
    })
};

const appData = new AppData();
appData.addListeners();
console.log(appData);

function bindFoo(foo) {
    foo = foo.bind(appData);
    return foo;
}
// let start = appData.start.bind(appData);



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