type Count = number & {_ElBrand: boolean}
type Vector = Count[]
type Rpd = number & {_RpdBrand: boolean}
type Pun = [Vector, Duration, Rpd]
type Norm = number & {_NormBrand: boolean}
type Index = number & {_IndexBrand: boolean}
type Edo = number & {_EdoBrand: boolean}
type Duration = number & {_DurationBrand: boolean}
type Pitch = number & {_PitchBrand: boolean}
type Periods = number & {_PeriodsBrand: boolean}

type Max<T extends unknown = number> = T & {_MaxBrand: boolean}

export {
    Count,
    Vector,
    Pun,
    Norm,
    Index,
    Edo,
    Duration,
    Max,
    Rpd,
    Periods,
    Pitch,
}
