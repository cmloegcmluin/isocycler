import {Duration, Pitch} from "./types"

const isocyclicPitch = (duration: Duration): Pitch => Math.log2(1 / duration) as Pitch

const isocyclicDuration = (pitch: Pitch): Duration => 2 ** -pitch as Duration

export {
    isocyclicPitch,
    isocyclicDuration,
}
