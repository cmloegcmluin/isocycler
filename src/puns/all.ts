import {DEFAULT_MAX_NORM, DEFAULT_MAX_UNPUNNINESS} from "../app/constants"
import {DEFAULT_INITIAL_VECTOR} from "./constants"
import {computePuns} from "./puns"
import {Duration, Max, Norm, Pun, Unpunniness, Vector} from "./types"

const computeAllPuns = (
    durations: Duration[],
    initialVector: Vector = DEFAULT_INITIAL_VECTOR,
    maxNorm: Max<Norm> = DEFAULT_MAX_NORM,
    maxUnpunniness: Max<Unpunniness> = DEFAULT_MAX_UNPUNNINESS,
): Pun[] => {
    const puns = [] as Pun[]

    computePuns(puns, initialVector, durations, maxNorm, maxUnpunniness)

    return puns
}

export {
    computeAllPuns,
}
