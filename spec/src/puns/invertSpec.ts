import {invertVector} from "../../../src/puns/invert"
import {Vector} from "../../../src/puns/types"

describe("invertVector", (): void => {
    it("inverts the vector", (): void => {
        const vector = [1, 0, -3] as Vector

        const actual = invertVector(vector)

        const expected = [-1, 0, 3] as Vector
        expect(actual).toEqual(expected)
    })
})
