const fs = require('fs')

fs.readFile('/Users/lennysutrisno/Documents/GitHub/Coding-Practice/advent/day8_in1.txt', (err, data) => {
    if (err) throw err;

    inputString = data.toString();
    input = inputString.split("\n");

    console.log(input[1][0])
})


