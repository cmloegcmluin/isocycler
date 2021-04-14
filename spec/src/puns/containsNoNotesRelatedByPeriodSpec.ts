import {Edo, Vector} from "../../../src/puns"
import {vectorContainsNotesRelatedByPeriod} from "../../../src/puns/containsNoNotesRelatedByPeriod"

describe("vectorContainsNotesRelatedByPeriod", (): void => {
    // Currently this takes advantage of the fact that the period is of length of the EDO
    it("returns false when there are no notes related by the period", (): void => {
        const edo = 3 as Edo
        const vector = [-3, 1, 0, 0, 0, 1] as Vector

        const actual = vectorContainsNotesRelatedByPeriod(vector, edo)

        expect(actual).toBeFalsy()
    })

    it("return true when there are notes related by the period", (): void => {
        const edo = 3 as Edo
        const vector = [-3, 1, 3, 0, 0, 1] as Vector

        const actual = vectorContainsNotesRelatedByPeriod(vector, edo)

        expect(actual).toBeTruthy()
    })
})
