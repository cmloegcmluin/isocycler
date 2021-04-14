import {vectorCanBeNormReducedWithoutTransposing} from "../../../src/puns/canBeNormReducedWithoutTransposing"
import {Vector} from "../../../src/puns"

describe("vectorCanBeNormReducedWithoutTransposing", (): void => {
    it("returns true if the terms of the vector are all multiples of some number > 1", (): void => {
        const vector = [0, 3, 0, -6, 3] as Vector

        const actual = vectorCanBeNormReducedWithoutTransposing(vector)

        expect(actual).toBeTruthy()
    })

    it("returns false if the terms are not all multiples of some number > 1", (): void => {
        const vector = [0, 2, 0, -6, 3] as Vector

        const actual = vectorCanBeNormReducedWithoutTransposing(vector)

        expect(actual).toBeFalsy()
    })
})
