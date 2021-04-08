type El = number & {_ElBrand: boolean}
type Vector = El[]
type Er = number & {_ErBrand: boolean}
type Pun = [Vector, Er]
type Norm = number & {_NormBrand: boolean}
type Index = number & {_IndexBrand: boolean}
type Edo = number & {_EdoBrand: boolean}
type Duration = number & {_DurationBrand: boolean}

type Max<T extends unknown = number> = T & {_MaxBrand: boolean}

export {
    El,
    Vector,
    Er,
    Pun,
    Norm,
    Index,
    Edo,
    Duration,
    Max,
}
