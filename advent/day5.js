const fs = require('fs')

const field1 = [[],
['Z', 'N'],
['M', 'C', 'D'],
['P']
]

const field = [[],
['G', 'T', 'R', 'W'],
['G', 'C', 'H', 'P', 'M', 'S', 'V', 'W'],
['C', 'L', 'T', 'S', 'G', 'M'],
['J', 'H', 'D', 'M', 'W', 'R', 'F'],
['P', 'Q', 'L', 'H', 'S', 'W', 'F', 'J'],
['P', 'J', 'D', 'N', 'F', 'M', 'S'],
['Z', 'B', 'D', 'F', 'G', 'C', 'S', 'J'],
['R', 'T', 'B'],
['H', 'N', 'W', 'L', 'C']
]

fs.readFile('/Users/lennysutrisno/Documents/GitHub/Coding-Practice/advent/day5_in.txt', (err, data) => {
    if (err) throw err;

    let inputString = data.toString();
    let inputA = inputString.split("\n\n");
    let inputB = inputA[1].split("\n");



    const input = [];

    for (let i = 0; i < inputB.length; i++) {
        input.push(inputB[i].split(' '))
    }

    // console.log('before', field1)

    const crane = field;

    input.forEach((ele) => {
        // console.log('1',ele)
        // console.log('1.1',crane[ele[3]])
        // console.log('2',crane[ele[3]].slice(crane[ele[3]].length - ele[1]))

        const toBeMoved = crane[ele[3]].slice(crane[ele[3]].length - ele[1]);
        crane[ele[3]].splice(crane[ele[3]].length - ele[1],Infinity)

        // console.log('ele5',crane[ele[5]])
        crane[ele[5]] = crane[ele[5]].concat(toBeMoved)

        // console.log('newcrane',crane)
        // console.log()
        // for (let i = 0; i < JSON.parse(ele[1]); i++) {
            //     crane[ele[5]].push(crane[ele[3]].pop())
            // }
        // crane[ele[5]].concat(crane[ele[3]].slice(crane[ele[3]].length - ele[1]))
        // for (let i = 0; i < JSON.parse(ele[1]); i++) {
        //     crane[ele[3]].pop()
        // }

    })

    // console.log('crna',crane)
    let output = ''
    for (let i = 1; i < crane.length; i++) {
        output += crane[i].pop()
    }
    console.log(output)
    // console.log('after',crane)
    // console.log(input)
})

// const months = ['Jan', 'March', 'April', 'June','may','oct'];
// console.log(months.splice(2))
