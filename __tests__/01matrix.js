const {updateMatrixFast} = require('../practice/01matrix.js')

describe('01 Matrix', () => {
    test('it should work', () => {
        mat = [[0,0,0],[0,1,0],[0,0,0]]
        output = [[0,0,0],[0,1,0],[0,0,0]]
        const input = updateMatrixFast(mat)
        // const output = 
        expect(input).toEqual(output)
    });
    test('it should work', () => {
        mat = [[0,0,0],[0,1,0],[1,1,1]]
        output = [[0,0,0],[0,1,0],[1,2,1]]
        const input = updateMatrixFast(mat)
        // const output = 
        expect(input).toEqual(output)
    });



})