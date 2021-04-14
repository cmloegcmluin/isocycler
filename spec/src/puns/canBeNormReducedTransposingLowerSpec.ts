import {Edo, Vector} from "../../../src/puns"
import {vectorCanBeNormReducedTransposingLower} from "../../../src/puns/canBeNormReducedTransposingLower"

describe("vectorCanBeNormReducedTransposingLower", (): void => {
    it("returns true if it contains a power of 2 which could therefore be divided by 2 and to counteract that shifted downward in position in the vector by one period where it will last 2x as long", (): void => {
        const vector = [0, 0, 0, 4, -5] as Vector
        const edo = 3 as Edo

        const actual = vectorCanBeNormReducedTransposingLower(vector, edo)

        expect(actual).toBeTruthy() // Because it could become [2, 0, 0, 0, -3] instead
    })

    it("returns false if it contains a power of 2 but it's within the first scale repetition and therefore could not be shifted down an octave", (): void => {
        const vector = [0, 0, 4, 0, -5] as Vector
        const edo = 3 as Edo

        const actual = vectorCanBeNormReducedTransposingLower(vector, edo)

        expect(actual).toBeFalsy()
    })

    it("works even if the power of 2 is negative", (): void => {
        const vector = [-1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -2] as Vector
        const edo = 11 as Edo

        const actual = vectorCanBeNormReducedTransposingLower(vector, edo)

        expect(actual).toBeTruthy()
    })

    it("does not include 1 as a power of 2", (): void => {
        const vector = [1, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1] as Vector
        const edo = 12 as Edo

        const actual = vectorCanBeNormReducedTransposingLower(vector, edo)

        expect(actual).toBeFalsy()
    })
})
