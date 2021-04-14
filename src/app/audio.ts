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
                    // TODO: CODE CLEANLINESS: INCONSISTENT CONCEPTION OF SOUND
                    //  not pitch, it's frequency! that's why the isocyclicPitch function didn't work here
                    //  because pitch takes the log
                    //  I wonder if we'll ever want a like, shared general utility library that could work for
                    //  Sagittal, StaffCode, MusicalPatterns, and Isocycler
                    pitch: {scalar: 1 / duration as unknown as Scalar<Pitch>},
                    value: {scalar: duration as unknown as Scalar<Value>},
                    envelope: {scalar: 0.97 * duration as unknown as Scalar<Value>},
                    intensity: {scalar: 0.5 as unknown as Scalar<Intensity>},
                })
            }
        } else if (count < 0) {
            for (let index = 0; index < -count; index++) {
                lowerNotes.push({
                    pitch: {scalar: 1 / duration as unknown as Scalar<Pitch>},
                    value: {scalar: duration as unknown as Scalar<Value>},
                    envelope: {scalar: 0.97 * duration as unknown as Scalar<Value>},
                    intensity: {scalar: 0.5 as unknown as Scalar<Intensity>},
                })
            }
        }
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

    // TODO: HELP MUSICAL PATTERNS AS DISTANCED FUTURE SELF COMING TO IT
    //  Readme for musical patterns material is out of date
    //  And could really use a starting from scratch basic example
    //  Like what I’ve just made in isocycler
    //  Including a version that has the scales and it uses them by index which was an alternate approach here
    const pitchScale: Scale<Pitch> = {basis: 220 as unknown as Tone}
    const valueScale: Scale<Value> = {basis: 1000 as unknown as UtilitiesDuration}
    const scales: Scales = {PITCH: [pitchScale], VALUE: [valueScale]}
    // const pitchScale: Scale<Pitch> = {
    //     basis: 440 as unknown as Tone,
    //     scalars: [1, 2, 3] as unknown[] as Array<Scalar<Pitch>>,
    // }
    // const valueScale: Scale<Value> = {
    //     basis: 100 as unknown as Duration,
    //     scalars: [1, 2, 3] as unknown[] as Array<Scalar<Value>>,
    // }
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

// TODO: AUDIO: IMPROVE TIMBRE
//  I don't like the jerky sustain being arbitrary .9 or .95 of duration
//  Would be better if it was 100% and instead the problem was solved with a timbre with an attack
//  I don't want to use a sample
//  But maybe the library that @sagittal/material uses has such a timbre
//  No it doesn't, so instead I'm just modifying the envelope a bit.
