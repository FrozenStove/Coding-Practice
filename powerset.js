/* Powerset

write a function that takes in an array of unique integers and returns its powerset.

The powerset P(X) of a set X is the set of all subset of X. For example, 
the powerset of [1,2] is [[], [1], [2], [1,2]].

Note that the sets in the powerset do not need to be in any particular order

SAMPLE INPUT

array = [1,2,3]

SAMPLE OUTPUT

[[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]


*/

// the solution below does not work for duplicate numbers.

function powerset(array) {
    // Write your code here.
    const output = [];

    //initialize the base condition
    const unparsedOutput = [];

    const helper = (input) => {
        // we will check if the output array already includes our current element, if it does then we return, else we add it into the array
        if (!unparsedOutput.includes(JSON.stringify(input))) {
            unparsedOutput.push(JSON.stringify(input))
        } else {
            return
        }
        for (let i = 0; i < input.length; i++) {
            let splicedArray = [...input]
            splicedArray.splice(i,1)
            // console.log(splicedArray)
            helper(splicedArray);
        }
    }
    helper(array)

    // we will parse through our JSON array, and convert them back into a proper array
    unparsedOutput.forEach((Element) => { output.push(JSON.parse(Element)) })

    // we will return the output array after sorting through it.
    return output.sort((a, b)=>{
        if(a.length > b.length) return -1
    })
}



console.log(powerset([1, 2, 3]))
// console.log(powerset(a))