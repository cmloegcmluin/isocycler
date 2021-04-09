import {UNPUNNINESS_CONSTANT} from "./constants"
import {Count, Duration, Unpunniness, Vector} from "./types"

const computeUnpunniness = (vector: Vector, durations: Duration[]): Unpunniness => {
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

    const minimumDuration = durations[vector.length - 1]

    return UNPUNNINESS_CONSTANT * Math.abs(durationUpperHalf - durationLowerHalf) / minimumDuration as Unpunniness
}

export {
    computeUnpunniness,
}
