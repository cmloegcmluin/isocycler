import {Duration, Edo} from "./types"

const computeEdoDurations = (edo: Edo = 12 as Edo): Duration[] => {
    const steps = [...Array(edo).keys()]
    const durations = steps.map(step => 2 ** -(step / edo) as Duration)
    console.log(durations)

    return durations
}

export {
    computeEdoDurations,
}
