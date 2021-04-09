import {
    DEFAULT_EDO_INPUT_VALUE,
    DEFAULT_REPETITION_RANGE_INPUT_VALUE,
    DEFAULT_MAX_NORM_INPUT_VALUE,
    DEFAULT_MAX_RPD_INPUT_VALUE,
} from "./constants"
import {components} from "./globals"
import {handleChange} from "./handlers"

const buildEdoWrapper = (): HTMLDivElement => {
    const edoWrapper: HTMLDivElement = document.createElement("div")

    const edoInput: HTMLInputElement = document.createElement("input")
    edoInput.type = "number"
    edoInput.value = DEFAULT_EDO_INPUT_VALUE
    edoInput.addEventListener("change", handleChange)

    const edoLabel = document.createElement("label")
    edoLabel.textContent = "EDO"

    edoWrapper.appendChild(edoLabel)
    edoWrapper.appendChild(edoInput)

    components.edoInput = edoInput

    return edoWrapper
}

const buildMaxNormWrapper = (): HTMLDivElement => {
    const maxNormWrapper: HTMLDivElement = document.createElement("div")

    const maxNormInput: HTMLInputElement = document.createElement("input")
    maxNormInput.type = "number"
    maxNormInput.value = DEFAULT_MAX_NORM_INPUT_VALUE
    maxNormInput.addEventListener("change", handleChange)

    const maxNormLabel = document.createElement("label")
    maxNormLabel.textContent = "max norm"

    maxNormWrapper.appendChild(maxNormLabel)
    maxNormWrapper.appendChild(maxNormInput)

    components.maxNormInput = maxNormInput

    return maxNormWrapper
}

const buildMaxRpdWrapper = (): HTMLDivElement => {
    const maxRpdWrapper: HTMLDivElement = document.createElement("div")

    const maxRpdInput: HTMLInputElement = document.createElement("input")
    maxRpdInput.type = "number"
    maxRpdInput.value = DEFAULT_MAX_RPD_INPUT_VALUE
    maxRpdInput.step = "0.001"
    maxRpdInput.min = "0"
    maxRpdInput.max = "5"
    maxRpdInput.addEventListener("change", handleChange)

    const maxRpdLabel = document.createElement("label")
    maxRpdLabel.textContent = "max RPD"

    maxRpdWrapper.appendChild(maxRpdLabel)
    maxRpdWrapper.appendChild(maxRpdInput)

    components.maxRpdInput = maxRpdInput

    return maxRpdWrapper
}

const buildRepetitionRangeWrapper = (): HTMLDivElement => {
    const repetitionRangeWrapper: HTMLDivElement = document.createElement("div")

    const repetitionRangeInput: HTMLInputElement = document.createElement("input")
    repetitionRangeInput.type = "number"
    repetitionRangeInput.value = DEFAULT_REPETITION_RANGE_INPUT_VALUE
    repetitionRangeInput.min = "1"
    repetitionRangeInput.max = "6"
    repetitionRangeInput.addEventListener("change", handleChange)

    const repetitionRangeLabel = document.createElement("label")
    repetitionRangeLabel.textContent = "repetition range"

    repetitionRangeWrapper.appendChild(repetitionRangeLabel)
    repetitionRangeWrapper.appendChild(repetitionRangeInput)

    components.repetitionRangeInput = repetitionRangeInput

    return repetitionRangeWrapper
}

const buildResults = (): HTMLDivElement => {
    const results: HTMLDivElement = document.createElement("div")

    components.results = results

    return results
}

export {
    buildEdoWrapper,
    buildMaxNormWrapper,
    buildMaxRpdWrapper,
    buildRepetitionRangeWrapper,
    buildResults,
}
