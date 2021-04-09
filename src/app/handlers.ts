import {computeEdoDurations, Edo, Max, Norm, Rpd} from "../puns"
import {computeAllPuns} from "../puns/all"
import {Duration, RepRange} from "../puns/types"
import {components} from "./globals"
import {presentPuns} from "./output"

const handleChange = (): void => {
    const edo = parseInt(components.edoInput.value) as Edo
    const maxNorm = parseInt(components.maxNormInput.value) as Max<Norm>
    const maxRpd = parseFloat(components.maxRpdInput.value) / 100 as Max<Rpd>
    const repetitionRange = parseFloat(components.repetitionRangeInput.value) as RepRange

    const originalDurations = computeEdoDurations(edo)
    let durations = [...originalDurations]
    for (let index = 1; index < repetitionRange; index++) {
        const reducedDurations = originalDurations.map(duration => duration * 2 ** -index) as Duration[]
        durations = [...durations, ...reducedDurations]
    }
    console.log(durations)
    // return

    const puns = computeAllPuns(durations, maxNorm, maxRpd, repetitionRange)

    components.results.innerHTML = presentPuns(puns, durations)
}

export {
    handleChange,
}
