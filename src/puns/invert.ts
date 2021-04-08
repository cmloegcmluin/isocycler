import {Count, Vector} from "./types"

const invertVector = (vector: Vector): Vector => {
    return vector.map((count: Count) => count === 0 ? count : -count as Count)
}

export {
    invertVector,
}
