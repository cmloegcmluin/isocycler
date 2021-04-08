import {computePuns} from "./puns"
import {Count, Duration, Max, Norm, Pun, Rpd} from "./types"

const computeAllPuns = (durations: Duration[], maxNorm: Max<Norm> = 5 as Max<Norm>, maxRpd: Max<Rpd> = 0.001 as Max<Rpd>) => {
    const puns = [] as Pun[]
    const initialVector = durations.map(_ => 0 as Count)

    computePuns(puns, initialVector, durations, maxNorm, maxRpd)

    return puns
}

export {
    computeAllPuns,
}
