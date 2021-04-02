let money = 100000,
    income = 'Фриланс',
    addExpenses = 'Аренда квартиры, интернет, коммунальные платежи, питание, развлечения'
    deposit = true,
    mission = 500000,
    period = 12,
    budgetDay = 3333.33;

console.log(`Тип данных money - ${typeof(money)}, 
Тип данных income - ${typeof(income)},
Тип данных deposit - ${typeof(deposit)}`);  
console.log(`addExpenses lenght - ${addExpenses.length}`);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель разарботать ${mission} рублей`);
console.log((addExpenses.toLowerCase()).split(','));
console.log(budgetDay);
