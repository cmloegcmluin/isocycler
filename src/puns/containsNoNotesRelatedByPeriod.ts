import {Edo, Vector} from "./types"

const vectorContainsNotesRelatedByPeriod = (vector: Vector, edo: Edo): boolean => {
    for (let index = 0; index < vector.length - edo; index++) {
        if (vector[index] !== 0 && vector[index + edo] !== 0) return true
    }

    return false
}

export {
    vectorContainsNotesRelatedByPeriod,
}
