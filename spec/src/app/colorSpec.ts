import {computeColor} from "../../../src/app/color"
import {isocyclicDuration} from "../../../src/puns/isocyclic"
import {Pitch} from "../../../src/puns/types"

describe("computeColor", (): void => {
    it("works for red", (): void => {
        const pitch = 0 as Pitch
        const duration = isocyclicDuration(pitch)

        const actual = computeColor(duration)

        const expected = [255, 0, 0]
        actual.map((c, index) => expect(c).toBeCloseTo(expected[index]))
    })

    it("works for red-orange", (): void => {
        const pitch = 0.069 as Pitch
        const duration = isocyclicDuration(pitch)

        const actual = computeColor(duration)

        const expected = [255, 64, 0]
        actual.map((c, index) => expect(c).toBeCloseTo(expected[index]))
    })

    it("works for orange", (): void => {
        const pitch = 0.138 as Pitch
        const duration = isocyclicDuration(pitch)

        const actual = computeColor(duration)

        const expected = [255, 128, 0]
        actual.map((c, index) => expect(c).toBeCloseTo(expected[index]))
    })

    it("works for orange-yellow", (): void => {
        const pitch = 0.2075 as Pitch
        const duration = isocyclicDuration(pitch)

        const actual = computeColor(duration)

        const expected = [255, 191.5, 0]
        actual.map((c, index) => expect(c).toBeCloseTo(expected[index]))
    })
})
