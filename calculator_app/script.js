'use strict';

const calculateBtn = document.getElementById('start'),
    cancelBtn = document.querySelector('#cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    plusBtnSecond = document.querySelectorAll('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
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
    additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
    additionalExpensesItem = document.querySelectorAll('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    range = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    letterInputs = document.querySelectorAll('[placeholder="Наименование"]'),
    numbersInputs = document.querySelectorAll('[placeholder="Сумма"]'),
    allInputElems = document.querySelectorAll('[type="text"]'),
    depositCheckmark = depositCheck.querySelector('.deposit-checkmark'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');

let storageData = [];

if(localStorage.getItem('budgetMonthValue')) {
    budgetMonthValue.value = localStorage.getItem('budgetMonthValue');
    budgetDayValue.value = localStorage.getItem('budgetDayValue');
    expensesMonthValue.value = localStorage.getItem('expensesMonthValue');
    incomePeriodValue.value = localStorage.getItem('incomePeriodValue');
    additionalIncomeValue.value = localStorage.getItem('additionalIncomeValue');
    additionalExpensesValue.value = localStorage.getItem('additionalExpensesValue');
    targetMonthValue.value = localStorage.getItem('targetMonthValue');
}

const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = function (str) {
    return str === '' || str.trim() === '' || str === null || isNumber(str);
};

class AppData {
    constructor() {
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [],
        this.expensesMonth = 0;
        this.deposit = false;
        this.persentDeposit = 0;
        this.moneyDeposit = 0;
        this.targetMonth = 0;
    }

    start() {
        this.budget = +salaryAmount.value;
        this.getExpInc();
        this.getInfoDeposit();
        this.getBudget();
        this.getAddExpInc(additionalIncomeItems);
        this.getAddExpInc(additionalExpensesItem);
        this.showResults();
        this.addToStorage();
        this.setCookie();
    }

    calculate() {
        if (salaryAmount.value === '' || salaryAmount.value.trim() === '' || !isNumber(salaryAmount.value)) {
            alert('Ошибка, поле "Месячный доход" должно быть заполнено');
            return;
        } else if (depositPercent.value < 0 || depositPercent.value > 100) {
            alert('Введите корректное значение в поле проценты');
            return;
        }

        allInputElems.forEach(el => {
            el.readOnly = true;
        });

        incomePlus.style.display = 'none';
        expensesPlus.style.display = 'none';

        calculateBtn.style.display = 'none';
        cancelBtn.style.display = 'block'

        depositCheck.setAttribute('disabled', true);
        range.setAttribute('disabled', true);
    };

    reset() {
        allInputElems.forEach(el => {
            el.value = el.defaultValue;
            el.readOnly = false;
        });
        additionalExpensesItem[0].value = additionalExpensesItem[0].defaultValue;

        depositBank.style.display = 'none';
        incomePlus.style.display = 'block';
        expensesPlus.style.display = 'block';

        calculateBtn.style.display = 'block';
        cancelBtn.style.display = 'none';

        depositCheck.checked = false;
        range.value = range.defaultValue;
        periodAmount.textContent = '1';

        depositCheck.removeAttribute('disabled');
        range.removeAttribute('disabled');
        this.start();
        this.clearResults();
        localStorage.clear();
    };

    showResults() {
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

    setCookie() {
        const createCookie = (key, value, path, domain, secure) => {
            let cookieStr = key + '=' + value;
            const date = new Date(2022, 0, 1);
            cookieStr += '; expires=' + date.toGMTString();
    
            cookieStr += path ? '; path=' + path : '';
            cookieStr += domain ? '; domain=' + domain : '';
            cookieStr += secure ? ';secure' : '';
    
            document.cookie = cookieStr;
        };
        createCookie('budgetMonthValue', this.budgetMonth);
        createCookie('budgetDayValue', this.budgetDay);
        createCookie('expensesMonthValue', this.expensesMonth);
        createCookie('incomePeriodValue', this.calcSavedMoney());
        createCookie('additionalExpensesValue', this.addExpenses.join(', '));
        createCookie('additionalIncomeValue', this.addIncome.join(', '));
        createCookie('targetMonthValue', this.getTargetMonth());
        createCookie('isLoad', true);
    };

    addToStorage() {
        const pushToStorageArr = (currentInput, name) => {
            const newData = {
                value: currentInput.value
            }
    
            if (currentInput.value) {
                storageData.push(newData);
            }
    
            localStorage.setItem(name, newData.value);
        };
        pushToStorageArr(budgetMonthValue, 'budgetMonthValue');
        pushToStorageArr(budgetDayValue, 'budgetDayValue');
        pushToStorageArr(expensesMonthValue, 'expensesMonthValue');
        pushToStorageArr(incomePeriodValue, 'incomePeriodValue');
        pushToStorageArr(additionalIncomeValue, 'additionalIncomeValue');
        pushToStorageArr(additionalExpensesValue, 'additionalExpensesValue');
        pushToStorageArr(targetMonthValue, 'targetMonthValue');
    };


    clearResults() {
        budgetMonthValue.value = budgetMonthValue.defaultValue;
        budgetDayValue.value = budgetDayValue.defaultValue;
        expensesMonthValue.value = expensesMonthValue.defaultValue;
        incomePeriodValue.value = incomePeriodValue.defaultValue;
        additionalExpensesValue.value = additionalExpensesValue.defaultValue;
        additionalIncomeValue.value = additionalIncomeValue.defaultValue;
        targetMonthValue.value = targetMonthValue.defaultValue;
    };

    getAddExpInc = (items) => {
        items.forEach(el => {
            if (items.length > 1) {
                let itemValue = el.value.trim();
                if (el.value !== '') {
                    this.addIncome.push(itemValue);
                }
            } else {
                let itemValue = items[0].value.split(',');
                itemValue.forEach(item => {
                    item = item.trim();
                    if (el.value !== '') {
                        this.addExpenses.push(item);
                    }
                })
            }
        })
    };

    addExpIncBlock = (items, btn) => {
        let className = items[0].className;
        let cloneItem = items[0].cloneNode(true);
        cloneItem.childNodes.forEach(el => {
            el.value = '';
            el.addEventListener('input', function (event) {
                if (event.target.getAttribute('placeholder') === 'Наименование') {
                    el.value = el.value.replace(/[^а-яА-Я]/, '');
                } else if (event.target.getAttribute('placeholder') === 'Сумма') {
                    el.value = el.value.replace(/[^\d]/g, '');
                }
            });
        });
        calculateBtn.addEventListener('click', () => {
            cloneItem.childNodes[1].readOnly = true;
            cloneItem.childNodes[3].readOnly = true;
        });
        cancelBtn.addEventListener('click', () => {
            cloneItem.childNodes[1].style.display = 'none';
            cloneItem.childNodes[3].style.display = 'none';
        })
        items[0].parentNode.insertBefore(cloneItem, btn);
        items = document.querySelectorAll(`.${className}`);
        if (items.length == 3) {
            btn.style.display = 'none';
        }
    };


    getExpInc() {
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = itemAmount;
            }
        }

        incomeItems = document.querySelectorAll('.income-items');
        expensesItems = document.querySelectorAll('.expenses-items');
        incomeItems.forEach(count);
        expensesItems.forEach(count);

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }

        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }

    changePeriodAmount() {
        periodAmount.textContent = range.value;
    };

    getBudget = () => {
        const monthDeposit = this.moneyDeposit * (this.persentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    };

    getTargetMonth() {
        let result = Math.ceil(targetAmount.value / this.budgetMonth);
        result = (isNaN(result)) ? 'Срок' : result;
        return result;
    };


    getStatusIncome() {
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay >= 600) {
            return ('У вас средний уровень дохода');
        } else if (this.budgetDay < 600 && appData.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return ('Что-то пошло не так');
        }
    };

    displayNumOfMonth() {
        if (this.targetMonth < 0 || !isFinite(this.targetMonth)) {
            console.log('Цель не будет достигнута');
        } else {
            console.log(`Цель будет достигнута через ${this.targetMonth} месяцев(-а)`);
        }
    };

    getInfoDeposit() {
        if (this.deposit) {
            this.persentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    };

    calcSavedMoney() {
        let result = this.budgetMonth * range.value;
        result = (isNaN(result) || result < 0) ? 0 : result;
        return result;
    };

    validateNumberInputs() {
        numbersInputs.forEach(el => {
            el.value = el.value.replace(/[^\d]/g, '');
        })
    };

    validateLetterInputs() {
        letterInputs.forEach(el => {
            el.value = el.value.replace(/[^а-яА-Я]/, '');
        })
    };

    changePersent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
            depositPercent.value = '';
        } else {
            depositPercent.style.display = 'none';
            depositPercent.value = valueSelect;
        }
    };

    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePersent)
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePersent)
        }
    }

    addListeners = () => {
        calculateBtn.addEventListener('click', this.start.bind(this));
        calculateBtn.addEventListener('click', this.calculate.bind(this));
        cancelBtn.addEventListener('click', this.reset.bind(this));
        expensesPlus.addEventListener('click', () => {
            this.addExpIncBlock(expensesItems, expensesPlus);
        });
        incomePlus.addEventListener('click', () => {
            this.addExpIncBlock(incomeItems, incomePlus);
        });
        range.addEventListener('input', this.changePeriodAmount);
        letterInputs.forEach(el => {
            el.addEventListener('input', this.validateLetterInputs);
        })
        numbersInputs.forEach(el => {
            el.addEventListener('input', this.validateNumberInputs);
        })
        additionalExpensesItem[0].addEventListener('input', () => {
            additionalExpensesItem[0].value = additionalExpensesItem[0].value.replace(/[^а-яА-Я\,\ ]/, '');
        })

        depositCheck.addEventListener('change', this.depositHandler.bind(this))
    };
};

const appData = new AppData()
appData.addListeners();

function bindFoo(foo) {
    foo = foo.bind(appData);
    return foo;
}
