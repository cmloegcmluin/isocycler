import {vectorContainsNoPowersOfTwo} from "../../../src/puns/containsNoPowersOfTwo"
import {Vector} from "../../../src/puns/types"

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
})
