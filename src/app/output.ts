import {Pun} from "../puns"
import {punGlobals} from "../puns/globals"
import {Count, Duration} from "../puns/types"
import {playPun} from "./audio"
import {computeColor} from "./color"
import {components} from "./globals"

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

const sortPunsByUnpunniness = (puns: Pun[]): void => {
    puns.sort((a: Pun, b: Pun) => a[2] - b[2])
}

const presentPuns = (): void => {
    components.results.innerHTML = ""
    const {puns, durations} = punGlobals

    sortPunsByUnpunniness(puns)
    puns.forEach((pun: Pun) => {
        const svgString = computeSvgString(pun, durations)
        const svgWrapper = document.createElement("div")
        svgWrapper.innerHTML = svgString

        svgWrapper.addEventListener("click", () => {
            playPun(pun, durations).then()
        })
        components.results.appendChild(svgWrapper)
    })
}

export {
    presentPuns,
}
