import {isocyclicPitch} from "../puns/isocyclic"
import {Duration, Pitch} from "../puns/types"
import {Color} from "./types"

/*
Red     unison      Rgb     [255,0,0]       0.000
Orange  second              [255,128,0]     0.138
Yellow  third           Cmy [255,255,0]     0.277
Green   fourth      Rgb     [0,255,0]       0.415
Cyan    tritone         Cmy [0,255,255]     0.500
Blue    fifth       Rgb     [0,0,255]       0.585
Violet  sixth               [128,0,255]     0.723
Magenta seventh         Cmy [255,0,255]     0.862
 */

const RED = [255, 0, 0] as Color
const ORANGE = [255, 128, 0] as Color
const YELLOW = [255, 255, 0] as Color
const GREEN = [0, 255, 0] as Color
const CYAN = [0, 255, 255] as Color
const BLUE = [0, 0, 255] as Color
const VIOLET = [128, 0, 255] as Color
const MAGENTA = [255, 0, 255] as Color

const RED_PITCH = 0.000 as Pitch
const ORANGE_PITCH = 0.138 as Pitch
const YELLOW_PITCH = 0.277 as Pitch
const GREEN_PITCH = 0.415 as Pitch
const CYAN_PITCH = 0.500 as Pitch
const BLUE_PITCH = 0.585 as Pitch
const VIOLET_PITCH = 0.723 as Pitch
const MAGENTA_PITCH = 0.862 as Pitch

const RED_ORANGE_RANGE = ORANGE_PITCH - RED_PITCH as Pitch
const ORANGE_YELLOW_RANGE = YELLOW_PITCH - ORANGE_PITCH as Pitch
const YELLOW_GREEN_RANGE = GREEN_PITCH - YELLOW_PITCH as Pitch
const GREEN_CYAN_RANGE = CYAN_PITCH - GREEN_PITCH as Pitch
const CYAN_BLUE_RANGE = BLUE_PITCH - CYAN_PITCH as Pitch
const BLUE_VIOLET_RANGE = VIOLET_PITCH - BLUE_PITCH as Pitch
const VIOLET_MAGENTA_RANGE = MAGENTA_PITCH - VIOLET_PITCH as Pitch
const MAGENTA_RED_RANGE = 1 - MAGENTA_PITCH as Pitch

const computeRangeColor = (pitch: Pitch, previousBound: Pitch, range: Pitch, previousColor: Color, nextColor: Color) => {
    const diff = pitch - previousBound
    const nextProportion = diff / range
    const previousProportion = 1 - nextProportion

    const nextPart = nextColor.map(c => c * nextProportion)
    const previousPart = previousColor.map(c => c * previousProportion)

    return previousPart.map((c, index) => c + nextPart[index]) as Color
}

const computeColor = (duration: Duration): Color => {
    const pitch = isocyclicPitch(duration) % 1 as Pitch

    if (pitch >= RED_PITCH && pitch < ORANGE_PITCH) {
        return computeRangeColor(pitch, RED_PITCH, RED_ORANGE_RANGE, RED, ORANGE)
    } else if (pitch >= ORANGE_PITCH && pitch < YELLOW_PITCH) {
        return computeRangeColor(pitch, ORANGE_PITCH, ORANGE_YELLOW_RANGE, ORANGE, YELLOW)
    } else if (pitch >= YELLOW_PITCH && pitch < GREEN_PITCH) {
        return computeRangeColor(pitch, YELLOW_PITCH, YELLOW_GREEN_RANGE, YELLOW, GREEN)
    } else if (pitch >= GREEN_PITCH && pitch < CYAN_PITCH) {
        return computeRangeColor(pitch, GREEN_PITCH, GREEN_CYAN_RANGE, GREEN, CYAN)
    } else if (pitch >= CYAN_PITCH && pitch < BLUE_PITCH) {
        return computeRangeColor(pitch, CYAN_PITCH, CYAN_BLUE_RANGE, CYAN, BLUE)
    } else if (pitch >= BLUE_PITCH && pitch < VIOLET_PITCH) {
        return computeRangeColor(pitch, BLUE_PITCH, BLUE_VIOLET_RANGE, BLUE, VIOLET)
    } else if (pitch >= VIOLET_PITCH && pitch < MAGENTA_PITCH) {
        return computeRangeColor(pitch, VIOLET_PITCH, VIOLET_MAGENTA_RANGE, VIOLET, MAGENTA)
    } else if (pitch >= MAGENTA_PITCH && pitch < 1) {
        return computeRangeColor(pitch, MAGENTA_PITCH, MAGENTA_RED_RANGE, MAGENTA, RED)
    }

    return [0, 0, 0]
}

export {
    computeColor,
}
