import {DEFAULT_EDO, DEFAULT_MAX_NORM, DEFAULT_MAX_UNPUNNINESS} from "../app/constants"
import {vectorCanBeNormReduced} from "./canBeNormReduced"
import {vectorCanBeReduced} from "./canBeReduced"
import {DEFAULT_INITIAL_VECTOR} from "./constants"
import {vectorContainsNoNotesRelatedByPeriod} from "./containsNoNotesRelatedByPeriod"
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
    previousError: Duration,
    index: Index,
    increment: number,
) => {
    const newVector = [...vector]
    for (let i = newVector.length; i <= index; i++) newVector[i] = 0 as Count
    newVector[index] = newVector[index] + increment as Count

    if (isFirstNonzeroCountPositive(newVector)) {
        computePuns(puns, durations, newVector, maxNorm, maxUnpunniness, edo, previousError, index, increment)
    }
}

export const computePuns = (
    puns: Pun[],
    durations: Duration[],
    vector: Vector = DEFAULT_INITIAL_VECTOR,
    maxNorm: Max<Norm> = DEFAULT_MAX_NORM,
    maxUnpunniness: Max<Unpunniness> = DEFAULT_MAX_UNPUNNINESS,
    edo: Edo = DEFAULT_EDO,
    previousError: Duration = 0 as Duration,
    initialIndex: Index = 0 as Index,
    increment: number = 0,
): void => {
    let error = previousError
    // Don't worry about checking these intermediate steps for puns.
    // If the error is already negative and we're decrementing, this one's not going to be a pun.
    // Not until we turn around. So spare yourself from making the unpunniness or error etc. computations in here
    if (
        !(previousError < 0 && increment < 0)
        && !(previousError > 0 && increment > 0)
    ) {
        const unpunniness = computeUnpunniness(vector, durations)
        error = computeError(vector, durations)

        if (
            unpunniness < maxUnpunniness
            && vectorContainsNoNotesRelatedByPeriod(vector, edo)
            && !vectorCanBeNormReduced(vector, edo, durations)
            && !vectorCanBeReduced(vector)
        ) {
            // If there are more notes in the upper half, then it overall has higher pitched notes
            // (Though there's no guarantee that the single lowest pitched note isn't amongst them)
            // And it's more natural to see the lower pitched notes in the lower half
            if (computeUpperHalfNorm(vector) > computeLowerHalfNorm(vector)) {
                puns.push([vector, error, unpunniness])
            } else {
                puns.push([invertVector(vector), -error as Duration, unpunniness])
            }
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
            computeIncrementedVectorPuns(puns, durations, vector, maxNorm, maxUnpunniness, edo, error, index, 1)
            computeIncrementedVectorPuns(puns, durations, vector, maxNorm, maxUnpunniness, edo, error, index, -1)
        } else if (count > 0) {
            // Continue adding upper half notes
            computeIncrementedVectorPuns(puns, durations, vector, maxNorm, maxUnpunniness, edo, error, index, 1)
        } else {
            // Continue adding lower half notes
            computeIncrementedVectorPuns(puns, durations, vector, maxNorm, maxUnpunniness, edo, error, index, -1)
        }
    }
}
