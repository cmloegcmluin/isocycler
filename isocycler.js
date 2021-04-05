const edo = 12
const steps = [...Array(edo).keys()]
const sizes = steps.map(step => 2 ** -(step / edo))
// TODO: Would be cool if you could also check JI pitches up to a certain odd limit or something (including e.g. 3/2)
console.log(sizes)

// TODO: would be cool if you could provide these as CLI args, though don't agonize over it because even moreso
//  You should aspire to the web interface for it
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

    // TODO: you could also increase the efficiency
    //  by only searching for ones where the first non-zero term of the vector is positive
    //  Effectively halving the space you search, since half are redundant
    //  (and that's more efficient than waiting to see if the error is negative)
    //  Which by the way you should at the end, if the error is negative,
    //  Flip sign on all vector terms and the error to make everything consistent
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
