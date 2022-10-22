/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    // if (!Array.isArray(nums)) return new Error('Invalid input')
    // iterate through the array, constantly summing up the array.
    // after each element we will check to see if we should restart the continuous subarray block by checking if the current element is greater than the current sum

    //initialize the current sum
    let currentSum = -Infinity;
    const currSumArray = [];

    for (const element of nums) {
        if (element > currentSum + element) {
            // console.log(element, currentSum)
            currentSum = element;
        } else {
            currentSum += element;
        }
        currSumArray.push(currentSum)
        // console.log(currentSum)
    }
    return Math.max(... currSumArray)
}
nums = [1,2];
console.log(maxSubArray(nums));


    //     const maxVal = {
    //         array:[],
    //         maxSum: -Infinity,
    //     };

    //     const cache = {};

    //     const helper = (input)=> {
    //         if (input.length === 0) {
    //             return
    //         }
    //         const inputString = JSON.stringify(input)

    //         if (cache[inputString]){
    //             return
    //         }

    //         const inputCopy = [...input];

    //         const sumArray = input.reduce((prev, current) => prev + current, 0)

    //         if (sumArray > maxVal.maxSum){
    //             maxVal.maxSum = sumArray;
    //             maxVal.array = [...input];
    //         }

    //         cache[inputString] = sumArray;

    //         helper(inputCopy.slice(1))
    //         helper(inputCopy.slice(0,-1))
    //     }

    //     helper(nums)

    //     return maxVal.maxSum



