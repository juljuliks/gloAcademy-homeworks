// Решение 1

// let num = 266219,
//     numToString = num.toString(),
//     arr = numToString.split('');

// let resulp = arr.reduce(function(a, b) {
//      return a * b;
//  });

//  console.log(result);

// console.log(+result.toString().slice(0, 2));


// Решение 2
let num = 266219,
    numToString = num.toString(),
    arr = [],
    result = 1;

for(let i = 0; i < numToString.length; i++) {
    arr.push(numToString.charAt(i));
} 

arr.forEach(item => {
    result *= item;
})

console.log(result);

result **= 3;

console.log(+result.toString().slice(0, 2));


// Решение 3
// let num = 266219,
//     numToString = num.toString(),
//     arr = [],
//     result = 1;

// for(let i = 0; i < numToString.length; i++) {
//     arr.push(numToString.charAt(i));
// } 

// for(let i = 0; i < arr.length; i++) {
//     result *= arr[i];
// } 

// console.log(result);

// console.log(+result.toString().slice(0, 2));