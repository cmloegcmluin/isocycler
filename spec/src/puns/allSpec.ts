import {computeEdoBasePeriodDurations, Edo, Pun} from "../../../src/puns"
import {computeAllPuns} from "../../../src/puns/all"
import {DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS} from "../../../src/puns/constants"

describe("computeAllPuns", (): void => {
    const durations = computeEdoBasePeriodDurations(12 as Edo)

    it("returns puns for the given durations, defaulting max norm to 5 and max RPD to 0.1%", (): void => {
        const actual = computeAllPuns(durations)

        expect(actual).toEqual(jasmine.arrayWithExactContents([
            [[-1, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 1], -0.0007803054810396892, 0.0004239624156312721] as Pun,
            [[-1, 0, -1, 0, 0, 0, 0, 1, 1, 1], 0.0010852913934751296, 0.0005737906626263205] as Pun,
            [[-1, 0, -1, 0, 0, 0, 0, 0, 3], -0.001017143298029488, 0.0005380599872028353] as Pun,
            [[0, 0, -1, 0, -1, 0, 0, 0, 0, 0, 3], -0.00090617166037954, 0.0005380599872028543] as Pun,
            [[0, -1, 0, -1, 0, 0, 0, 0, 0, 3], -0.0009600554313264897, 0.0005380599872029002] as Pun,
            [[0, 0, 0, -1, 0, -1, 0, 0, 0, 0, 0, 3], -0.0008553121531125196, 0.00053805998720295] as Pun,
            [[0, -1, 0, -1, 0, 0, 0, 0, 1, 1, 1], 0.0010243786680753653, 0.0005737906626263152] as Pun,
            [[0, 0, -1, 0, -1, 0, 0, 0, 0, 1, 1, 1], 0.0009668847112557222, 0.000573790662626364] as Pun,
        ]))
    })

    it("when the tuning is equally tempered, and thus puns are able to be transposed, only includes one of each class", (): void => {
        const actual = computeAllPuns(durations, DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS)

        expect(actual).toEqual(jasmine.arrayWithExactContents([
            [[-1, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 1], -0.0007803054810396892, 0.0004239624156312721] as Pun,
            [[-1, 0, -1, 0, 0, 0, 0, 1, 1, 1], 0.0010852913934751296, 0.0005737906626263205] as Pun,
            [[-1, 0, -1, 0, 0, 0, 0, 0, 3], -0.001017143298029488, 0.0005380599872028353] as Pun,
        ]))
    })
})
