import {Edo, Vector} from "./types"

const vectorContainsPowersOfTwoShiftableByPeriod = (vector: Vector, edo: Edo): boolean => {
    for (let index = edo; index < vector.length; index++) {
        if (Math.log2(Math.abs(vector[index])) % 1 === 0) {
            return true
        }
    }

    return false
}

export {
    vectorContainsPowersOfTwoShiftableByPeriod,
}
