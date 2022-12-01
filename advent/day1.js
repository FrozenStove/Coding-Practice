const fs = require('fs')

let input = [];
let inputString;

const elfArray = [];

fs.readFile('/Users/lennysutrisno/Documents/GitHub/Coding-Practice/advent/day1_in.txt', (err, data) => {
    if (err) throw err;

    inputString = data.toString();
    input = inputString.split("\n");

    console.log(input)

    let food = [];
    let sum = 0;

    let maxSum = 0;
    const sumArray = [];

    input.forEach((ele, i) => {
        if (ele === ''){
            const elf = {
                food: food,
                sum: sum
            }
            elfArray.push(elf);
            if (sum > maxSum) {
                maxSum = sum;
            }
            sumArray.push(sum)
            sum = 0;
            food = [];
        } else {
            let num = JSON.parse(ele);
            sum += num
            food.push(num)
        }

        if (i === input.length - 1 ) {
            const elf = {
                food: food,
                sum: sum
            }
            elfArray.push(elf)
        }
    })

    // console.log(elfArray)
    sumArray.sort()


    console.log(maxSum)
    console.log(68923+67023+64098)

})

