import {computeEdoBasePeriodDurations, computePuns, Edo, Max, Norm, Pun, Unpunniness} from "../puns"
import {DEFAULT_INITIAL_VECTOR, DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS} from "../puns/constants"
import {computeDurations} from "../puns/durations"
import {Periods} from "../puns/types"
import {components} from "./globals"
import {presentPuns} from "./output"

const handleChange = (): void => {
    const edo = parseInt(components.edoInput.value) as Edo
    const maxNorm = parseInt(components.maxNormInput.value) as Max<Norm>
    const maxUnpunniness = parseFloat(components.maxUnpunninessInput.value) as Max<Unpunniness>
    const periods = parseFloat(components.periodsInput.value) as Periods
    const isEt = components.etCheckbox.checked

    const basePeriodDurations = computeEdoBasePeriodDurations(edo)
    const durations = computeDurations(basePeriodDurations, periods)
    console.log(durations)
    const initialVector = isEt ? DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS : DEFAULT_INITIAL_VECTOR

    const puns = [] as Pun[]
    computePuns(puns, durations, initialVector, maxNorm, maxUnpunniness, edo)

    presentPuns(puns, durations)
}

export {
    handleChange,
}
