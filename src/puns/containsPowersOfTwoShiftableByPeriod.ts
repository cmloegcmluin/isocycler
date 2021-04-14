import {Edo, Vector} from "./types"

const vectorContainsPowersOfTwoShiftableByPeriod = (vector: Vector, edo: Edo): boolean => {
    const absVector = vector.map(Math.abs)

    for (let index = edo; index < vector.length; index++) {
        const absCount = absVector[index]
        if (absCount > 1 && Math.log2(absCount) % 1 === 0) {
            return true
        }
    }

    return false
}

export {
    vectorContainsPowersOfTwoShiftableByPeriod,
}
