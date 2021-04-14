import {Duration, Edo, Vector} from "./types"

const vectorCanBeNormReducedTransposingHigher = (vector: Vector, edo: Edo, durations: Duration[]): boolean => {
    let allUpperNotesArePowersOfTwo = true
    let allLowerNotesArePowersOfTwo = true

    for (const count of vector) {
        if (count === 1 || count > 1 && Math.log2(count) % 1 !== 0) {
            allUpperNotesArePowersOfTwo = false
        } else if (count === -1 || -count > 1 && Math.log2(-count) % 1 !== 0) {
            allLowerNotesArePowersOfTwo = false
        }

        if (!allUpperNotesArePowersOfTwo && !allLowerNotesArePowersOfTwo) return false
    }

    if (allUpperNotesArePowersOfTwo) {
        for (let index = vector.length - 1; index >= 0; index--) {
            if (vector[index] < 0) {
                return index + edo < durations.length
            }
        }
    } else if (allLowerNotesArePowersOfTwo) {
        for (let index = vector.length - 1; index >= 0; index--) {
            if (vector[index] > 0) {
                return index + edo < durations.length
            }
        }
    }

    return false
}

export {
    vectorCanBeNormReducedTransposingHigher,
}
