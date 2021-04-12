import {Edo} from "../../../src/puns"
import {vectorContainsNoNotesRelatedByPeriod} from "../../../src/puns/containsNoNotesRelatedByPeriod"
import {Vector} from "../../../src/puns/types"

// TODO: invert this to be positive, like all the other three
describe("vectorContainsNoNotesRelatedByPeriod", (): void => {
    // Currently this takes advantage of the fact that the period is of length of the EDO
    it("return true when there are no notes related by the period", (): void => {
        const edo = 3 as Edo
        const vector = [-3, 1, 0, 0, 0, 1] as Vector

        const actual = vectorContainsNoNotesRelatedByPeriod(vector, edo)

        expect(actual).toBeTruthy()
    })

    it("return false when there are notes related by the period", (): void => {
        const edo = 3 as Edo
        const vector = [-3, 1, 3, 0, 0, 1] as Vector

        const actual = vectorContainsNoNotesRelatedByPeriod(vector, edo)

        expect(actual).toBeFalsy()
    })
})
