import {
    CompilePatternParameters,
    Entity,
    Material,
    MaterializeEntities,
    MaterializeScales,
    Note,
    play,
    Scale,
    Scales,
    setPattern,
    setupPerformer,
    stop,
    TimbreNameEnum,
} from "@musical-patterns/material"
import {Duration as UtilitiesDuration, Intensity, Pitch, Scalar, Tone, Value} from "@musical-patterns/utilities"
import {Pun} from "../puns"
import {Count, Duration} from "../puns/types"

const setupAudio = async () => {
    await setupPerformer()
}

const playPun = async ([vector]: Pun, durations: Duration[]) => {
    await stop()

    const upperNotes: Note[] = []
    const lowerNotes: Note[] = []
    vector.forEach((count: Count, vectorIndex: number) => {
        const duration = durations[vectorIndex]

        if (count > 0) {
            for (let index = 0; index < count; index++) {
                upperNotes.push({
                    pitch: {scalar: 1 / duration as unknown as Scalar<Pitch>}, // TODO: not pitch, it's frequency!
                    value: {scalar: duration as unknown as Scalar<Value>},
                    envelope: {scalar: 0.9 * duration as unknown as Scalar<Value>},
                    intensity: {scalar: 0.5 as unknown as Scalar<Intensity>},
                })
            }
        } else if (count < 0) {
            for (let index = 0; index < -count; index++) {
                lowerNotes.push({
                    pitch: {scalar: 1 / duration as unknown as Scalar<Pitch>},
                    value: {scalar: duration as unknown as Scalar<Value>},
                    envelope: {scalar: 0.9 * duration as unknown as Scalar<Value>},
                    intensity: {scalar: 0.5 as unknown as Scalar<Intensity>},
                })
            }
        }
        // TODO: might be cool to just randomize the notes, or make that a checkbox
    })

    const upperEntity: Entity = {
        sections: [
            {
                notes: upperNotes,
                // repetitions: 1 as unknown as Cardinal,
            },
        ],
        timbreName: TimbreNameEnum.WARM_TRIANGLE,
    }
    const lowerEntity: Entity = {
        sections: [
            {
                notes: lowerNotes,
                // repetitions: 1 as unknown as Cardinal,
            },
        ],
        timbreName: TimbreNameEnum.WARM_TRIANGLE,
    }
    const materializeEntities: MaterializeEntities = () => [upperEntity, lowerEntity]

    const pitchScale: Scale<Pitch> = {basis: 220 as unknown as Tone}
    const valueScale: Scale<Value> = {basis: 1000 as unknown as UtilitiesDuration}
    const scales: Scales = {PITCH: [pitchScale], VALUE: [valueScale]}
    const materializeScales: MaterializeScales = () => scales

    const material: Material = {materializeEntities, materializeScales}
    const compilePatternParameters: CompilePatternParameters = {material}
    await setPattern(compilePatternParameters)
    play()
}

export {
    setupAudio,
    playPun,
}

// TODO: look at EDO 11 max norm 7 unpunny 50 periods 2 a little ways down
//  there's a set of bad ones where just one of the notes on one side is a power of two
//  and you can find its replacement
//  yeah I think you do still want to reject any power of 2, as long as one scale rep downwards is an empty cell
//  which you could transfer yourself into 1/2 as high count
