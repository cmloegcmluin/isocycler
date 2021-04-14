import {performance} from "perf_hooks"
import {DEFAULT_MAX_NORM} from "../../../src/app/constants"
import {guiState} from "../../../src/app/globals"
import {computeEdoBasePeriodDurations, computePuns, Edo, Max, Norm, Pun, Unpunniness} from "../../../src/puns"
import {DEFAULT_INITIAL_VECTOR, DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS} from "../../../src/puns/constants"
import {computeDurations} from "../../../src/puns/durations"
import {punGlobals} from "../../../src/puns/globals"
import * as punsModule from "../../../src/puns/puns"
import {Duration, Periods, Vector} from "../../../src/puns/types"
import Spy = jasmine.Spy

describe("computePuns", (): void => {
    beforeEach(() => {
        punGlobals.puns = []
        punGlobals.durations = []
    })

    it("returns puns for the given durations", (): void => {
        const vector = DEFAULT_INITIAL_VECTOR
        guiState.maxNorm = DEFAULT_MAX_NORM
        guiState.maxUnpunniness = 20 as Max<Unpunniness>
        guiState.edo = 12 as Edo
        const basePeriodDurations: Duration[] = computeEdoBasePeriodDurations(guiState.edo)
        const periods = 1 as Periods
        punGlobals.durations = computeDurations(basePeriodDurations, periods)

        computePuns(vector)

        expect(punGlobals.puns).toEqual(jasmine.arrayWithExactContents([
            [[-2, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1], 0.0005884873807988633, 11.109162441467543],
            [[-1, -1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1], 0.0000707968710490503, 1.3364669600308325],
            [[-1, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 1], -0.0007803054810396892, 14.730205991959801],
            [[-1, 0, -1, 0, 0, 0, 0, 1, 1, 1], 0.0010852913934751296, 18.252352845575167],
            [[-1, 0, -1, 0, 0, 0, 0, 0, 3], -0.001017143298029488, 16.14614341294413],
            [[0, 0, -1, 0, -1, 0, 0, 0, 0, 0, 3], -0.00090617166037954, 16.146143412944703],
            [[0, -1, 0, -1, 0, 0, 0, 0, 0, 3], -0.0009600554313264897, 16.146143412946078],
            [[0, 0, 0, -1, 0, -1, 0, 0, 0, 0, 0, 3], -0.0008553121531125196, 16.146143412947577],
            [[0, -1, 0, -1, 0, 0, 0, 0, 1, 1, 1], 0.0010243786680753653, 18.252352845574997],
            [[0, 0, -1, 0, -1, 0, 0, 0, 0, 1, 1, 1], 0.0009668847112557222, 18.252352845576553],
        ]))
    })

    it("when the tuning is equally tempered, and thus puns are able to be transposed, only includes one of each class", (): void => {
        const vector = DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS
        guiState.maxNorm = DEFAULT_MAX_NORM
        guiState.maxUnpunniness = 20 as Max<Unpunniness>
        guiState.edo = 12 as Edo
        const basePeriodDurations: Duration[] = computeEdoBasePeriodDurations(guiState.edo)
        const periods = 1 as Periods
        punGlobals.durations = computeDurations(basePeriodDurations, periods)

        computePuns(vector)

        expect(punGlobals.puns).toEqual(jasmine.arrayWithExactContents([
            [[-2, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1], 0.0005884873807988633, 11.109162441467543],
            [[-1, -1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1], 0.0000707968710490503, 1.3364669600308325],
            [[-1, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 1], -0.0007803054810396892, 14.730205991959801],
            [[-1, 0, -1, 0, 0, 0, 0, 1, 1, 1], 0.0010852913934751296, 18.252352845575167],
            [[-1, 0, -1, 0, 0, 0, 0, 0, 3], -0.001017143298029488, 16.14614341294413],
        ]))
    })

    it("achieves exclusion of puns that are inverse equivalents by excluding those whose first non-zero term is not positive", (): void => {
        const vector: Vector = DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS
        guiState.maxNorm = 9 as Max<Norm>
        guiState.maxUnpunniness = 200 as Max<Unpunniness>
        guiState.edo = 3 as Edo
        const basePeriodDurations: Duration[] = computeEdoBasePeriodDurations(guiState.edo)
        const periods = 1 as Periods
        punGlobals.durations = computeDurations(basePeriodDurations, periods)

        computePuns(vector)

        // Okay, this is kind of a bad example, because literally every one of these puns' 1st nonzero el is negative
        // But the reason for that is: every one had to be flipped in order for the total of the negative numbers
        // To be less than the total of the positive numbers (among the terms of the vector)
        // So that the squares display with bigger (lower pitch) ones below
        // Which is the new rule (not flipping it so they all have positive error)
        // (because unpunniness which is always positive took over for error on that job)
        expect(punGlobals.puns).toEqual([
            [[-3, 3, 1], 0.011062102899736082, 175.599937800217] as Pun,
        ])
    })

    it("runs as efficiently as possible, only calling for the desired vectors, and once each only", (): void => {
        const vector: Vector = DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS
        guiState.maxNorm = 3 as Max<Norm>
        guiState.maxUnpunniness = 1 as Max<Unpunniness>
        guiState.edo = 3 as Edo
        const basePeriodDurations: Duration[] = computeEdoBasePeriodDurations(guiState.edo)
        const periods = 1 as Periods
        punGlobals.durations = computeDurations(basePeriodDurations, periods)
        spyOn(punsModule, "computePuns").and.callThrough()

        punsModule.computePuns(vector)
        const calls = (punsModule.computePuns as Spy).calls.all() as Array<unknown> as Array<{args: [Vector]}>
        const actual = calls.map(({args: [vector]}) => vector)

        const expected = [
            [-1],
            [-2],
            [-3],
            [-2, 1],
            [-2, -1],
            [-2, 0, 1],
            [-2, 0, -1],
            [-1, 1],
            [-1, 2],
            [-1, 1, 1],
            [-1, 1, -1],
            [-1, -1],
            [-1, -2],
            [-1, -1, 1],
            [-1, -1, -1],
            [-1, 0, 1],
            [-1, 0, 2],
            [-1, 0, -1],
            [-1, 0, -2],
        ] as Vector[]
        expect(actual).toEqual(expected)
    })

    it("finds puns spanning multiple periods, extending the dimension of vector it searches", (): void => {
        const vector: Vector = DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS
        guiState.maxNorm = 3 as Max<Norm>
        guiState.maxUnpunniness = 1 as Max<Unpunniness>
        guiState.edo = 3 as Edo
        const basePeriodDurations: Duration[] = computeEdoBasePeriodDurations(guiState.edo)
        const periods = 2 as Periods
        punGlobals.durations = computeDurations(basePeriodDurations, periods)
        spyOn(punsModule, "computePuns").and.callThrough()

        punsModule.computePuns(vector)
        const calls = (punsModule.computePuns as Spy).calls.all() as Array<unknown> as Array<{args: [Vector]}>
        const actual = calls.map(({args: [vector]}) => vector)

        const expected = [
            [-1],
            [-2],
            [-3],
            [-2, 1],
            [-2, -1],
            [-2, 0, 1],
            [-2, 0, -1],
            [-2, 0, 0, 1],
            [-2, 0, 0, -1],
            [-2, 0, 0, 0, 1],
            [-2, 0, 0, 0, -1],
            [-2, 0, 0, 0, 0, 1],
            [-2, 0, 0, 0, 0, -1],
            [-1, 1],
            [-1, 2],
            [-1, 1, 1],
            [-1, 1, -1],
            [-1, 1, 0, 1],
            [-1, 1, 0, -1],
            [-1, 1, 0, 0, 1],
            [-1, 1, 0, 0, -1],
            [-1, 1, 0, 0, 0, 1],
            [-1, 1, 0, 0, 0, -1],
            [-1, -1],
            [-1, -2],
            [-1, -1, 1],
            [-1, -1, -1],
            [-1, -1, 0, 1],
            [-1, -1, 0, -1],
            [-1, -1, 0, 0, 1],
            [-1, -1, 0, 0, -1],
            [-1, -1, 0, 0, 0, 1],
            [-1, -1, 0, 0, 0, -1],
            [-1, 0, 1],
            [-1, 0, 2],
            [-1, 0, 1, 1],
            [-1, 0, 1, -1],
            [-1, 0, 1, 0, 1],
            [-1, 0, 1, 0, -1],
            [-1, 0, 1, 0, 0, 1],
            [-1, 0, 1, 0, 0, -1],
            [-1, 0, -1],
            [-1, 0, -2],
            [-1, 0, -1, 1],
            [-1, 0, -1, -1],
            [-1, 0, -1, 0, 1],
            [-1, 0, -1, 0, -1],
            [-1, 0, -1, 0, 0, 1],
            [-1, 0, -1, 0, 0, -1],
            [-1, 0, 0, 1],
            [-1, 0, 0, 2],
            [-1, 0, 0, 1, 1],
            [-1, 0, 0, 1, -1],
            [-1, 0, 0, 1, 0, 1],
            [-1, 0, 0, 1, 0, -1],
            [-1, 0, 0, -1],
            [-1, 0, 0, -2],
            [-1, 0, 0, -1, 1],
            [-1, 0, 0, -1, -1],
            [-1, 0, 0, -1, 0, 1],
            [-1, 0, 0, -1, 0, -1],
            [-1, 0, 0, 0, 1],
            [-1, 0, 0, 0, 2],
            [-1, 0, 0, 0, 1, 1],
            [-1, 0, 0, 0, 1, -1],
            [-1, 0, 0, 0, -1],
            [-1, 0, 0, 0, -2],
            [-1, 0, 0, 0, -1, 1],
            [-1, 0, 0, 0, -1, -1],
            [-1, 0, 0, 0, 0, 1],
            [-1, 0, 0, 0, 0, 2],
            [-1, 0, 0, 0, 0, -1],
            [-1, 0, 0, 0, 0, -2],
        ] as Vector[]
        expect(actual).toEqual(expected)
    })

    it("runs fast", (): void => {
        if (!process.env.CI) pending("slow test; only runs in CI")

        const vector: Vector = DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS
        guiState.maxNorm = 5 as Max<Norm>
        guiState.maxUnpunniness = 0.000000001 as Max<Unpunniness>
        guiState.edo = 12 as Edo
        const basePeriodDurations: Duration[] = computeEdoBasePeriodDurations(guiState.edo)
        const periods = 3 as Periods
        punGlobals.durations = computeDurations(basePeriodDurations, periods)

        const trials = 10
        let totalTime = 0
        for (let trial = 1; trial <= trials; trial++) {
            const before = performance.now()
            computePuns(vector)
            const time = performance.now() - before
            console.log(`trial ${trial}: ${time.toPrecision(5)}`)
            totalTime += time
        }
        const averageTime = totalTime / trials
        console.log(`AVERAGE: ${averageTime.toPrecision(5)}`)

        expect(averageTime).toBeLessThan(500)
    })

    it("excludes puns which include notes which are related by the period (and thus could be simplified)", (): void => {
        const vector: Vector = DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS
        guiState.maxNorm = 8 as Max<Norm>
        guiState.maxUnpunniness = 50 as Max<Unpunniness>
        guiState.edo = 3 as Edo
        const basePeriodDurations: Duration[] = computeEdoBasePeriodDurations(guiState.edo)
        const periods = 2 as Periods
        punGlobals.durations = computeDurations(basePeriodDurations, periods)

        computePuns(vector)

        expect(punGlobals.puns).toEqual([
            // Otherwise would contain [-3,1,3,0,0,1]
        ])
    })

    it("excludes puns which can be reduced", (): void => {
        const vector: Vector = DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS
        guiState.maxNorm = 6 as Max<Norm>
        guiState.maxUnpunniness = 800 as Max<Unpunniness>
        guiState.edo = 3 as Edo
        const basePeriodDurations: Duration[] = computeEdoBasePeriodDurations(guiState.edo)
        const periods = 3 as Periods
        punGlobals.durations = computeDurations(basePeriodDurations, periods)

        computePuns(vector)

        punGlobals.puns.forEach(pun => {
            expect(pun[0]).not.toEqual([-2, 2, 0, 0, 0, 0, 0, 2] as Vector)
        })
    })

    it("excludes puns that can be reduced in a different way", (): void => {
        const vector: Vector = DEFAULT_INITIAL_VECTOR_FOR_EQUAL_TEMPERED_TUNINGS
        guiState.maxNorm = 5 as Max<Norm>
        guiState.maxUnpunniness = 14 as Max<Unpunniness>
        guiState.edo = 11 as Edo
        const basePeriodDurations: Duration[] = computeEdoBasePeriodDurations(guiState.edo)
        const periods = 2 as Periods
        punGlobals.durations = computeDurations(basePeriodDurations, periods)

        computePuns(vector)

        punGlobals.puns.forEach(pun => {
            // Because that 2 should be shifted 11 positions to the left and converted to 1's
            expect(pun[0]).not.toEqual([1,0,-1,0,0,0,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,2] as Vector)
        })
    })
})
