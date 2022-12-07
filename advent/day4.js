const fs = require('fs')

fs.readFile('/Users/lennysutrisno/Documents/GitHub/Coding-Practice/advent/day4_in.txt', (err, data) => {
    if (err) throw err;

    inputString = data.toString();
    input = inputString.split("\n");

    for (let i = 0; i < input.length; i++) {
        input[i] = input[i].split(/[-,]+/)
    }
    // console.log(input)
    let sum = 0;
    input.forEach(ele => {
        let a = JSON.parse(ele[0]);
        let b = JSON.parse(ele[1]);
        let c = JSON.parse(ele[2]);
        let d = JSON.parse(ele[3]);

        // if ((a <= c && b >= d) || (c <= a && d >= b)) {
        //     sum += 1;
        // }

        if (c > b || a > d) {
            console.log(ele)
            sum += 1;
        }

        
    });
    
    console.log( input.length - sum)
    // console.log(sum)
})