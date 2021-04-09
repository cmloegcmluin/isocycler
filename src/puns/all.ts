import {DEFAULT_EDO, DEFAULT_MAX_NORM, DEFAULT_MAX_UNPUNNINESS} from "../app/constants"
import {DEFAULT_INITIAL_VECTOR} from "./constants"
import {computePuns} from "./puns"
import {Duration, Max, Norm, Pun, Unpunniness, Vector} from "./types"

// TODO: CODE CLEANLINESS: I DO NOT REALLY UNDERSTAND WHY THIS EVEN EXISTS
//  Consolidate it and its test
const computeAllPuns = (
    durations: Duration[],
    initialVector: Vector = DEFAULT_INITIAL_VECTOR,
    maxNorm: Max<Norm> = DEFAULT_MAX_NORM,
    maxUnpunniness: Max<Unpunniness> = DEFAULT_MAX_UNPUNNINESS,
    edo = DEFAULT_EDO,
): Pun[] => {
    const puns = [] as Pun[]

    computePuns(puns, initialVector, durations, maxNorm, maxUnpunniness, edo)

    return puns
}

export {
    computeAllPuns,
}
