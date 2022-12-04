const fs = require('fs')

fs.readFile('/Users/lennysutrisno/Documents/GitHub/Coding-Practice/advent/day3_in.txt', (err, data) => {
    if (err) throw err;

    inputString = data.toString();
    input = inputString.split("\n");

    let sum = 0;
    input.forEach(ele => {
        const midIndex = ele.length / 2;
        const cache = {};
        // console.log(ele)
        for ( let i = 0; i < midIndex; i++) {
            if (!cache[ele[i]]){
                cache[ele[i]] = 1;
            }
        }
        for ( let i = midIndex; i < ele.length; i++) {
            if (cache[ele[i]]){
                sum += str2num(ele[i])
                break
            }
        }
    });
    console.log(sum)
})

const str2num = function (input) {
    let result = input.charCodeAt(0) - 96
    if (result < 0) {
        result+= 31 + 27
    }
    return result
}

// console.log(str2num('Z'))