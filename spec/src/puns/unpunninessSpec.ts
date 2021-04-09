import {computeUnpunniness} from "../../../src/puns/unpunniness"
import {Duration, Unpunniness, Vector} from "../../../src/puns/types"

describe("computeUnpunniness", (): void => {
    it("returns the difference between the total durations of the two halves of the potential pun, as a proportion of the size of the minimum duration in the entire vector, times the unpunniness constant of 10000", (): void => {
        const vector = [1, -1, -1] as Vector
        const durations = [5, 4, 3] as Duration[]

        const actual = computeUnpunniness(vector, durations)

        const expected = 10000 * 2/3 as Unpunniness // |5-7|/min(5,4,3)
        expect(actual).toEqual(expected)
    })

    it("returns 0 for the empty vector", (): void => {
        const vector = [0, 0, 0] as Vector
        const durations = [5, 4, 3] as Duration[]

        const actual = computeUnpunniness(vector, durations)

        const expected = 0 as Unpunniness // |0-0|/min(5,4,3)
        expect(actual).toEqual(expected)
    })
})
