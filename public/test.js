// const fib = (n, a = 0, b = 1) => n === 0 ? b + a : fib(n - 1, b, a + b)
// function fib(n, arr = [0, 1]) {
//     // immutable
//     const newArr = [...arr, arr.slice(-2).reduce((a,b) => a+b)]
//     return n === 0 ? newArr : fib(n - 1, newArr)

//     // mutable
//     // arr.push(arr.slice(-2).reduce((a,b) => a+b))
//     // return n === 0 ? arr : fib(n - 1, arr)
// }
let n = 7
function perimeter(n) {
    if (n === 0) return 4
    function fib(n, arr = [0, 1]) {
        const newArr = [...arr, arr.slice(-2).reduce((a, b) => a + b)]
        return n === 0 ? newArr : fib(n - 1, newArr)
    }
    return fib(n - 1).reduce((a, b) => a + b) * 4
}
console.log(perimeter(0));

// API Nest/Express
// SSR (React + Nextjs + TS)