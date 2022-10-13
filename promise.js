// const timeout = () => {
//     console.log('timeout')
// }

// console.log('start')

// setTimeout(timeout,0)

// Promise.resolve('promise')
// .then(res => console.log(res))

// console.log('end')


const one = () => Promise.resolve('one')

async function two() {
    console.log('start of 2')
    const res = await one()
    console.log(res)
}

console.log('start')
two()
console.log('end')

