type Count = number & {_CountBrand: boolean}
type Vector = Count[]
type Unpunniness = number & {_UnpunninessBrand: boolean}
type Pun = [Vector, Duration, Unpunniness]
type Norm = number & {_NormBrand: boolean}
type Index = number & {_IndexBrand: boolean}
type Edo = number & {_EdoBrand: boolean}
type Duration = number & {_DurationBrand: boolean}
type Pitch = number & {_PitchBrand: boolean}
type Periods = number & {_PeriodsBrand: boolean}

type Max<T extends unknown = number> = T & {_MaxBrand: boolean}

interface PunGlobals {
    puns: Pun[],
    durations: Duration[],
}

export {
    Count,
    Vector,
    Pun,
    Norm,
    Index,
    Edo,
    Duration,
    Max,
    Unpunniness,
    Periods,
    Pitch,
    PunGlobals,
}
