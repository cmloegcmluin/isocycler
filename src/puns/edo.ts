import { isocyclicDuration } from "./isocyclic"
import {Duration, Edo, Pitch} from "./types"

const computeEdoDurations = (edo: Edo = 12 as Edo): Duration[] => {
    const steps = [...Array(edo).keys()]

    return steps.map(step => {
        const pitch = step / edo as Pitch

        return isocyclicDuration(pitch)
    })
}

export {
    computeEdoDurations,
}
