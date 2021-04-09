import {Count, Duration, Vector} from "./types"

const computeError = (vector: Vector, durations: Duration[]): Duration => {
    return vector.reduce(
        (error: Duration, count: Count, index: number) => {
            return error + count * durations[index] as Duration
        },
        0 as Duration,
    )
}

export {
    computeError,
}
