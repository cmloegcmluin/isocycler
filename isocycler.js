const edo = 12
const steps = [...Array(edo).keys()]
const sizes = steps.map(step => 2 ** -(step / edo))
console.log(sizes)

const maxTotalAbs = 5
const vectorIsTooBad = vector => {
    const totalAbs = vector.reduce((totalAbs, term) => {
        return totalAbs + Math.abs(term)
    }, 0)

    // console.log("total abs", totalAbs)
    return totalAbs > maxTotalAbs
}

const maxError = 0.001
const solutions = []
const doCoolThingForVectorMaybeAddingSolution = vector => {
    let error = 0
    vector.forEach((term, index) => {
        error = error + term * sizes[index]
    })

    if (Math.abs(error) < maxError) {
        solutions.push(vector)
    }
}

const checked = {}
const doThingRecursivelyForVector = (vector) => {
    // console.log("do for vector", vector)
    const key = vector.toString()
    if (checked[key]) {
        // console.log('already hceckd', key)
        return
    }

    checked[key] = true
    if (vectorIsTooBad(vector)) {
        // console.log("bad")
        return
    }

    doCoolThingForVectorMaybeAddingSolution(vector)

    vector.forEach((term, index) => {
        if (vector[index] === 0) {
            const newVector = [...vector]
            newVector[index] = newVector[index] + 1
            doThingRecursivelyForVector(newVector)

            const newVector2 = [...vector]
            newVector2[index] = newVector2[index] - 1
            doThingRecursivelyForVector(newVector2)
        } else if (vector[index] > 0) {
            const newVector = [...vector]
            newVector[index] = newVector[index] + 1
            doThingRecursivelyForVector(newVector)
        } else {
            const newVector2 = [...vector]
            newVector2[index] = newVector2[index] - 1
            doThingRecursivelyForVector(newVector2)
        }
    })
}

const initialVector = [...Array(edo).keys()].map(_ => 0)
doThingRecursivelyForVector(initialVector)

// console.log(Object.keys(checked))
solutions.forEach(solution => {
    console.log(solution.toString())
})
