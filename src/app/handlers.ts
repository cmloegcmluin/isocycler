import {computeEdoBasePeriodDurations, Edo, Max, Norm, Rpd} from "../puns"
import {computeAllPuns} from "../puns/all"
import {computeDurations} from "../puns/durations"
import {Periods} from "../puns/types"
import {components} from "./globals"
import {presentPuns} from "./output"

const handleChange = (): void => {
    const edo = parseInt(components.edoInput.value) as Edo
    const maxNorm = parseInt(components.maxNormInput.value) as Max<Norm>
    const maxRpd = parseFloat(components.maxRpdInput.value) / 100 as Max<Rpd>
    const periods = parseFloat(components.periodsInput.value) as Periods

    const basePeriodDurations = computeEdoBasePeriodDurations(edo)
    const durations = computeDurations(basePeriodDurations, periods)
    console.log(durations)

    const puns = computeAllPuns(durations, maxNorm, maxRpd)

    components.results.innerHTML = presentPuns(puns, durations)
}

export {
    handleChange,
}
