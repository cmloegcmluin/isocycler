// https://math.stackexchange.com/questions/793856/standard-notation-for-sum-of-vector-elements
// https://en.wikipedia.org/wiki/Norm_(mathematics)#_norm_or_Manhattan_norm
import {Count, Norm, Vector} from "./types"

const computeNorm = (vector: Vector): Norm => {
    return vector.reduce(
        (norm: Norm, element: Count) => {
            return norm + Math.abs(element) as Norm
        },
        0 as Norm,
    )
}

export {
    computeNorm,
}
