import {Pun} from "../puns"
import {Count, Duration} from "../puns/types"
import {computeColor} from "./color"

const SCALER = 40

const computeSvgString = ([vector, _, unpunniness]: Pun, durations: Duration[]): string => {
    let squares = ""
    let upperHalfX = 0
    let lowerHalfX = 0
    let upperHalfY = 0
    let lowerHalfY = 0

    // first do the upper half
    vector.forEach((count: Count, countIndex: number) => {
        if (count <= 0) return
        for (let squareIndex = 0; squareIndex < count; squareIndex++) {
            const duration = durations[countIndex]
            const [r, g, b] = computeColor(duration)

            squares += `<rect x="${upperHalfX * SCALER}" y="0" height="${duration * SCALER}" width="${duration * SCALER}" style="fill:rgb(${r},${g},${b});stroke-width:1;stroke:rgb(0,0,0)"></rect>`
            upperHalfX += duration
            if (duration > upperHalfY) upperHalfY = duration
        }
    })

    // then do the lower half
    vector.forEach((count: Count, countIndex: number) => {
        if (count >= 0) return
        for (let squareIndex = 0; squareIndex < -count; squareIndex++) {
            const duration = durations[countIndex]
            const [r, g, b] = computeColor(duration)

            squares += `<rect x="${lowerHalfX * SCALER}" y="${upperHalfY * SCALER}" height="${duration * SCALER}" width="${duration * SCALER}" style="fill:rgb(${r},${g},${b});stroke-width:1;stroke:rgb(0,0,0)"></rect>`
            lowerHalfX += duration
            if (duration > lowerHalfY) lowerHalfY = duration
        }
    })

    const title = `${vector.toString()}; unpunniness: ${unpunniness.toPrecision(3)}`

    return `<svg height="${(upperHalfY + lowerHalfY) * SCALER}" width="${Math.max(upperHalfX, lowerHalfX) * SCALER}"><title>${title}</title>${squares}</svg>`
}

const formatPuns = (puns: Pun[], durations: Duration[]): string => {
    return puns.reduce(
        (punOutput: string, pun: Pun): string => {
            const svgString = computeSvgString(pun, durations)
            return punOutput + svgString + "<br>"
        },
        "",
    )
}

const sortPunsByUnpunniness = (puns: Pun[]): void => {
    puns.sort((a: Pun, b: Pun) => a[2] - b[2])
}

const presentPuns = (puns: Pun[], durations: Duration[]): string => {
    sortPunsByUnpunniness(puns)

    return formatPuns(puns, durations)
}

export {
    presentPuns,
}
