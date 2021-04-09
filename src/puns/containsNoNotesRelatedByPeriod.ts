import {Edo, Vector} from "./types"

const vectorContainsNoNotesRelatedByPeriod = (vector: Vector, edo: Edo): boolean => {
    for (let index = 0; index < vector.length - edo; index++) {
        if (vector[index] !== 0 && vector[index + edo] !== 0) return false
    }

    return true
}

export {
    vectorContainsNoNotesRelatedByPeriod,
}
