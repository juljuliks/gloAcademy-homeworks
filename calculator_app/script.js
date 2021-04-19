'use strict';

const calculateBtn = document.getElementById('start'),
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
    expenses = document.querySelectorAll('.expenses-title')[1],
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    range = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    letterInputs = document.querySelectorAll('[placeholder="Наименование"]'),
    numbersInputs = document.querySelectorAll('[placeholder="Сумма"]'),
    allInputElems = document.querySelectorAll('[type="text"]'),
    depositCheckmark = depositCheck.querySelector('.deposit-checkmark');

let expensesItems = document.querySelectorAll('.expenses-items'),
incomeItems = document.querySelectorAll('.income-items');

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = function(str) {
    return str === '' || str.trim() === '' || str === null || isNumber(str);
};
  
class AppData {
    constructor(budget, budgetDay, budgetMonth, expensesMonth, persentDeposit, moneyDeposit, targetMonth, deposit = false, income, incomeMonth, addIncome, expenses, addExpenses) {
        this.budget = budget;
        this.budgetDay = budgetDay;
        this.budgetMonth = budgetMonth;
        this.income = income;
        this.incomeMonth = incomeMonth;
        this.addIncome = addIncome;
        this.expenses = expenses;
        this.addExpenses = addExpenses,
        this.expensesMonth = expensesMonth;
        this.deposit = deposit;
        this.persentDeposit = persentDeposit;
        this.moneyDeposit = moneyDeposit;
        this.targetMonth = targetMonth;
    }

    start = () => {
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getExpInc();
        this.getBudget();
        this.getAddExpenses();
        this.getAddIncome();
        this.showResults();
    }

    calculate = () => {
        if(salaryAmount.value === '' || salaryAmount.value.trim() === '' || !isNumber(salaryAmount.value)) {
            alert('Ошибка, поле "Месячный доход" должно быть заполнено');
            return;
        }
    
        allInputElems.forEach(el => {
            el.setAttribute('disabled', true);
        });
     
        incomePlus.style.display = 'none';
        expensesPlus.style.display = 'none';
    
        calculateBtn.style.display = 'none';
        cancelBtn.style.display = 'block'
    
        depositCheck.setAttribute('disabled', true);
        range.setAttribute('disabled', true);
    };

    reset = () => {
        console.log(this);
        letterInputs.forEach(el => {
            el.value = el.defaultValue;
        });
        numbersInputs.forEach(el => {
            el.value = el.defaultValue;
        });
        allInputElems.forEach(el => {
            el.value = el.defaultValue;
            el.removeAttribute('disabled');
        });
        additionalExpensesItem.value = additionalExpensesItem.defaultValue;
        
        incomePlus.style.display = 'block';
        expensesPlus.style.display = 'block';
    
        calculateBtn.style.display = 'block';
        cancelBtn.style.display = 'none';
        
        depositCheck.checked = false;
        range.value = range.defaultValue;
        periodAmount.textContent = '1';
        depositCheck.removeAttribute('disabled');
        range.removeAttribute('disabled');
        this.start().bind(this);
        this.unshowResults();
    };

    showResults = () => {
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
    };

    unshowResults = () => {
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

    getAddExpenses = () => {
        let addexpenses = additionalExpensesItem.value.split(',');
        addexpenses.forEach(item => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        })
    };

    getAddIncome = () => {
        additionalIncomeItems.forEach(item => {
            let itemValue = item.value.trim();
            if (item.value !== '') {
                this.addIncome.push(itemValue);
            }
        })
    };

    addExpensesBlock = () => {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.childNodes.forEach(el => {
            el.value = '';
            el.addEventListener('input', (event) => {
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

    addIncomeBlock = () => {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.childNodes.forEach(el => {
            el.value = '';
            el.addEventListener('input', (event) => {
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

    getExpenses = function() {
        expensesItems.forEach(item => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        })
    };

    getIncome = function() {
        incomeItems.forEach(item => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
            }
        })

        for (let key in appData.income) {
            this.incomeMonth += +this.income[key];
        } 
    };

    getExpInc = function() {
        const count = item => {
            const startStr = item.className.split('-')[0];
            console.log(startStr);
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = itemAmount;
            }
        }
        incomeItems.forEach(count);
        expensesItems.forEach(count);

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        } 
    }

    changePeriodAmount = () => {
        periodAmount.textContent = range.value;
    };

    getBudget = () => {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    };

    getTargetMonth = () => {
        let result = Math.ceil(targetAmount.value / this.budgetMonth);
        result = (isNaN(result)) ? 'Срок' : result;
        return result;
    };

    getExpensesMonth = () => {
        for(let key in this.expenses) {
            this.expensesMonth += +appData.expenses[key];
        }
    };

    getStatusIncome = () => {
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

    displayNumOfMonth = () => {
        if (this.targetMonth < 0 || !isFinite(this.targetMonth) ) {
            console.log('Цель не будет достигнута');
        } else{
            console.log(`Цель будет достигнута через ${this.targetMonth} месяцев(-а)`);
        }
    };

    getInfoDeposit = () => {
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

    calcSavedMoney = () => {
        let result = this.budgetMonth * range.value;
        result = (isNaN(result) || result < 0) ? 0 : result;
        return result;
    };

    validateNumberInputs = () => {
        numbersInputs.forEach(el => {
            el.value = el.value.replace(/[^\d]/g, '');
        })
    };
    
    validateLetterInputs = () => {
        letterInputs.forEach(el => {
            el.value = el.value.replace(/[^а-яА-Я]/, '');
        })
    };

    addListeners = () => {
        console.log(this);
        calculateBtn.addEventListener('click', this.start.bind(this));
        calculateBtn.addEventListener('click', this.calculate.bind(this));
        cancelBtn.addEventListener('click', this.reset.bind(this));
        expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
        incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
        range.addEventListener('input', this.changePeriodAmount);
        letterInputs.forEach(el => {
            el.addEventListener('input', this.validateLetterInputs);
        })
        numbersInputs.forEach(el => {
            el.addEventListener('input', this.validateNumberInputs);
        })
        additionalExpensesItem.addEventListener('input', () => {
            additionalExpensesItem.value = additionalExpensesItem.value.replace(/[^а-яА-Я\,\ ]/, '');
        })
    };
}

const appData = new AppData(0, 0, 0, 0, 0, 0, 0, false, {}, 0, [], {}, [])
appData.addListeners();

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