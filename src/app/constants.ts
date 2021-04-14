import {Edo, Max, Norm, Periods, Unpunniness} from "../puns/types"

const DEFAULT_EDO = 12 as Edo
const DEFAULT_MAX_NORM = 5 as Max<Norm>
const DEFAULT_MAX_UNPUNNINESS = 1.4 as Max<Unpunniness>
const DEFAULT_PERIODS = 2 as Periods
const DEFAULT_ET = true
const DEFAULT_LOOP = false

const MAX_COMBINATIONS_TO_SEARCH = 10000000

export {
    DEFAULT_EDO,
    DEFAULT_MAX_NORM,
    DEFAULT_MAX_UNPUNNINESS,
    DEFAULT_PERIODS,
    DEFAULT_ET,
    DEFAULT_LOOP,
    MAX_COMBINATIONS_TO_SEARCH,
}
