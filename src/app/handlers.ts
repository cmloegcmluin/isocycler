import {computeEdoBasePeriodDurations, Edo, Max, Norm, Rpd} from "../puns"
import {computeAllPuns} from "../puns/all"
import {DEFAULT_INITIAL_VECTOR, DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS} from "../puns/constants"
import {computeDurations} from "../puns/durations"
import {Periods} from "../puns/types"
import {components} from "./globals"
import {presentPuns} from "./output"

const handleChange = (): void => {
    const edo = parseInt(components.edoInput.value) as Edo
    const maxNorm = parseInt(components.maxNormInput.value) as Max<Norm>
    const maxRpd = parseFloat(components.maxRpdInput.value) / 100 as Max<Rpd>
    const periods = parseFloat(components.periodsInput.value) as Periods
    const isEt = parseFloat(components.etCheckbox.value) as Periods

    const basePeriodDurations = computeEdoBasePeriodDurations(edo)
    const durations = computeDurations(basePeriodDurations, periods)
    console.log(durations)
    const initialVector = isEt ? DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS : DEFAULT_INITIAL_VECTOR

    const puns = computeAllPuns(durations, initialVector, maxNorm, maxRpd)

    components.results.innerHTML = presentPuns(puns, durations)
}

export {
    handleChange,
}
