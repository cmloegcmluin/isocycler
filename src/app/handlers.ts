import {computeEdoDurations, Edo, Max, Norm, Rpd} from "../puns"
import {computeAllPuns} from "../puns/all"
import {components} from "./globals"
import {presentPuns} from "./output"

const handleChange = (): void => {
    const edo = parseInt(components.edoInput.value) as Edo
    const maxNorm = parseInt(components.maxNormInput.value) as Max<Norm>
    const maxRpd = parseFloat(components.maxRpdInput.value) / 100 as Max<Rpd>

    const durations = computeEdoDurations(edo)
    const puns = computeAllPuns(durations, maxNorm, maxRpd)

    components.results.innerHTML = presentPuns(puns, durations)
}

export {
    handleChange,
}
