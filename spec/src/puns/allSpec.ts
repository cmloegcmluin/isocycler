import {DEFAULT_MAX_NORM} from "../../../src/app/constants"
import {computeEdoBasePeriodDurations, Edo, Max, Pun, Unpunniness} from "../../../src/puns"
import {computeAllPuns} from "../../../src/puns/all"
import {DEFAULT_INITIAL_VECTOR, DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS} from "../../../src/puns/constants"

describe("computeAllPuns", (): void => {
    const durations = computeEdoBasePeriodDurations(12 as Edo)

    it("returns puns for the given durations, defaulting max norm to 5 and max unpunniness to 0.001", (): void => {
        const actual = computeAllPuns(durations, DEFAULT_INITIAL_VECTOR, DEFAULT_MAX_NORM, 20 as Max<Unpunniness>)

        expect(actual).toEqual(jasmine.arrayWithExactContents([
            [[-1, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 1], -0.0007803054810396892, 14.730205991959801] as Pun,
            [[-1, 0, -1, 0, 0, 0, 0, 1, 1, 1], 0.0010852913934751296, 18.252352845575167] as Pun,
            [[-1, 0, -1, 0, 0, 0, 0, 0, 3], -0.001017143298029488, 16.14614341294413] as Pun,
            [[0, 0, -1, 0, -1, 0, 0, 0, 0, 0, 3], -0.00090617166037954, 16.146143412944703] as Pun,
            [[0, -1, 0, -1, 0, 0, 0, 0, 0, 3], -0.0009600554313264897, 16.146143412946078] as Pun,
            [[0, 0, 0, -1, 0, -1, 0, 0, 0, 0, 0, 3], -0.0008553121531125196, 16.146143412947577] as Pun,
            [[0, -1, 0, -1, 0, 0, 0, 0, 1, 1, 1], 0.0010243786680753653, 18.252352845574997] as Pun,
            [[0, 0, -1, 0, -1, 0, 0, 0, 0, 1, 1, 1], 0.0009668847112557222, 18.252352845576553] as Pun,
        ]))
    })

    it("when the tuning is equally tempered, and thus puns are able to be transposed, only includes one of each class", (): void => {
        const actual = computeAllPuns(durations, DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS, DEFAULT_MAX_NORM, 20 as Max<Unpunniness>)

        expect(actual).toEqual(jasmine.arrayWithExactContents([
            [[-1, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 1], -0.0007803054810396892, 14.730205991959801] as Pun,
            [[-1, 0, -1, 0, 0, 0, 0, 1, 1, 1], 0.0010852913934751296, 18.252352845575167] as Pun,
            [[-1, 0, -1, 0, 0, 0, 0, 0, 3], -0.001017143298029488, 16.14614341294413] as Pun,
        ]))
    })
})
