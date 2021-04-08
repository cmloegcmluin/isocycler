import {computeEdoDurations} from "./edo"
import {computePuns} from "./isocycler"
import {Edo, Rpd, Norm, Max} from "./types"

const DEFAULT_EDO_INPUT_VALUE = "12"
const DEFAULT_MAX_NORM_INPUT_VALUE = "5"
const DEFAULT_MAX_RPD_INPUT_VALUE = "0.1"

const root: HTMLDivElement = document.createElement("div")
document.body.appendChild(root)

const results: HTMLDivElement = document.createElement("div")

const components = {} as Record<string, HTMLInputElement>

const handleChange = (): void => {
    const edo = parseInt(components.edoInput.value) as Edo
    const maxNorm = parseInt(components.maxNormInput.value) as Max<Norm>
    const maxRpd = parseFloat(components.maxRpdInput.value) / 100 as Max<Rpd>

    const durations = computeEdoDurations(edo)

    results.innerText = computePuns(durations, maxNorm, maxRpd)
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

root.appendChild(buildEdoWrapper())
root.appendChild(buildMaxNormWrapper())
root.appendChild(buildMaxRpdWrapper())
root.appendChild(results)

handleChange()
