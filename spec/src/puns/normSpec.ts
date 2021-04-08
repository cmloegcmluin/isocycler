import {computeNorm} from "../../../src/puns/norm"
import {Norm, Vector} from "../../../src/puns/types"

describe("computeNorm", (): void => {
    it("computes the count of notes in the potential pun", (): void => {
        const vector = [0, 1, -2, 0, 2] as Vector

        const actual = computeNorm(vector)

        const expected = 5 as Norm
        expect(actual).toBe(expected)
    })
})
