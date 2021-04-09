import {computePuns} from "./puns"
import {Duration, Max, Norm, Pun, RepRange, Rpd, Vector} from "./types"

const computeAllPuns = (durations: Duration[], maxNorm: Max<Norm> = 5 as Max<Norm>, maxRpd: Max<Rpd> = 0.001 as Max<Rpd>, repetitionsRange: RepRange = 1 as RepRange) => {
    const puns = [] as Pun[]
    // TODO: add linter, but not the deprecated TS one
    const initialVector = [1] as Vector

    computePuns(puns, initialVector, durations, maxNorm, maxRpd, repetitionsRange)

    return puns
}

export {
    computeAllPuns,
}
