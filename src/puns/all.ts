import {DEFAULT_MAX_NORM, DEFAULT_MAX_RPD} from "../app/constants"
import {DEFAULT_INITIAL_VECTOR} from "./constants"
import {computePuns} from "./puns"
import {Duration, Max, Norm, Pun, Rpd, Vector} from "./types"

const computeAllPuns = (
    durations: Duration[],
    initialVector: Vector = DEFAULT_INITIAL_VECTOR,
    maxNorm: Max<Norm> = DEFAULT_MAX_NORM,
    maxRpd: Max<Rpd> = DEFAULT_MAX_RPD,
): Pun[] => {
    const puns = [] as Pun[]

    computePuns(puns, initialVector, durations, maxNorm, maxRpd)

    return puns
}

export {
    computeAllPuns,
}
