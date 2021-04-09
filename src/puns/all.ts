import {DEFAULT_INITIAL_VECTOR} from "./constants"
import {computePuns} from "./puns"
import {Duration, Max, Norm, Pun, Rpd} from "./types"

const computeAllPuns = (
    durations: Duration[],
    maxNorm: Max<Norm> = 5 as Max<Norm>,
    maxRpd: Max<Rpd> = 0.001 as Max<Rpd>,
) => {
    const puns = [] as Pun[]

    computePuns(puns, DEFAULT_INITIAL_VECTOR, durations, maxNorm, maxRpd)

    return puns
}

export {
    computeAllPuns,
}
