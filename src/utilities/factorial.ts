const factorial = (n: number, memo: number[] = []): number => {
    if (n == 0 || n == 1) return 1
    if (memo[n] > 0) return memo[n]

    return memo[n] = factorial(n - 1, memo) * n
}

export {
    factorial,
}
