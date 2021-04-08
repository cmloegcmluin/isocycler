import {computePuns} from "../../src/isocycler"
import {Duration} from "../../src/types"

describe("computePuns", (): void => {
    it("runs a test", (): void => {
        const durations = [
            1,
            0.9438743126816935,
            0.8908987181403393,
            0.8408964152537146,
            0.7937005259840998,
            0.7491535384383408,
            0.7071067811865475,
            0.6674199270850172,
            0.6299605249474366,
            0.5946035575013605,
            0.5612310241546865,
            0.5297315471796477,
        ] as Duration[]

        const actual = computePuns(durations)

        expect(actual.length).toBeGreaterThan(0)
    })
})
