import {computeEdoBasePeriodDurations, computePuns, Edo, Max, Norm, Unpunniness} from "../puns"
import {DEFAULT_INITIAL_VECTOR, DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS} from "../puns/constants"
import {computeDurations} from "../puns/durations"
import {punGlobals} from "../puns/globals"
import {Periods} from "../puns/types"
import {components, guiState} from "./globals"
import {presentPuns} from "./output"

const handleChange = (): void => {
    guiState.edo = parseInt(components.edoInput.value) as Edo
    guiState.maxNorm = parseInt(components.maxNormInput.value) as Max<Norm>
    guiState.maxUnpunniness = parseFloat(components.maxUnpunninessInput.value) as Max<Unpunniness>
    guiState.periods = parseFloat(components.periodsInput.value) as Periods
    guiState.isEt = components.etCheckbox.checked

    const {edo, periods, isEt} = guiState

    const basePeriodDurations = computeEdoBasePeriodDurations(edo)
    punGlobals.durations = computeDurations(basePeriodDurations, periods)

    const initialVector = isEt ? DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS : DEFAULT_INITIAL_VECTOR
    computePuns(initialVector)

    presentPuns()
}

export {
    handleChange,
}
