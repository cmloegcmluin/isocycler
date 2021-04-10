import {computeEdoBasePeriodDurations} from "../../../src/puns"
import {vectorContainsNoPowersOfTwo} from "../../../src/puns/containsNoPowersOfTwo"
import {computeDurations} from "../../../src/puns/durations"
import {Edo, Periods, Vector} from "../../../src/puns/types"

describe("vectorContainsNoPowersOfTwo", (): void => {
    it("returns true if there are no notes in this vector which have counts that are powers of 2 (beyond 2⁰=1 anyway)", (): void => {
        const vector = [1, 0, -1, -3, 5] as Vector

        const actual = vectorContainsNoPowersOfTwo(vector)

        expect(actual).toBeTruthy()
    })

    it("returns false if a power of two (also important, when taken the absolute value, of course) is in this vector", (): void => {
        const vector = [1, 0, -1, -4, 5] as Vector

        const actual = vectorContainsNoPowersOfTwo(vector)

        expect(actual).toBeFalsy()
    })

    // it("should include this vector even though it contains a power of two, because its alternate form which normally we'd be favoring won't actually be included in the puns given the setting for periods", (): void => {
    //     const vector = [-4, 5, 0] as Vector
    //     const edo = 3 as Edo
    //     const basePeriodDurations = computeEdoBasePeriodDurations(edo)
    //     const periods = 2 as Periods
    //     const durations = computeDurations(basePeriodDurations, periods)
    //
    //     const actual = vectorContainsNoPowersOfTwo(vector, edo, durations)
    //
    //     expect(actual).toBeTruthy()
    // })
})
