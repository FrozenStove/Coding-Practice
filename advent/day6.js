const fs = require('fs')

fs.readFile('/Users/lennysutrisno/Documents/GitHub/Coding-Practice/advent/day6_in.txt', (err, data) => {
    if (err) throw err;

    // inputString = data.toString();
    // input = inputString.split("\n");
    let input = data.toString()
    // let input = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb';
    // let input = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'

    const marker = 14;
    let count = marker;

    for (let i = marker; i < input.length; i++) {
        let subString = input.slice(i - marker, i);

        if (!duplicates(subString.split(''))) {
            console.log(subString)
            // console.log(2)
            console.log(count)
            break
        }
        count++

    }
})

function duplicates(arr) {
    return new Set(arr).size !== arr.length
}