const edo = 12
const steps = [...Array(edo).keys()]
const sizes = steps.map(step => 2 ** -(step / edo))
console.log(sizes)

const maxTotalAbs = 6
const vectorIsTooBad = vector => {
    const totalAbs = vector.reduce((totalAbs, term) => {
        return totalAbs + Math.abs(term)
    }, 0)

    return totalAbs >= maxTotalAbs
}

const maxError = 0.001
const solutions = []
const doCoolThingForVectorMaybeAddingSolution = vector => {
    let error = 0
    vector.forEach((term, index) => {
        error = error + term * sizes[index]
    })

    if (Math.abs(error) < maxError) {
        solutions.push([vector, error])
    }
}

const doThingRecursivelyForVector = (vector, topIndex = 0) => {
    if (vectorIsTooBad(vector)) {
        return
    }

    doCoolThingForVectorMaybeAddingSolution(vector)

    for (let index = topIndex; index < vector.length; index++) {
        if (vector[index] === 0) {
            const newVector = [...vector]
            newVector[index] = newVector[index] + 1
            doThingRecursivelyForVector(newVector, index)

            const newVector2 = [...vector]
            newVector2[index] = newVector2[index] - 1
            doThingRecursivelyForVector(newVector2, index)
        } else if (vector[index] > 0) {
            const newVector = [...vector]
            newVector[index] = newVector[index] + 1
            doThingRecursivelyForVector(newVector, index)
        } else {
            const newVector2 = [...vector]
            newVector2[index] = newVector2[index] - 1
            doThingRecursivelyForVector(newVector2, index)
        }
    }
}

const initialVector = [...Array(edo).keys()].map(_ => 0)
doThingRecursivelyForVector(initialVector)

solutions.forEach(solution => {
    console.log(solution.toString())
})

// TODO: you could also increase the efficiency
//  by only searching for ones where the first non-zero term of the vector is positive
//  Effectively halving the space you search, since half are redundant
//  (and that's more efficient than waiting to see if the error is negative)
//  Which by the way you should at the end, if the error is negative,
//  Flip sign on all vector terms and the error to make everything consistent

// TODO: Would be cool if you could also check JI pitches up to a certain odd limit or something (including e.g. 3/2)
//  Or really, it should just be able to take an arbitrary scale (.scl file) and use its pitches as the building block
//  (Or equivalently a set of durations, a duration scale, if you're thinking like that)
//  Or select from a set of obvious common choices, like 12-EDO, a harmonic mode

// TODO: And also begin to set it up for success with if you give it for an input an arbitrary target (besides 1)
//  Meaning that it should always start out pre-populated with a list of puns you can achieve with the unit
//  Or rather, all the vector combinations of the notes in the scale, I mean (assuming the bottom one is the unit)
//  But you may also select any sequence of notes you're trying to redo or supplement and it should find puns for it

// TODO: would be cool if you could provide config as CLI args, though don't agonize over it because even moreso
//  You should aspire to the web interface for it
//  Config like the total number of intervals in each pun, which EDO/limit/scale

// TODO: Switch to TS now

// TODO: Add tests, e.g. that this thing is as efficient as possible

// TODO: Rename this bad crap, variable names

// TODO: and perhaps the error should actually be proportionate with the duration of the thing it's an error for
//  So if it's a tiny error over 7 bars or something, that's a huge deal, but a borderline big error on 1 bar, maybe no

// TODO: have it sort the results by how small their error is

// TODO: format the results more nicely

// TODO: plug in @musical-patterns/material to perform it (or however houndstoothtopia does it)
//  The default timbre should probably have a weak-ish attack to help cover up the inexact onsets

// TODO: take another pass over tasks in Asana and extract stuff that is clear enough I should do here

// TODO: it can generate sheet music through Lilypond or something, with normal staff notation & squares supplement

// TODO: it should be able to compose some generative music as some of a way of demonstrating the energy

// TODO: visual interface where you can:
//  - Add a new voice with a + symbol in the next row
//  - There's a line across the top with tick marks and faint lines down for the units
//  - Where no filled squares yet, empty or dotted-line squares the size of entire unit or remainder thereof
//  - You can select a sequence of existing squares or empty-squares, then the bank of possibilities updates w/r/t it
//  - You should be able to click in the bank of possibilities to populate the score with some squares
//  - Every voice's blank space should be sliced up by any other voice's boundaries, so you can always fit to any voice
//  - Click the left edge of a square and drag to left to shift everything to the left while making it bigger
//   And similarly click the right edge of a square and drag to the right to make it bigger shifting things to right
//   If you instead want to just apportion space differently between two neighbor squares, maybe ctrl+drag?
//  - Might want to be able to ctrl+C ctrl+V copy paste squares around
//  - Maybe it should highlight in red borders any squares that aren't the size of ones in your scale
//  - What would the bank of possibilities look like? thumbnails of the squares you'd drag in? with some exact numbers?

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
