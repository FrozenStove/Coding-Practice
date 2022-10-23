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


    const helper = (mat, x, y, distance = 0) => {

        if (cache.has(x + ',' + y) || mat[x] === undefined || mat[x][y] === undefined) {
            return Infinity
            // I ran into errors because i was adding in 0 elements into the cache
            // there is another error where the shortest possible path to a zero is added into the cache too early
        } else if(mat[x][y] !== 0){
            cache.add(x + ',' + y)
        }

        // base case
        if (mat[x][y] === 0) return distance
        
        const subarry = [
            helper(mat, x, y + 1, distance + 1),
            helper(mat, x, y - 1, distance + 1),
            helper(mat, x - 1, y, distance + 1),
            helper(mat, x + 1, y, distance + 1),
        ]

        return Math.min(...subarry);
    }

    for (let m = 0; m < mat.length; m++) {
        for (let n = 0; n < mat[0].length; n++) {
            if (mat[m][n] !== 0) {
                cache = new Set();
                output[m][n] = helper(mat, m, n)
            }
        }
    }
    return output
};
// Input: mat = [[1, 1, 1], [1, 1, 0], [1, 1, 0]]

mat = [[1,0,1,1,0,0,1,0,0,1],[0,1,1,0,1,0,1,0,1,1],[0,0,1,0,1,0,0,1,0,0],[1,0,1,0,1,1,1,1,1,1],[0,1,0,1,1,0,0,0,0,1],[0,0,1,0,1,1,1,0,1,0],[0,1,0,1,0,1,0,0,1,1],[1,0,0,0,1,1,1,1,0,1],[1,1,1,1,1,1,1,0,1,0],[1,1,1,1,0,1,0,0,1,1]]

console.table(updateMatrix(mat))
// console.log(mat[1][0])
// console.log(mat[2][0])

console.table([[1,0,1,1,0,0,1,0,0,1],[0,1,1,0,1,0,1,0,1,1],[0,0,1,0,1,0,0,1,0,0],[1,0,1,0,1,1,1,1,1,1],[0,1,0,1,1,0,0,0,0,1],[0,0,1,0,1,1,1,0,1,0],[0,1,0,1,0,1,0,0,1,1],[1,0,0,0,1,2,1,1,0,1],[2,1,1,1,1,2,1,0,1,0],[3,2,2,1,0,1,0,0,1,1]])
let m
let n = 6
// console.log('[',m+','+n,']')

// console.log(Math.min(... [1,2,4,6,Infinity]))