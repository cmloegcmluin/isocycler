import {vectorCanBeReduced} from "../../../src/puns/canBeReduced"
import {Vector} from "../../../src/puns/types"

describe("vectorCanBeReduced", (): void => {
    it("returns true if the terms of the vector are all multiples of some number > 1", (): void => {
        const vector = [0, 3, 0, -6, 3] as Vector

        const actual = vectorCanBeReduced(vector)

        expect(actual).toBeTruthy()
    })

    it("returns false if the terms are not all multiples of some number > 1", (): void => {
        const vector = [0, 2, 0, -6, 3] as Vector

        const actual = vectorCanBeReduced(vector)

        expect(actual).toBeFalsy()
    })
})
