import {Edo} from "../../../src/puns"
import {vectorCanBeNormReduced} from "../../../src/puns/canBeNormReduced"
import {Vector} from "../../../src/puns"

describe("vectorCanBeNormReduced", (): void => {
    it("returns true if all notes in one half (positive or negative counts in the vector) can be reduced by a power of two and all notes on the other half can be shifted one period higher to balance out that halving of duration", (): void => {
        const vector = [-4, 5, 0] as Vector
        const edo = 3 as Edo
        const durations = new Array(9)

        const actual = vectorCanBeNormReduced(vector, edo, durations)

        expect(actual).toBeTruthy() // could be [-2,0,0,0,5,0] or finally [-1,0,0,0,0,0,0,5,0] which have smaller norms
    })

    it("returns false if there's not enough room to shift the non-power-of-two half over", (): void => {
        const vector = [-4, 5, 0] as Vector
        const edo = 3 as Edo
        const durations = new Array(3)

        const actual = vectorCanBeNormReduced(vector, edo, durations)

        expect(actual).toBeFalsy()
    })

    it("works the other orientation", (): void => {
        const vector = [4, -5, 0] as Vector
        const edo = 3 as Edo
        const durations = new Array(9)

        const actual = vectorCanBeNormReduced(vector, edo, durations)

        expect(actual).toBeTruthy()
    })

    it("works the other orientation for the other example", (): void => {
        const vector = [4, -5, 0] as Vector
        const edo = 3 as Edo
        const durations = new Array(3)

        const actual = vectorCanBeNormReduced(vector, edo, durations)

        expect(actual).toBeFalsy()
    })

    it("works for another simple example", (): void => {
        const vector = [-2, 0, 3] as Vector
        const edo = 3 as Edo
        const durations = new Array(9)

        const actual = vectorCanBeNormReduced(vector, edo, durations)

        expect(actual).toBeTruthy()
    })

    it("does not falsely report vectors that have only zeroes and ones", (): void => {
        const vector = [-1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,-1] as Vector
        const edo = 12 as Edo
        const durations = new Array(24)

        const actual = vectorCanBeNormReduced(vector, edo, durations)

        expect(actual).toBeFalsy()
    })

    it("does not falsely report vectors that have only zeroes and ones, other inversion", (): void => {
        const vector = [1,0,0,0,0,0,-1,-1,0,0,0,0,0,0,0,0,0,1] as Vector
        const edo = 12 as Edo
        const durations = new Array(24)

        const actual = vectorCanBeNormReduced(vector, edo, durations)

        expect(actual).toBeFalsy()
    })

    it("does not falsely report ones with combinations of 2's and 1's", (): void => {
        const vector = [-1,-1,0,0,0,0,2,0,0,0,0,1] as Vector

        const edo = 12 as Edo
        const durations = new Array(24)

        const actual = vectorCanBeNormReduced(vector, edo, durations)

        expect(actual).toBeFalsy()
    })

    it("does not falsely report ones with combinations of 2's and 1's, other inversion", (): void => {
        const vector = [1,1,0,0,0,0,-2,0,0,0,0,-1] as Vector

        const edo = 12 as Edo
        const durations = new Array(24)

        const actual = vectorCanBeNormReduced(vector, edo, durations)

        expect(actual).toBeFalsy()
    })
})
