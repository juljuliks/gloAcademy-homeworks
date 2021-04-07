// Задание 1
let arr = [24547, 3569, 4789, 213300, 8756, 40956, 407, 1254, 437];

arr.forEach(item => {
    if (item.toString()[0] === '2' || item.toString()[0] === '4') {
        console.log(item);
    }
})

// Задание 2 решение с помощью меток
let num = 100;

getNextNumber:
for(let i = 1; i <= num; i++) {
    if (i === 1) continue;
   
    for(let n = 1; n < i; n++) {
        if (i % n === 0) continue getNextNumber;
    }

    console.log(`Делители числа ${i}: 1 и ${i}`);
}

// Решение с помощью функции и цикла
function isPrime(num) {
    for (let i = 1; i < num; i++) {
        if (i === 1) continue;
        if(num % i == 0) return false;
    }
    return true;
}

for(let i = 1; i < 100; i++) {
    if (i === 1) continue;
    if(isPrime(i)) console.log(`Делители числа ${i}: 1 и ${i}`)
}