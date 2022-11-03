const isPrime = (n) => {
    if (n <= 1) return

    const A = new Array(n).fill(true);
    A[0] = false;
    A[1] = false;
    
    const output = [];
    let x = 0;
    for ( let i = 2; i < Math.sqrt(n); i++){
        if (A[i]) {
            let j = 0;
            for ( let count = 0; j < n; count++){
                j = i**2 + (count * i);
                // console.log(j)
                A[j] = false;
                x++;
            }
        }
    }
    console.log(x)

    A.forEach((element, index) => {
        if(element){
            output.push(index)
        }
    })

    return output
}
// https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes

console.log(isPrime(1000))