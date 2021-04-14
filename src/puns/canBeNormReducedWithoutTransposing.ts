import {Vector} from "./types"

const vectorCanBeNormReducedWithoutTransposing = (vector: Vector): boolean => {
    const absVector = vector.map(Math.abs)
    const min = Math.min(...absVector.map(count => count === 0 ? Infinity : count))

    for (let index = 2; index <= min; index++) {
        if (absVector.every(count => count % index === 0)) return true
    }

    return false
}

export {
    vectorCanBeNormReducedWithoutTransposing,
}
