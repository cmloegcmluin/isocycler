import {computePuns} from "../puns"
import {Count, Duration, Max, Norm, Pun, Rpd} from "../puns/types"
import {formatPuns, sortPunsByRpd} from "./output"

const computeAllPuns = (durations: Duration[], maxNorm: Max<Norm> = 5 as Max<Norm>, maxRpd: Max<Rpd> = 0.001 as Max<Rpd>) => {
    const puns = [] as Pun[]
    const initialVector = durations.map(_ => 0 as Count)

    computePuns(puns, initialVector, durations, maxNorm, maxRpd)

    sortPunsByRpd(puns)

    return formatPuns(puns)
}

export {
    computeAllPuns,
}
