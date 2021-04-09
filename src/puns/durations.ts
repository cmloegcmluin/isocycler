import {Duration, Periods} from "./types"

const computeDurations = (basePeriodDurations: Duration[], periods: Periods): Duration[] => {
    let durations = [...basePeriodDurations]
    for (let index = 1; index < periods; index++) {
        const periodDurations = basePeriodDurations.map(duration => duration * 2 ** -index) as Duration[]
        durations = [...durations, ...periodDurations]
    }
    return durations
}

export {
    computeDurations,
}
