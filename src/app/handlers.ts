import {computeEdoDurations, Edo, Max, Norm, Rpd} from "../puns"
import {components} from "./globals"
import {computeAllPuns} from "./puns"

const handleChange = (): void => {
    const edo = parseInt(components.edoInput.value) as Edo
    const maxNorm = parseInt(components.maxNormInput.value) as Max<Norm>
    const maxRpd = parseFloat(components.maxRpdInput.value) / 100 as Max<Rpd>

    const durations = computeEdoDurations(edo)

    components.results.innerText = computeAllPuns(durations, maxNorm, maxRpd)
}

export {
    handleChange,
}
