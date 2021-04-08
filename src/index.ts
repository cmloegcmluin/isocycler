import {computeEdoDurations} from "./edo"
import {computePuns} from "./isocycler"
import {Edo, Er, Norm} from "./types"

const DEFAULT_EDO_INPUT_VALUE = "12"
const DEFAULT_MAX_NORM_INPUT_VALUE = "5"
const DEFAULT_MAX_ER_INPUT_VALUE = "0.001"

const root: HTMLDivElement = document.createElement("div")
document.body.appendChild(root)

const results: HTMLDivElement = document.createElement("div")

const components = {} as Record<string, HTMLInputElement>

const handleChange = (): void => {
    const edo = parseInt(components.edoInput.value) as Edo
    const maxNorm = parseInt(components.maxNormInput.value) as Norm
    const maxEr = parseFloat(components.maxErInput.value) as Er

    const durations = computeEdoDurations(edo)

    results.innerText = computePuns(durations, maxNorm, maxEr)
}

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

const buildMaxErWrapper = (): HTMLDivElement => {
    const maxErWrapper: HTMLDivElement = document.createElement("div")

    const maxErInput: HTMLInputElement = document.createElement("input")
    maxErInput.type = "number"
    maxErInput.value = DEFAULT_MAX_ER_INPUT_VALUE
    maxErInput.step = "0.00001"
    maxErInput.min = "0"
    maxErInput.max = "0.05"
    maxErInput.addEventListener("change", handleChange)

    const maxErLabel = document.createElement("label")
    maxErLabel.textContent = "max error"

    maxErWrapper.appendChild(maxErLabel)
    maxErWrapper.appendChild(maxErInput)

    components.maxErInput = maxErInput

    return maxErWrapper
}

root.appendChild(buildEdoWrapper())
root.appendChild(buildMaxNormWrapper())
root.appendChild(buildMaxErWrapper())
root.appendChild(results)

handleChange()
