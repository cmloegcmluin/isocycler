import {
    DEFAULT_EDO,
    DEFAULT_PERIODS,
    DEFAULT_MAX_NORM,
    DEFAULT_MAX_UNPUNNINESS,
    DEFAULT_ET,
} from "./constants"
import {components} from "./globals"
import {handleChange} from "./handlers"

const buildEdoWrapper = (): HTMLDivElement => {
    const edoWrapper: HTMLDivElement = document.createElement("div")

    const edoInput: HTMLInputElement = document.createElement("input")
    edoInput.type = "number"
    edoInput.value = DEFAULT_EDO.toString()
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
    maxNormInput.value = DEFAULT_MAX_NORM.toString()
    maxNormInput.addEventListener("change", handleChange)

    const maxNormLabel = document.createElement("label")
    maxNormLabel.textContent = "max norm"

    maxNormWrapper.appendChild(maxNormLabel)
    maxNormWrapper.appendChild(maxNormInput)

    components.maxNormInput = maxNormInput

    return maxNormWrapper
}

const buildMaxUnpunninessWrapper = (): HTMLDivElement => {
    const maxUnpunninessWrapper: HTMLDivElement = document.createElement("div")

    const maxUnpunninessInput: HTMLInputElement = document.createElement("input")
    maxUnpunninessInput.type = "number"
    maxUnpunninessInput.value = DEFAULT_MAX_UNPUNNINESS.toString()
    maxUnpunninessInput.step = "0.1"
    maxUnpunninessInput.min = "0"
    maxUnpunninessInput.max = "500"
    maxUnpunninessInput.addEventListener("change", handleChange)

    const maxUnpunninessLabel = document.createElement("label")
    maxUnpunninessLabel.textContent = "max unpunniness"

    maxUnpunninessWrapper.appendChild(maxUnpunninessLabel)
    maxUnpunninessWrapper.appendChild(maxUnpunninessInput)

    components.maxUnpunninessInput = maxUnpunninessInput

    return maxUnpunninessWrapper
}

const buildPeriodsWrapper = (): HTMLDivElement => {
    const periodsWrapper: HTMLDivElement = document.createElement("div")

    const periodsInput: HTMLInputElement = document.createElement("input")
    periodsInput.type = "number"
    periodsInput.value = DEFAULT_PERIODS.toString()
    periodsInput.min = "1"
    periodsInput.max = "6"
    periodsInput.addEventListener("change", handleChange)

    const periodsLabel = document.createElement("label")
    periodsLabel.textContent = "periods"

    periodsWrapper.appendChild(periodsLabel)
    periodsWrapper.appendChild(periodsInput)

    components.periodsInput = periodsInput

    return periodsWrapper
}

const buildEtWrapper = (): HTMLDivElement => {
    const etWrapper: HTMLDivElement = document.createElement("div")

    const etCheckbox: HTMLInputElement = document.createElement("input")
    etCheckbox.type = "checkbox"
    etCheckbox.checked = DEFAULT_ET
    etCheckbox.addEventListener("change", handleChange)

    const etLabel = document.createElement("label")
    etLabel.textContent = "is equal tempered"

    etWrapper.appendChild(etLabel)
    etWrapper.appendChild(etCheckbox)

    components.etCheckbox = etCheckbox

    return etWrapper
}

const buildResults = (): HTMLDivElement => {
    const results: HTMLDivElement = document.createElement("div")

    components.results = results

    return results
}

export {
    buildEdoWrapper,
    buildMaxNormWrapper,
    buildMaxUnpunninessWrapper,
    buildPeriodsWrapper,
    buildEtWrapper,
    buildResults,
}
