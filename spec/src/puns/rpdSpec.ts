import {computeRpd} from "../../../src/puns/rpd"
import {Duration, Rpd, Vector} from "../../../src/puns/types"

describe("computeRpd", (): void => {
    it("returns the relative percent difference between the total durations of the two halves of the potential pun", (): void => {
        const vector = [1, -1] as Vector
        const durations = [5, 4] as Duration[]

        const actual = computeRpd(vector, durations)

        const expected = 2/9 as Rpd // |4-5|/avg(4,5)
        expect(actual).toEqual(expected)
    })

    it("returns NaN for the empty vector, which is not considered less than the max RPD, and so the trivial case does not get added", (): void => {
        const vector = [0, 0] as Vector
        const durations = [5, 4] as Duration[]

        const actual = computeRpd(vector, durations)

        const expected = NaN as Rpd // |0-0|/avg(0,0)
        expect(actual).toEqual(expected)
    })
})
