import {Count, Duration, Rpd, Vector} from "./types"

const computeRpd = (vector: Vector, durations: Duration[]): Rpd => {
    const durationPositive = vector.reduce(
        (duration: Duration, count: Count, index: number) => {
            return count > 0 ? duration + count * durations[index] as Duration : duration
        },
        0 as Duration,
    )

    const durationNegative = -vector.reduce(
        (duration: Duration, count: Count, index: number) => {
            return count < 0 ? duration + count * durations[index] as Duration : duration
        },
        0 as Duration,
    )

    return 2 * Math.abs(durationPositive - durationNegative) / (durationPositive + durationNegative) as Rpd
}

export {
    computeRpd,
}
