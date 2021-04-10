import {performance} from "perf_hooks"
import {DEFAULT_MAX_NORM} from "../../../src/app/constants"
import {computeEdoBasePeriodDurations, computePuns, Edo, Max, Norm, Pun, Unpunniness} from "../../../src/puns"
import {DEFAULT_INITIAL_VECTOR, DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS} from "../../../src/puns/constants"
import {computeDurations} from "../../../src/puns/durations"
import * as punsModule from "../../../src/puns/puns"
import {Duration, Periods, Vector} from "../../../src/puns/types"
import Spy = jasmine.Spy

describe("computePuns", (): void => {
    it("returns puns for the given durations, defaulting max norm to 5 and max unpunniness to 0.001", (): void => {
        const maxNorm = DEFAULT_MAX_NORM
        const maxUnpunniness = 20 as Max<Unpunniness>
        const puns: Pun[] = []
        const vector = DEFAULT_INITIAL_VECTOR
        const edo = 12 as Edo
        const basePeriodDurations: Duration[] = computeEdoBasePeriodDurations(edo)
        const periods = 1 as Periods
        const durations = computeDurations(basePeriodDurations, periods)

        computePuns(puns, durations, vector, maxNorm, maxUnpunniness)

        expect(puns).toEqual(jasmine.arrayWithExactContents([
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
        const maxNorm = DEFAULT_MAX_NORM
        const maxUnpunniness = 20 as Max<Unpunniness>
        const puns: Pun[] = []
        const vector = DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS
        const edo = 12 as Edo
        const basePeriodDurations: Duration[] = computeEdoBasePeriodDurations(edo)
        const periods = 1 as Periods
        const durations = computeDurations(basePeriodDurations, periods)

        computePuns(puns, durations, vector, maxNorm, maxUnpunniness)

        expect(puns).toEqual(jasmine.arrayWithExactContents([
            [[-1, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 1], -0.0007803054810396892, 14.730205991959801] as Pun,
            [[-1, 0, -1, 0, 0, 0, 0, 1, 1, 1], 0.0010852913934751296, 18.252352845575167] as Pun,
            [[-1, 0, -1, 0, 0, 0, 0, 0, 3], -0.001017143298029488, 16.14614341294413] as Pun,
        ]))
    })

    it("achieves exclusion of puns that are inverse equivalents by excluding those whose first non-zero term is not positive", (): void => {
        const maxNorm: Max<Norm> = 9 as Max<Norm>
        const maxUnpunniness: Max<Unpunniness> = 200 as Max<Unpunniness>
        const puns: Pun[] = []
        const vector: Vector = DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS
        const edo = 3 as Edo
        const basePeriodDurations: Duration[] = computeEdoBasePeriodDurations(edo)
        const periods = 1 as Periods
        const durations = computeDurations(basePeriodDurations, periods)

        computePuns(puns, durations, vector, maxNorm, maxUnpunniness, edo)

        // Okay, this is kind of a bad example, because literally every one of these puns' 1st nonzero el is negative
        // But the reason for that is: every one had to be flipped in order for the total of the negative numbers
        // To be less than the total of the positive numbers (among the terms of the vector)
        // So that the squares display with bigger (lower pitch) ones below
        // Which is the new rule (not flipping it so they all have positive error)
        // (because unpunniness which is always positive took over for error on that job)
        expect(puns).toEqual([
            [[-3, 3, 1], 0.011062102899736082, 175.599937800217] as Pun,
        ])
    })

    it("runs as efficiently as possible, only calling for the desired vectors, and once each only", (): void => {
        const maxNorm: Max<Norm> = 3 as Max<Norm>
        const maxUnpunniness: Max<Unpunniness> = 1 as Max<Unpunniness>
        const puns: Pun[] = []
        const vector: Vector = DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS
        const edo = 3 as Edo
        const basePeriodDurations: Duration[] = computeEdoBasePeriodDurations(edo)
        const periods = 1 as Periods
        const durations = computeDurations(basePeriodDurations, periods)
        spyOn(punsModule, "computePuns").and.callThrough()

        punsModule.computePuns(puns, durations, vector, maxNorm, maxUnpunniness, edo)
        const calls = (punsModule.computePuns as Spy).calls.all() as Array<unknown> as Array<{args: [Pun[], Duration[], Vector]}>
        const actual = calls.map(({args: [_, __, vector]}) => vector)

        const expected = [
            [1],
            [2],
            [3],
            [2, 1],
            [2, -1],
            [2, 0, 1],
            [2, 0, -1],
            [1, 1],
            [1, 2],
            [1, 1, 1],
            [1, 1, -1],
            [1, -1],
            [1, -2],
            [1, -1, 1],
            [1, -1, -1],
            [1, 0, 1],
            [1, 0, 2],
            [1, 0, -1],
            [1, 0, -2],
        ] as Vector[]
        expect(actual).toEqual(expected)
    })

    it("finds puns spanning multiple periods, extending the dimension of vector it searches", (): void => {
        const maxNorm: Max<Norm> = 3 as Max<Norm>
        const maxUnpunniness: Max<Unpunniness> = 1 as Max<Unpunniness>
        const puns: Pun[] = []
        const vector: Vector = DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS
        const edo = 3 as Edo
        const basePeriodDurations: Duration[] = computeEdoBasePeriodDurations(edo)
        const periods = 2 as Periods
        const durations = computeDurations(basePeriodDurations, periods)
        spyOn(punsModule, "computePuns").and.callThrough()

        punsModule.computePuns(puns, durations, vector, maxNorm, maxUnpunniness, edo)
        const calls = (punsModule.computePuns as Spy).calls.all() as Array<unknown> as Array<{args: [Pun[], Duration[], Vector]}>
        const actual = calls.map(({args: [_, __, vector]}) => vector)

        const expected = [
            [1],
            [2],
            [3],
            [2, 1],
            [2, -1],
            [2, 0, 1],
            [2, 0, -1],
            [2, 0, 0, 1],
            [2, 0, 0, -1],
            [2, 0, 0, 0, 1],
            [2, 0, 0, 0, -1],
            [2, 0, 0, 0, 0, 1],
            [2, 0, 0, 0, 0, -1],
            [1, 1],
            [1, 2],
            [1, 1, 1],
            [1, 1, -1],
            [1, 1, 0, 1],
            [1, 1, 0, -1],
            [1, 1, 0, 0, 1],
            [1, 1, 0, 0, -1],
            [1, 1, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, -1],
            [1, -1],
            [1, -2],
            [1, -1, 1],
            [1, -1, -1],
            [1, -1, 0, 1],
            [1, -1, 0, -1],
            [1, -1, 0, 0, 1],
            [1, -1, 0, 0, -1],
            [1, -1, 0, 0, 0, 1],
            [1, -1, 0, 0, 0, -1],
            [1, 0, 1],
            [1, 0, 2],
            [1, 0, 1, 1],
            [1, 0, 1, -1],
            [1, 0, 1, 0, 1],
            [1, 0, 1, 0, -1],
            [1, 0, 1, 0, 0, 1],
            [1, 0, 1, 0, 0, -1],
            [1, 0, -1],
            [1, 0, -2],
            [1, 0, -1, 1],
            [1, 0, -1, -1],
            [1, 0, -1, 0, 1],
            [1, 0, -1, 0, -1],
            [1, 0, -1, 0, 0, 1],
            [1, 0, -1, 0, 0, -1],
            [1, 0, 0, 1],
            [1, 0, 0, 2],
            [1, 0, 0, 1, 1],
            [1, 0, 0, 1, -1],
            [1, 0, 0, 1, 0, 1],
            [1, 0, 0, 1, 0, -1],
            [1, 0, 0, -1],
            [1, 0, 0, -2],
            [1, 0, 0, -1, 1],
            [1, 0, 0, -1, -1],
            [1, 0, 0, -1, 0, 1],
            [1, 0, 0, -1, 0, -1],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 2],
            [1, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 1, -1],
            [1, 0, 0, 0, -1],
            [1, 0, 0, 0, -2],
            [1, 0, 0, 0, -1, 1],
            [1, 0, 0, 0, -1, -1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 2],
            [1, 0, 0, 0, 0, -1],
            [1, 0, 0, 0, 0, -2],
        ] as Vector[]
        expect(actual).toEqual(expected)
    })

    it("runs fast", (): void => {
        const maxNorm: Max<Norm> = 5 as Max<Norm>
        const maxUnpunniness: Max<Unpunniness> = 0.000000001 as Max<Unpunniness>
        const puns: Pun[] = []
        const vector: Vector = DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS
        const edo = 12 as Edo
        const basePeriodDurations: Duration[] = computeEdoBasePeriodDurations()
        const periods = 3 as Periods
        const durations = computeDurations(basePeriodDurations, periods)

        const trials = 10
        let totalTime = 0
        for (let trial = 1; trial <= trials; trial++) {
            const before = performance.now()
            computePuns(puns, durations, vector, maxNorm, maxUnpunniness, edo)
            const time = performance.now() - before
            console.log(`trial ${trial}: ${time.toPrecision(5)}`)
            totalTime += time
        }
        const averageTime = totalTime / trials
        console.log(`AVERAGE: ${averageTime.toPrecision(5)}`)

        expect(averageTime).toBeLessThan(500)
    })

    it("excludes puns which include notes which are related by the period (and thus could be simplified)", (): void => {
        const maxNorm: Max<Norm> = 8 as Max<Norm>
        const maxUnpunniness: Max<Unpunniness> = 50 as Max<Unpunniness>
        const puns: Pun[] = []
        const vector: Vector = DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS
        const edo = 3 as Edo
        const basePeriodDurations: Duration[] = computeEdoBasePeriodDurations(edo)
        const periods = 2 as Periods
        const durations = computeDurations(basePeriodDurations, periods)

        computePuns(puns, durations, vector, maxNorm, maxUnpunniness, edo)

        expect(puns).toEqual([
            // Otherwise would contain [-3,1,3,0,0,1]
        ])
    })
})
