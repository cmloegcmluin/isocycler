import {Count, Duration, Rpd, Vector} from "./types"

// TODO: Maybe I should measure error relative to the min, not the average...
//  Because if there’s a really small square in the thing that’s what matters most, right?
//  Wait but I mean, not even the min out of the two halves, upper and lower
//  But actually the min out of all the durations which comprise them!
//  Yes I think that would be better
//  But then it's not Rpd at all anymore
//  It's... proportion of the absolute difference between halves to the minimum note = POTADBHTTMN
//  Or: Proportion of the Halves' Absolute Difference to the minimum note = PHADMN
//  Or: Halves' Absolute Difference Over Minimum Note = HADOMN
//  Or: Difference (Absolute) / Minimum Note = DAMN ADMN
//  Minimum Note Under Absolute Difference = MNUD
const computeRpd = (vector: Vector, durations: Duration[]): Rpd => {
    const durationUpperHalf = vector.reduce(
        (duration: Duration, count: Count, index: number) => {
            return count > 0 ? duration + count * durations[index] as Duration : duration
        },
        0 as Duration,
    )

    const durationLowerHalf = -vector.reduce(
        (duration: Duration, count: Count, index: number) => {
            return count < 0 ? duration + count * durations[index] as Duration : duration
        },
        0 as Duration,
    )

    return 2 * Math.abs(durationUpperHalf - durationLowerHalf) / (durationUpperHalf + durationLowerHalf) as Rpd
}

export {
    computeRpd,
}
