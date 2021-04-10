import {Vector} from "./types"

const vectorContainsNoPowersOfTwo = (vector: Vector): boolean => {
    for (const count of vector) {
        const absCount = Math.abs(count)
        if (absCount > 1 && Math.log2(absCount) % 1 === 0) {
            return false
        }
    }
    return true
}

export {
    vectorContainsNoPowersOfTwo,
}
