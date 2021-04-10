import {DEFAULT_EDO, DEFAULT_MAX_NORM, DEFAULT_MAX_UNPUNNINESS} from "../app/constants"
import {DEFAULT_INITIAL_VECTOR} from "./constants"
import {vectorContainsNoNotesRelatedByPeriod} from "./containsNoNotesRelatedByPeriod"
import {vectorContainsNoPowersOfTwo} from "./containsNoPowersOfTwo"
import {computeError} from "./error"
import {invertVector} from "./invert"
import {computeLowerHalfNorm, computeNorm, computeUpperHalfNorm} from "./norm"
import {Count, Duration, Edo, Index, Max, Norm, Pun, Unpunniness, Vector} from "./types"
import {computeUnpunniness} from "./unpunniness"

const isFirstNonzeroCountPositive = (vector: Vector): boolean => {
    for (const count of vector) {
        if (count < 0) return false
        if (count > 0) return true
    }
    return false
}

const computeIncrementedVectorPuns = (
    puns: Pun[],
    durations: Duration[],
    vector: Vector,
    maxNorm: Max<Norm>,
    maxUnpunniness: Max<Unpunniness>,
    edo: Edo,
    index: Index,
    increment: number,
) => {
    const newVector = [...vector]
    for (let i = newVector.length; i <= index; i++) newVector[i] = 0 as Count
    newVector[index] = newVector[index] + increment as Count

    if (isFirstNonzeroCountPositive(newVector)) {
        computePuns(puns, durations, newVector, maxNorm, maxUnpunniness, edo, index)
    }
}

export const computePuns = (
    puns: Pun[],
    durations: Duration[],
    vector: Vector = DEFAULT_INITIAL_VECTOR,
    maxNorm: Max<Norm> = DEFAULT_MAX_NORM,
    maxUnpunniness: Max<Unpunniness> = DEFAULT_MAX_UNPUNNINESS,
    edo: Edo = DEFAULT_EDO,
    initialIndex: Index = 0 as Index,
): void => {
    const unpunniness = computeUnpunniness(vector, durations)
    if (
        unpunniness < maxUnpunniness
        && vectorContainsNoPowersOfTwo(vector)
        && vectorContainsNoNotesRelatedByPeriod(vector, edo)
    ) {
        const error = computeError(vector, durations)

        // If there are more notes in the upper half, then it overall has higher pitched notes
        // (Though there's no guarantee that the single lowest pitched note isn't amongst them)
        // And it's more natural to see the lower pitched notes in the lower half
        if (computeUpperHalfNorm(vector) > computeLowerHalfNorm(vector)) {
            puns.push([vector, error, unpunniness])
        } else {
            puns.push([invertVector(vector), -error as Duration, unpunniness])
        }
    }

    const norm = computeNorm(vector)
    if (norm === maxNorm) {
        return
    }

    for (let index = initialIndex; index < durations.length; index++) {
        const count = vector[index]
        if (count === undefined) {
            // Kick it off in both directions
            computeIncrementedVectorPuns(puns, durations, vector, maxNorm, maxUnpunniness, edo, index, 1)
            computeIncrementedVectorPuns(puns, durations, vector, maxNorm, maxUnpunniness, edo, index, -1)
        } else if (count > 0) {
            // Continue adding upper half notes
            computeIncrementedVectorPuns(puns, durations, vector, maxNorm, maxUnpunniness, edo, index, 1)
        } else {
            // Continue adding lower half notes
            computeIncrementedVectorPuns(puns, durations, vector, maxNorm, maxUnpunniness, edo, index, -1)
        }
    }
}
