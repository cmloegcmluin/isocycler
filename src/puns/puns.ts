import {computeError} from "./error"
import {invertVector} from "./invert"
import {computeUpperHalfNorm, computeLowerHalfNorm, computeNorm} from "./norm"
import {computeRpd} from "./rpd"
import {Count, Duration, Index, Max, Norm, Pun, RepRange, Rpd, Vector} from "./types"

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
    repetitionsRange: RepRange,
    index: Index,
    increment: number,
) => {
    // TODO: this might not be the most performant way to clone the array while filling with zeroes and incrementing end
    const newVector = new Array(index + 1).fill(0)
    vector.forEach((count, index) => newVector[index] = count)
    newVector[index] = newVector[index] + increment as Count

    if (isFirstNonzeroCountPositive(newVector)) {
        computePuns(puns, newVector, durations, maxNorm, maxRpd, repetitionsRange, index)
    }
}

export const computePuns = (
    puns: Pun[],
    vector: Vector,
    durations: Duration[],
    maxNorm: Max<Norm>,
    maxRpd: Max<Rpd>,
    repetitionsRange: RepRange,
    initialIndex: Index = 0 as Index,
) => {
    const rpd = computeRpd(vector, durations)
    if (rpd < maxRpd && vectorContainsNoPowersOfTwo(vector)) { // TODO: maybe more performant to switch order of checks?
        const error = computeError(vector, durations)

        // TODO: Perhaps I should just rename norm to note count? But how would that play with Count type of Vector els?
        const higherHalfNoteCount = computeUpperHalfNorm(vector)
        const lowerHalfNoteCount = computeLowerHalfNorm(vector)

        if (higherHalfNoteCount > lowerHalfNoteCount) {
            puns.push([vector, error, rpd])
        } else {
            puns.push([invertVector(vector), -error as Duration, rpd])
        }
    }

    let norm = computeNorm(vector)
    if (norm === maxNorm) {
        return
    }

    // TODO: maybe don't calc this every time? can do it once up front?
    const maxDimension = durations.length * repetitionsRange

    for (let index = initialIndex; index < maxDimension; index++) {
        if (vector[index] === 0 || vector[index] === undefined) {
            // Kick it off in both directions
            computeIncrementedVectorPuns(puns, vector, durations, maxNorm, maxRpd, repetitionsRange, index, 1)
            computeIncrementedVectorPuns(puns, vector, durations, maxNorm, maxRpd, repetitionsRange, index, -1)
        } else if (vector[index] > 0 /*&& vector[0] !== 0*/) {
            // Continue in positive direction
            computeIncrementedVectorPuns(puns, vector, durations, maxNorm, maxRpd, repetitionsRange, index, 1)
        } else if (vector[index] < 0 /*&& vector[0] !== 0*/) {
            // Continue in negative direction
            computeIncrementedVectorPuns(puns, vector, durations, maxNorm, maxRpd, repetitionsRange, index, -1)
        }
    }
}
