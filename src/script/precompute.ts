import {computeEdoBasePeriodDurations, computePuns, Edo, Max, Norm, Pun, Unpunniness} from "../puns"
import {DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS} from "../puns/constants"
import {computeDurations} from "../puns/durations"
import {Periods} from "../puns/types"

const edo = 12 as Edo

var f = []

function factorial(n) {
    if (n == 0 || n == 1)
        return 1
    if (f[n] > 0)
        return f[n]
    return f[n] = factorial(n - 1) * n
}

// TODO: PUNS, ALL PUNS MODE PRECOMPUTING
//  I might have to do asynchronous population of them now, so it doesn’t block or crash and you can see it progress
//  Or precompute any anyone would ever want, and use controls to filter it; data might be big, but filtering is fast
//  What range, then? Let’s say 8 octaves b/c piano >7. The norm range then be 1 to 2^7, which is 128. That’s crazy huge
//  - Well except I just figured out that it would take over 4000 years to compute that the way this thing runs now
//  there has to be some better way to do this
//      because like... first of all, it doesn't even make sense to go past halfway for the first element
//  because you could never get back, even if you put everyrthing in the other direction for the second element
//  it's always smaller
//  so maybe there's other things like that you can eliminate
//  or maybe there's just a better way to search space completely
//  that uses the actual durations to help choose which direction to go
//  or maybe it wouldn't even need to know the actual durations, just that they are sorted...
//  but I'm thinking about this and it doesn't seem like there's a way to do it
//  like sure you can start imagining, you move by the big one, then you try to find the next one whose counteraction is closest
//  then you try to find the next one whose counteraction is closest to THAT remaining gap, etc.
//      but it starts to fall apart when you wonder about 2x, 3x etc of each step, how you would handle that...
//  So now I'm more just like trying to rationalize this, why you wouldn't really care about puns spanning more than 3 periods
//  Or with more than norm 8

// const maxNorm = 128 as Max<Norm>
const maxNorm = 7 as Max<Norm>
// const periods = 8 as Periods
const periods = 3 as Periods
const basePeriodDurations = computeEdoBasePeriodDurations(edo)
const durations = computeDurations(basePeriodDurations, periods)
// console.log(durations)
const initialVector = DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS
const maxUnpunniness = 1000 as Max<Unpunniness>

const n = durations.length
const r = maxNorm
const combinationsWithRepetition = factorial(n + r - 1) / (factorial(r) * factorial(n - 1))
console.log(combinationsWithRepetition)

const puns = [] as Pun[]
computePuns(puns, durations, initialVector, maxNorm, maxUnpunniness, edo)
