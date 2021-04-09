import {Count, Duration, Rpd, Vector} from "./types"

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
