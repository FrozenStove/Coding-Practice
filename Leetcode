// Leetcode practice quokka

/**
 * @param {number} n
 * @return {boolean}
 */

 var isHappy = function(num, count = 1) {
    if (num < 1 || num > 2**31) return "number is out of range"
    // convert the number into a string    
    const strnum = num.toString();
    const numArray = [];
    // assemble the string into an array, and convert them back into numbers
    for ( let i = 0; i < strnum.length; i++) {
        numArray.push(JSON.parse(strnum[i]));
    }
    // with the array of digits we will create a collector variable to collect the sum of squares of each array element
    let collector = 0;
    
    for (let i = 0; i < numArray.length; i++) {
        collector += numArray[i]**2;
    }
    if (collector === 1) {
        return true;
    } else if( count > 1000) {
        return false
    } else { 
        count++
        return isHappy(collector, count);
    }
    // check if the collector is 1, if not, then invoke the function again.

    // if the number is 1, then return true, else return false

    // 
    //
    
};


console.log(isHappy(145254))


// Input: n = 19
// Output: true
// Explanation:
// 12 + 92 = 82
// 82 + 22 = 68
// 62 + 82 = 100
// 12 + 02 + 02 = 1