const fs = require('fs')

class Directory {
    constructor () {
        this.cd = [];
    }

    currentDirectory() {

    } 

    add() {

    }

}

class File {
    constructor(){
        // this.size:
    }
}

const data = {
    '/': {
        a:{},
        'b.txt':14,
        'c.dat':85,
    }
}

const thePath = new Directory()

console.log(thePath.cd)

fs.readFile('/Users/lennysutrisno/Documents/GitHub/Coding-Practice/advent/day6_in.txt', (err, data) => {
    if (err) throw err;

    let inputString = data.toString();
    let input = inputString.split("\n");

    // let

})
