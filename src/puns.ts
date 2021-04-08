import {computeError} from "./error"
import {computeNorm} from "./norm"
import {formatPuns, sortPunsByRpd} from "./output"
import {computeRpd} from "./rpd"
import {Duration, Count, Index, Max, Norm, Pun, Rpd, Vector} from "./types"

// TODO: write test to prove that this excludes the desired results
const isFirstNonzeroCountPositive = (vector: Vector): boolean => {
    for (const count of vector) {
        if (count < 0) return false
        if (count > 0) return true
    }
    return false
}

const invertVector = (vector: Vector): Vector => {
    return vector.map((count: Count) => -count as Count)
}

const computeIncrementedVectorPuns = (
    puns: Pun[],
    vector: Vector,
    durations: Duration[],
    maxNorm: Max<Norm>,
    maxRpd: Max<Rpd>,
    index: Index,
    increment: number,
) => {
    const newVector = [...vector]
    newVector[index] = newVector[index] + increment as Count
    computePuns(puns, newVector, durations, maxNorm, maxRpd, index)
}

const computePuns = (
    puns: Pun[],
    vector: Vector,
    durations: Duration[],
    maxNorm: Max<Norm>,
    maxRpd: Max<Rpd>,
    initialIndex: Index = 0 as Index,
) => {
    let norm = computeNorm(vector)
    if (norm > maxNorm) {
        return
    }

    const rpd = computeRpd(vector, durations)
    if (rpd < maxRpd && isFirstNonzeroCountPositive(vector)) {
        const error = computeError(vector, durations)
        if (error > 0) {
            puns.push([vector, error, rpd])
        } else {
            puns.push([invertVector(vector), -error as Duration, rpd])
        }
    }

    for (let index = initialIndex; index < vector.length; index++) {
        if (vector[index] === 0) {
            // Kick it off in both directions
            computeIncrementedVectorPuns(puns, vector, durations, maxNorm, maxRpd, index, 1)
            computeIncrementedVectorPuns(puns, vector, durations, maxNorm, maxRpd, index, -1)
        } else if (vector[index] > 0) {
            // Continue in positive direction
            computeIncrementedVectorPuns(puns, vector, durations, maxNorm, maxRpd, index, 1)
        } else {
            // Continue in negative direction
            computeIncrementedVectorPuns(puns, vector, durations, maxNorm, maxRpd, index, -1)
        }
    }
}

const computeAllPuns = (durations: Duration[], maxNorm: Max<Norm> = 5 as Max<Norm>, maxRpd: Max<Rpd> = 0.001 as Max<Rpd>) => {
    const puns = [] as Pun[]
    const initialVector = durations.map(_ => 0 as Count)

    computePuns(puns, initialVector, durations, maxNorm, maxRpd)

    sortPunsByRpd(puns)

    return formatPuns(puns)
}

export {
    computeAllPuns,
}

// TODO: Would be cool if you could also check JI pitches up to a certain odd limit or something (including e.g. 3/2)
//  Or really, it should just be able to take an arbitrary scale (.scl file) and use its pitches as the building block
//  (Or equivalently a set of durations, a duration scale, if you're thinking like that)
//  Or select from a set of obvious common choices, like 12-EDO, a harmonic mode

// TODO: And also begin to set it up for success with if you give it for an input an arbitrary target (besides 1)
//  Meaning that it should always start out pre-populated with a list of puns you can achieve with the unit
//  Or rather, all the vector combinations of the notes in the scale, I mean (assuming the bottom one is the unit)
//  But you may also select any sequence of notes you're trying to redo or supplement and it should find puns for it

// TODO: Add tests that this thing is as efficient as possible (in terms of which vectors it looks at)

// TODO: the error should actually be proportionate with the duration of the thing it's an error for
//  So if it's a tiny error over 7 bars or something, that's a huge deal, but a borderline big error on 1 bar, maybe no

// TODO: plug in @musical-patterns/material to perform it (or however houndstoothtopia does it)
//  The default timbre should probably have a weak-ish attack to help cover up the inexact onsets

// TODO: it can generate sheet music through Lilypond or something, with normal staff notation & squares supplement

// TODO: it should be able to compose some generative music as some of a way of demonstrating the energy

// TODO: visual interface where you can:
//  - Add a new voice with a + symbol in the next row
//   Horizontal scroll, for when they get inevitably long? yeah it's just shift and scroll wheel, so that should be fine
//  - There's a line across the top with tick marks and faint lines down for the units
//  - Where no filled squares yet, empty or dotted-line squares the size of entire unit or remainder thereof
//   Do them as SVGs, because I think that will work best for exporting for performance scores
//  - You can select a sequence of existing squares or empty-squares, then the bank of possibilities updates w/r/t it
//  - You should be able to click in the bank of possibilities to populate the score with some squares
//  - Every voice's blank space should be sliced up by any other voice's boundaries, so you can always fit to any voice
//  - Click the left edge of a square and drag to left to shift everything to the left while making it bigger
//   And similarly click the right edge of a square and drag to the right to make it bigger shifting things to right
//   If you instead want to just apportion space differently between two neighbor squares, maybe ctrl+drag?
//   Although that will deviate from the scale, almost certainly. Maybe okay.
//   It also needs some easy way to swap neighbors around. At the point they meet above the horizontal timeline?
//  - Might want to be able to ctrl+C ctrl+V copy paste squares around
//  - Maybe it should highlight in red borders any squares that aren't the size of ones in your scale
//  - What would the bank of possibilities look like? thumbnails of the squares you'd drag in? with some exact numbers?
//   Snap points in vertical scroll for the bank which would be on the left column,
//   to show how each pun aligns with the selection it’s a pun with (which is frozen at the top)
//  - Could consider applying a spectrum of colors to the squares to help at a glance discern the pitch
//   That'd be one of a small set of checkbox options, to enable spectral coloration
//  - Along with whether you allow the results to include results that simpler divisions could do
//   (like the vector could be divided by 2? No do that by default...
//   I mean like would be possible in 13-EDO but you’re looking at 26-EDO, if that’s possible,
//   like look at new results this edo contributes to the field)

// TODO: perhaps a feature to snap something exactly to a unit bar, or whatever else

// TODO: inputs and locking feature
//  like there could be one input for the root Hz
//  one input for the tempo
//  and then another for the cycle count
//  and maybe initially the cycle count would be a randomish number
//  whatever results from the formula of Hz combineed with tempo
//      but if you type in a new cycle count
//  and you haven't locked Hz or the tempo
//  then both would try to change proportionally to suit your new cycle count
//  or maybe it's simpler
//  if you're just forced to have one of the three locked at all times
//  yeah it would never make sense to have two locked ever

// TODO: thoughts on how to distribute the error here: https://app.asana.com/0/530392539241382/1200147391481332

// TODO: eventually the error should be displayed in terms of seconds

// TODO: hey wait, am I potentially being either super-redundant OR leaving a lot of possibilities out
//  By focusing only on a single octave's worth of the scale? Shouldn't it include like at least one octave higher
//  And/or how should you indicate this? I suppose for each voice you'd need to provide its max and min pitch
//  (and its max and min durations) and then it will take those into account when proposing puns
//  I mean I guess it's fine if it proposes puns like C4 contains two C5's, etc.
//  And when doing puns for the "all" category maybe it just tries to find puns that work within the range of all voices
//  So... you should by default start with one voice with a reasonable-ish range
