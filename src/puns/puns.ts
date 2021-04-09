import {computeError} from "./error"
import {invertVector} from "./invert"
import {computeUpperHalfNorm, computeLowerHalfNorm, computeNorm} from "./norm"
import {computeRpd} from "./rpd"
import {Count, Duration, Index, Max, Norm, Pun, Rpd, Vector} from "./types"

const isFirstNonzeroCountPositive = (vector: Vector): boolean => {
    for (const count of vector) {
        if (count < 0) return false
        if (count > 0) return true
    }
    return false
}

const vectorContainsNoPowersOfTwo = (vector: Vector): boolean => {
    for (const count of vector) {
        const absCount = Math.abs(count)
        if (absCount > 1 && Math.log2(absCount) % 1 === 0) {
            return false
        }
    }
    return true
}

const computeIncrementedVectorPuns = (
    puns: Pun[],
    vector: Vector,
    durations: Duration[],
    maxNorm: Max<Norm>,
    maxRpd: Max<Rpd>,
    index: Index,
    increment: number,
) => {
    const newVector = [...vector]
    for (let i = newVector.length; i <= index; i++) newVector[i] = 0 as Count
    newVector[index] = newVector[index] + increment as Count

    if (isFirstNonzeroCountPositive(newVector)) {
        computePuns(puns, newVector, durations, maxNorm, maxRpd, index)
    }
}

export const computePuns = (
    puns: Pun[],
    vector: Vector,
    durations: Duration[],
    maxNorm: Max<Norm>,
    maxRpd: Max<Rpd>,
    initialIndex: Index = 0 as Index,
): void => {
    const rpd = computeRpd(vector, durations)
    if (rpd < maxRpd && vectorContainsNoPowersOfTwo(vector)) {
        const error = computeError(vector, durations)

        const upperHalfNorm = computeUpperHalfNorm(vector)
        const lowerHalfNorm = computeLowerHalfNorm(vector)

        // If there are more notes in the upper half, then it overall has higher pitched notes
        // (Though there's no guarantee that the single lowest pitched note isn't amongst them)
        // And it's more natural to see the lower pitched notes in the lower half
        if (upperHalfNorm > lowerHalfNorm) {
            puns.push([vector, error, rpd])
        } else {
            puns.push([invertVector(vector), -error as Duration, rpd])
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
            computeIncrementedVectorPuns(puns, vector, durations, maxNorm, maxRpd, index, 1)
            computeIncrementedVectorPuns(puns, vector, durations, maxNorm, maxRpd, index, -1)
        } else if (count > 0) {
            // Continue adding upper half notes
            computeIncrementedVectorPuns(puns, vector, durations, maxNorm, maxRpd, index, 1)
        } else {
            // Continue adding lower half notes
            computeIncrementedVectorPuns(puns, vector, durations, maxNorm, maxRpd, index, -1)
        }
    }
}
