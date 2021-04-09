import {performance} from "perf_hooks"
import {computeEdoBasePeriodDurations, computePuns, Edo, Max, Norm, Pun, Unpunniness} from "../../../src/puns"
import {DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS} from "../../../src/puns/constants"
import {computeDurations} from "../../../src/puns/durations"
import * as punsModule from "../../../src/puns/puns"
import {Duration, Periods, Vector} from "../../../src/puns/types"
import Spy = jasmine.Spy

describe("computePuns", (): void => {
    it("achieves exclusion of puns that are inverse equivalents by excluding those whose first non-zero term is not positive", (): void => {
        const maxNorm: Max<Norm> = 9 as Max<Norm>
        const maxUnpunniness: Max<Unpunniness> = 200 as Max<Unpunniness>
        const puns: Pun[] = []
        const vector: Vector = DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS
        const durations: Duration[] = [1, 0.7937005259840998, 0.6299605249474366] as Duration[]

        computePuns(puns, vector, durations, maxNorm, maxUnpunniness)

        // Okay, this is kind of a bad example, because literally every one of these puns' 1st nonzero el is negative
        // But the reason for that is: every one had to be flipped in order for the total of the negative numbers
        // To be less than the total of the positive numbers (among the terms of the vector)
        // So that the squares display with bigger (lower pitch) ones below
        // Which is the new rule (not flipping it so they all have positive error)
        // (because unpunniness which is always positive took over for error on that job)
        // TODO: clean this comment, and also maybe save Puns to precision 5
        expect(puns).toEqual([
            [[-3, 3, 1], 0.011062102899736082, 175.599937800217] as Pun,
        ])
    })

    it("runs as efficiently as possible, only calling for the desired vectors, and once each only", (): void => {
        const maxNorm: Max<Norm> = 3 as Max<Norm>
        const maxUnpunniness: Max<Unpunniness> = 1 as Max<Unpunniness>
        const puns: Pun[] = []
        const vector: Vector = DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS
        const durations: Duration[] = [1, 0.7937005259840998, 0.6299605249474366] as Duration[]
        spyOn(punsModule, "computePuns").and.callThrough()

        punsModule.computePuns(puns, vector, durations, maxNorm, maxUnpunniness)
        const calls = (punsModule.computePuns as Spy).calls.all() as Array<unknown> as Array<{args: [Pun[], Vector]}>
        const actual = calls.map(({args: [_, vector]}) => vector)

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
        const basePeriodDurations: Duration[] = [1, 0.7937005259840998, 0.6299605249474366] as Duration[]
        const periods = 2 as Periods
        const durations = computeDurations(basePeriodDurations, periods)
        spyOn(punsModule, "computePuns").and.callThrough()

        punsModule.computePuns(puns, vector, durations, maxNorm, maxUnpunniness)
        const calls = (punsModule.computePuns as Spy).calls.all() as Array<unknown> as Array<{args: [Pun[], Vector]}>
        const actual = calls.map(({args: [_, vector]}) => vector)

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

    xit("runs fast", (): void => {
        const maxNorm: Max<Norm> = 5 as Max<Norm>
        const maxUnpunniness: Max<Unpunniness> = 0.000000001 as Max<Unpunniness>
        const puns: Pun[] = []
        const vector: Vector = DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS
        const basePeriodDurations: Duration[] = computeEdoBasePeriodDurations(12 as Edo)
        const periods = 3 as Periods
        const durations = computeDurations(basePeriodDurations, periods)

        const trials = 15
        let totalTime = 0
        for (let trial = 0; trial < trials; trial++) {
            const before = performance.now()
            computePuns(puns, vector, durations, maxNorm, maxUnpunniness)
            const time = performance.now() - before
            console.log(`trial ${trial}: ${time.toPrecision(5)}`)
            totalTime += time
        }
        const averageTime = totalTime / trials
        console.log(`AVERAGE: ${averageTime.toPrecision(5)}`)

        expect(averageTime).toBeLessThan(500)
    })
})
