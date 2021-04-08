import {computeVectorNorm} from "../../src/norm"
import {Norm, Vector} from "../../src/types"

describe("computeVectorNorm", (): void => { // TODO: rename computeVector[X] to compute[X]
    it("computes the count of notes in the potential pun", (): void => {
        const vector = [0, 1, -2, 0, 2] as Vector

        const actual = computeVectorNorm(vector)

        const expected = 5 as Norm
        expect(actual).toBe(expected)
    })
})
