/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {

    // we will iterate through each element of the entire array
    // if the element is a 0, we will place a 0 at the same location in the output array
    // if the element is a 1:
    // we will need to recursively call on a helper function to find out the shortest distance to a 0
    // start by creating the output array
    const output = [];
    for (const element of mat) output.push(Array(mat[0].length).fill(0));

    let cache;
    // let flag = 0;


    const helper = (mat, x, y, currentPath = [], distance = 0) => {

        if (currentPath.includes(x + ',' + y) || mat[x] === undefined || mat[x][y] === undefined) {
            return Infinity
            // I ran into errors because i was adding in 0 elements into the cache
            // there is another error where the shortest possible path to a zero is added into the cache too early
            // solution is fixed by passing in an array representing the current path as the cache
            // the array is different for each path
        } else if (mat[x][y] !== 0) {
            currentPath.push(x + ',' + y)
        }

        // base case
        if (mat[x][y] === 0) {
            cache.pop()
            return distance
        }

        const subarray = [
            helper(mat, x, y + 1, [...currentPath], distance + 1,),
            helper(mat, x, y - 1, [...currentPath], distance + 1,),
            helper(mat, x - 1, y, [...currentPath], distance + 1,),
            helper(mat, x + 1, y, [...currentPath], distance + 1,),
        ]

        return Math.min(...subarray);
    }

    for (let m = 0; m < mat.length; m++) {
        for (let n = 0; n < mat[0].length; n++) {
            if (mat[m][n] !== 0) {
                cache = [];
                output[m][n] = helper(mat, m, n, cache)
            }
        }
    }
    return output
};

// the previous method was overly complicated and not efficient due to the recursion
// the solution below is much more efficient than above by just calcuating the distance to each zero from each one
// still achieves an approximate O(n^2) time

var updateMatrixFast = function (mat) {

    const output = [];
    const zeroArray = [];
    const oneArray = [];
    for (const element of mat) output.push(Array(mat[0].length).fill(0));

    for (let m = 0; m < mat.length; m++) {
        for (let n = 0; n < mat[0].length; n++) {
            if (mat[m][n] !== 0) {
                oneArray.push([m, n]);
            } else {
                zeroArray.push([m, n]);
            }
        }
    }

    for (let one of oneArray) {
        let minDist = Infinity
        for ( let zero of zeroArray){
            let currDist = Math.abs(one[0] - zero[0]) + Math.abs(one[1] - zero[1])
            minDist = currDist < minDist ? currDist:minDist
        }
        output[one[0]][one[1]] = minDist;
    }
    return output
};

// Input: mat = [[1, 1, 1], [1, 1, 0], [1, 1, 0]]

// mat = [[1,0,1,1,0,0,1,0,0,1],[0,1,1,0,1,0,1,0,1,1],[0,0,1,0,1,0,0,1,0,0],[1,0,1,0,1,1,1,1,1,1],[0,1,0,1,1,0,0,0,0,1],[0,0,1,0,1,1,1,0,1,0],[0,1,0,1,0,1,0,0,1,1],[1,0,0,0,1,1,1,1,0,1],[1,1,1,1,1,1,1,0,1,0],[1,1,1,1,0,1,0,0,1,1]]

mat = [[0, 0, 1, 0, 1, 1, 1, 0, 1, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 0, 0, 1, 1], [1, 0, 1, 0, 1, 1, 1, 0, 1, 1], [0, 0, 1, 1, 1, 0, 1, 1, 1, 1], [1, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 1, 0, 1, 0, 1], [0, 1, 0, 0, 0, 1, 0, 0, 1, 1], [1, 1, 1, 0, 1, 1, 0, 1, 0, 1], [1, 0, 1, 1, 1, 0, 1, 1, 1, 0]]
// console.table(mat)
console.time('start')
// console.table(updateMatrix(mat))
console.table(updateMatrixFast(mat))
console.timeEnd('start')
// console.log(mat[1][0])
// console.log(mat[2][0])

// console.table([[1,0,1,1,0,0,1,0,0,1],[0,1,1,0,1,0,1,0,1,1],[0,0,1,0,1,0,0,1,0,0],[1,0,1,0,1,1,1,1,1,1],[0,1,0,1,1,0,0,0,0,1],[0,0,1,0,1,1,1,0,1,0],[0,1,0,1,0,1,0,0,1,1],[1,0,0,0,1,2,1,1,0,1],[2,1,1,1,1,2,1,0,1,0],[3,2,2,1,0,1,0,0,1,1]])
let m
let n = 6
// console.log('[',m+','+n,']')

// console.log(Math.min(... [1,2,4,6,Infinity]))