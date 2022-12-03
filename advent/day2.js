const fs = require('fs')

let input = [];
let inputString;

const points = {
    X: 0, // loss
    Y: 3, // tie
    Z: 6, // win
    A: 1,
    B: 2,
    C: 3,
    win: 6,
    tie: 3,
    loss: 0,
}

let result = 0;

fs.readFile('/Users/lennysutrisno/Documents/GitHub/Coding-Practice/advent/day2_in.txt', (err, data) => {
    if (err) throw err;

    inputString = data.toString();
    input = inputString.split("\n");

    // console.log(input)

    input.forEach((ele) => {
        // console.log('results',points[ele[2]], points[rps2(ele[0], ele[2])])


        // result += points[ele[2]] + points[rps(ele[0], ele[2])]
        result += points[ele[2]] + points[rps2(ele[0], ele[2])]
    })

    console.log(result)


// console.log(input[0])
})

const rps = function (a, b) {
    if (
        (b === 'X' && a === 'C') ||
        (b === 'Y' && a === 'A') ||
        (b === 'Z' && a === 'B')
        ) {
        return 'win'
    } else if (
        (a === 'A' && b === 'Z') ||
        (a === 'B' && b === 'X') ||
        (a === 'C' && b === 'Y')
        ) {
        return 'loss'
    } else {
        return 'tie'
    }
}

const rps2 = function (a,b) {
    if ( b === 'X') { // loss
        if (a === 'A') return 'C'
        if (a === 'B') return 'A'
        if (a === 'C') return 'B'
    } else if ( b === 'Y') { // tie
        return a
    } else { // win
        if (a === 'A') return 'B'
        if (a === 'B') return 'C'
        if (a === 'C') return 'A'
    }
}

// console.log('1',rps2('A','Y'))
// console.log(rps2('B','X'))
// console.log(rps2('C','Z'))