const fs = require('fs')

let input = [];
let inputString;


fs.readFile('/Users/lennysutrisno/Documents/GitHub/Coding-Practice/advent/day1_in1.txt', (err, data) => {
    if (err) throw err;

    inputString = data.toString();
    input = inputString.split("\n");

    console.log('11', input)

})
