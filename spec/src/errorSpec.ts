import {computeError} from "../../src/error"
import {Duration, Vector} from "../../src/types"

describe("computeError", (): void => {
    it("computes the difference between the total durations of the two halves of the potential pun", (): void => {
        const vector = [1, -2] as Vector
        const durations = [6.5, 3] as Duration[]

        const actual = computeError(vector, durations)

        const expected = 0.5 as Duration // 6.5*1 - 3*-2
        expect(actual).toEqual(expected)
    })

    it("includes negative errors because that will indicate whether the vector needs to be flipped for consistency", (): void => {
        const vector = [1, -2] as Vector
        const durations = [5.5, 3] as Duration[]

        const actual = computeError(vector, durations)

        const expected = -0.5 as Duration // 5.5*1 - 3*-2
        expect(actual).toEqual(expected)
    })
})
