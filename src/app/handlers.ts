import {computeEdoBasePeriodDurations, computePuns, Edo, Max, Norm, Unpunniness} from "../puns"
import {DEFAULT_INITIAL_VECTOR, DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS} from "../puns/constants"
import {computeDurations} from "../puns/durations"
import {punGlobals} from "../puns/globals"
import {Periods} from "../puns/types"
import {factorial} from "../utilities"
import {MAX_COMBINATIONS_TO_SEARCH} from "./constants"
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
    const durations = computeDurations(basePeriodDurations, periods)
    punGlobals.durations = durations
    punGlobals.puns = []

    const n = durations.length
    const r = guiState.maxNorm
    const combinationsWithRepetition = factorial(n + r - 1) / (factorial(r) * factorial(n - 1))

    if (combinationsWithRepetition < MAX_COMBINATIONS_TO_SEARCH) {
        components.results.textContent = "Loading..."
        const initialVector = isEt ? DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS : DEFAULT_INITIAL_VECTOR
        setTimeout(() => {
            computePuns(initialVector)

            presentPuns()
        }, 0)
    } else {
        components.results.textContent = "Too many combinations to search. Try reducing the search space."
    }
}

export {
    handleChange,
}
