import {guiState} from "../app/globals"
import {vectorCanBeNormReducedTransposingHigher} from "./canBeNormReducedTransposingHigher"
import {vectorCanBeNormReducedWithoutTransposing} from "./canBeNormReducedWithoutTransposing"
import {vectorContainsNotesRelatedByPeriod} from "./containsNoNotesRelatedByPeriod"
import {vectorCanBeNormReducedTransposingLower} from "./canBeNormReducedTransposingLower"
import {computeError} from "./error"
import {punGlobals} from "./globals"
import {invertVector} from "./invert"
import {computeLowerHalfNorm, computeNorm, computeUpperHalfNorm} from "./norm"
import {Count, Duration, Index, Pun, Vector} from "./types"
import {computeUnpunniness} from "./unpunniness"

const isFirstNonzeroCountNegative = (vector: Vector): boolean => {
    for (const count of vector) {
        if (count < 0) return true
        if (count > 0) return false
    }
    return false
}

const computeIncrementedVectorPuns = (
    vector: Vector,
    previousError: Duration,
    index: Index,
    increment: number,
) => {
    const newVector = [...vector]
    for (let i = newVector.length; i <= index; i++) newVector[i] = 0 as Count
    newVector[index] = newVector[index] + increment as Count

    if (isFirstNonzeroCountNegative(newVector)) {
        computePuns(newVector, previousError, index, increment)
    }
}

// let checked = 0
export const computePuns = (
    vector: Vector,
    previousError: Duration = 0 as Duration,
    initialIndex: Index = 0 as Index,
    increment: number = 0,
): void => {
    const {puns, durations} = punGlobals
    const {edo, maxNorm, maxUnpunniness} = guiState

    // checked++
    // if (checked % 1000000 === 0) console.log(checked)

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

        // if (vector.toString() === "-1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,-2") {
        //     console.log("made it")
        //     console.log("&& unpunniness < maxUnpunniness", unpunniness < maxUnpunniness)
        //     console.log("&& !vectorContainsNotesRelatedByPeriod(vector, edo)", !vectorContainsNotesRelatedByPeriod(vector, edo))
        //     console.log("&& !vectorCanBeNormReducedTransposingLower(vector, edo)", !vectorCanBeNormReducedTransposingLower(vector, edo))
        //     console.log("&& !vectorCanBeNormReducedWithoutTransposing(vector)", !vectorCanBeNormReducedWithoutTransposing(vector))
        //     console.log("&& !vectorCanBeNormReducedTransposingHigher(vector, edo, durations)", !vectorCanBeNormReducedTransposingHigher(vector, edo, durations))
        // }

        if (
            unpunniness < maxUnpunniness
            && !vectorContainsNotesRelatedByPeriod(vector, edo)
            && !vectorCanBeNormReducedTransposingLower(vector, edo)
            && !vectorCanBeNormReducedWithoutTransposing(vector)
            && !vectorCanBeNormReducedTransposingHigher(vector, edo, durations)
        ) {
            let pun: Pun
            // If there are more notes in the upper half, then it overall has higher pitched notes
            // (Though there's no guarantee that the single lowest pitched note isn't amongst them)
            // And it's more natural to see the lower pitched notes in the lower half
            if (computeUpperHalfNorm(vector) > computeLowerHalfNorm(vector)) {
                pun = [vector, error, unpunniness]
            } else {
                pun = [invertVector(vector), -error as Duration, unpunniness]
            }
            puns.push(pun)
            // console.log(pun)
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
            computeIncrementedVectorPuns(vector, error, index, 1)
            computeIncrementedVectorPuns(vector, error, index, -1)
        } else if (count > 0) {
            // Continue adding upper half notes
            computeIncrementedVectorPuns(vector, error, index, 1)
        } else {
            // Continue adding lower half notes
            computeIncrementedVectorPuns(vector, error, index, -1)
        }
    }
}
