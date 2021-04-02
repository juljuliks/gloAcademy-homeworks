// Решение 1 c помощью циклов for

let num = 266219,
    numToString = num.toString(),
    arr = [],
    result = 1;

for(let i = 0; i < numToString.length; i++) {
    arr.push(numToString.charAt(i));
} 

for(let i = 0; i < arr.length; i++) {
    result *= arr[i];
} 

console.log(result);

result **= 3;

console.log(+result.toString().slice(0, 2));


// Решение 2 с помощью split() и forEach 

// let num = 266219,
//     arr = num.toString().split(''),
//     result = 1;

// arr.forEach(item => {
//     result *= item;
// })

// console.log(result);

// result **= 3;

// console.log(+result.toString().slice(0, 2));


// Решение 3 с помощью split() и reduse()

// let num = 266219,
//     arr = num.toString().split('');

// let result = arr.reduce(function(a, b) {
//      return a * b;
//  });

//  console.log(result);

// console.log(+result.toString().slice(0, 2));

