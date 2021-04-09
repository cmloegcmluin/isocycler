import {isocyclicDuration, isocyclicPitch} from "../../../src/puns/isocyclic"
import {Duration, Pitch} from "../../../src/puns/types"

describe("isocyclicPitch", (): void => {
    it("computes the isocyclic pitch of a duration", (): void => {
        const duration = 0.125 as Duration

        const actual = isocyclicPitch(duration)

        const expected = 3 as Pitch // 0.125⁻¹ = 8; log₂8 = 3
        expect(actual).toBe(expected)
    })
})

describe("isocyclicDuration", (): void => {
    it("computes the isocyclic duration of a pitch", (): void => {
        const pitch = 3 as Pitch

        const actual = isocyclicDuration(pitch)

        const expected = 0.125 as Duration // exp₂3 = 8; 8⁻¹ = 0.125
        expect(actual).toBe(expected)
    })
})
