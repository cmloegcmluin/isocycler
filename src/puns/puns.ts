import {computeError} from "./error"
import {invertVector} from "./invert"
import {computeNorm} from "./norm"
import {computeRpd} from "./rpd"
import {Duration, Count, Index, Max, Norm, Pun, Rpd, Vector} from "./types"

const isFirstNonzeroCountPositive = (vector: Vector): boolean => {
    for (const count of vector) {
        if (count < 0) return false
        if (count > 0) return true
    }
    return false
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
) => {
    const rpd = computeRpd(vector, durations)
    if (rpd < maxRpd) {
        const error = computeError(vector, durations)
        if (error > 0) {
            puns.push([vector, error, rpd])
        } else {
            puns.push([invertVector(vector), -error as Duration, rpd])
        }
    }

    let norm = computeNorm(vector)
    if (norm === maxNorm) {
        return
    }

    for (let index = initialIndex; index < vector.length; index++) {
        if (vector[index] === 0) {
            // Kick it off in both directions
            computeIncrementedVectorPuns(puns, vector, durations, maxNorm, maxRpd, index, 1)
            computeIncrementedVectorPuns(puns, vector, durations, maxNorm, maxRpd, index, -1)
        } else if (vector[index] > 0) {
            // Continue in positive direction
            computeIncrementedVectorPuns(puns, vector, durations, maxNorm, maxRpd, index, 1)
        } else {
            // Continue in negative direction
            computeIncrementedVectorPuns(puns, vector, durations, maxNorm, maxRpd, index, -1)
        }
    }
}
