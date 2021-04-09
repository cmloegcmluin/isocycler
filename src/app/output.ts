import {Pun} from "../puns"
import {Count, Duration} from "../puns/types"

const SCALER = 40

const computeSvgString = ([vector, _, rpd]: Pun, durations: Duration[]): string => {
    let squares = ""
    let higherHalfX = 0
    let lowerHalfX = 0
    let higherHalfY = 0
    let lowerHalfY = 0

    // first do the higher half
    vector.forEach((count: Count, countIndex: number) => {
        if (count <= 0) return
        for (let squareIndex = 0; squareIndex < count; squareIndex++) {
            const duration = durations[countIndex]
            squares += `<rect x="${higherHalfX * SCALER}" y="0" height="${duration * SCALER}" width="${duration * SCALER}" style="fill:rgb(255,255,255);stroke-width:1;stroke:rgb(0,0,0)"></rect>`
            higherHalfX += duration
            if (duration > higherHalfY) higherHalfY = duration
        }
    })

    // then do the lower half
    vector.forEach((count: Count, countIndex: number) => {
        if (count >= 0) return
        for (let squareIndex = 0; squareIndex < -count; squareIndex++) {
            const duration = durations[countIndex]
            squares += `<rect x="${lowerHalfX * SCALER}" y="${higherHalfY * SCALER}" height="${duration * SCALER}" width="${duration * SCALER}" style="fill:rgb(255,255,255);stroke-width:1;stroke:rgb(0,0,0)"></rect>`
            lowerHalfX += duration
            if (duration > lowerHalfY) lowerHalfY = duration
        }
    })

    const title = `${vector.toString()}; RPD: ${(rpd * 100).toPrecision(3)}%`

    return `<svg height="${(higherHalfY + lowerHalfY) * SCALER}" width="${Math.max(higherHalfX, lowerHalfX) * SCALER}"><title>${title}</title>${squares}</svg>`
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

const sortPunsByRpd = (puns: Pun[]): void => {
    puns.sort((a: Pun, b: Pun) => a[2] - b[2])
}

const presentPuns = (puns: Pun[], durations: Duration[]) => {
    sortPunsByRpd(puns)

    return formatPuns(puns, durations)
}

export {
    presentPuns,
}

// TODO: WHICH ALL PUNS, DEALING WITH OCTAVES
//  there would also probably be a control to limit how many factors of 2 you allow / octave range
//  This is different than the no exact powers of 2 in them idea, more related to the each voice having a range idea
//  Unless the max norm works as a limiter for that...

// TODO: WHICH ALL PUNS, DEALING WITH OCTAVES
//  I think actually for each vector you should try repeated divisions by the interval of equivalence
//  because any fatter one would just be some multiple or the smaller one, don’t worry about max norm count
//  Or, you know, maybe still do, and that could be the natural way by which it stops going

// TODO: WHICH ALL PUNS, DEALING WITH OCTAVES
//  hey wait, am I potentially being either super-redundant OR leaving a lot of possibilities out
//  By focusing only on a single octave's worth of the scale? Shouldn't it include like at least one octave higher
//  And/or how should you indicate this? I suppose for each voice you'd need to provide its max and min pitch
//  (and its max and min durations) and then it will take those into account when proposing puns
//  I mean I guess it's fine if it proposes puns like C4 contains two C5's, etc.
//  And when doing puns for the "all" category maybe it just tries to find puns that work within the range of all voices
//  So... you should by default start with one voice with a reasonable-ish range

// TODO: WHICH ALL PUNS, DEALING WITH OCTAVES
//  ah, it seems that (probably for EDOs) if you have some pun that looks like say [0, 0, 1, -2, 1, 0, 0, 0]
//  then that pun is going to be true no matter how you translate it
//  meaning that [0, 1, -2, 1, 0, 0, 0, 0] will also be a pun
//  as will [0, 0, 0, 0, 0, 1, -2, 1], etc.
//  and ah ha! that solves a big part of the problem of the where-to-draw-the-bounds across repetitions of the scale
//  like including durations from neighboring octaves
//  because you can think of the whole continuum as a bunch of zeroes
//  all that really matters are the structures from leftmost nonzero to rightmost nonzero
//  you can translate them anywhere you want really
//  so... that's kind of a huge boon to using EDOs to write isocyclic music I'd think
//  otherwise how could you do it, really?
//  well no wait a minute now
//  because you could still have a single structure like this
//  whose leftmost and rightmost nonzero elements were wider apart
//  than a single repetition of the scale, so that doesn't specially treat EDOs over JI
//  well maybe it does
//  okay so if you solved the problem of the different octaves by just,
//  taking what you've already got code-wise, but adding another layer for each tested vector,
//  to see if repeated halving of all different combinations of the durations create new puns
//  then the max length vector (ignoring trailing/leading/whatever zeroes mode note-to-self recent I mean)
//  would be the length of the scale cardinality right?
//  so it would just be the case that for EDOs
//  there are these translatable classes but not for an irregular JI scale/tuning
//  okay I want to talk through an example to prove to myself if we solved this problem
//  and then maybe should write a test for it or whatnot
//  so we could convince ourselves that the repeated halving trick works,
//  that it doesn't create an artificial boundary at the top or bottom of the scale , if
//  (wait just got interrupted by the thought that EDOs are basically just 1-interval tunings,
//  the octave in a sense doesn't matter... does that affect this at all?)
//  you were seeing [0, 1, -1, -1, 1, 0, 0, 0] or whatever,
//  and then of course also  [0, 0, 1, -1, -1, 1, 0, 0] would you also see  [1, 0, 0, 0, 0, 2, -2, -2]
//  aye yaye yaye and how to get it to recognize that as not really new information...
//  unless it *IS* new information?
//  wait, maybe...
//  is it the case that other than 1, any power of 2 as a term is not interesting?
//  because you always know you can replace anything with its own power of 2 of itself...
//  but 3's are interesting still, that's new information

// TODO: WHICH ALL PUNS, DEALING WITH EDO-PUN-CLASSES
//  sort by RPD first and then error, because of all of those puns which are of the same class
//  But increasingly small. or maybe you should only present one of those classes at a time and
//  Give the ability to transpose it to the desired pitch
//  Wait this means that you only have to search them abstractly
//  Meaning... you don't need to worry about vectors with trailing zeroes
//  or rather: any with leading zeroes!

// TODO: WHICH ALL PUNS, DEALING WITH COMPOUND-PUNS
//  somehow you've got to prevent vectors that are just combinations of simpler vectors
//  like i saw one that was like [0, 1, -1, 0, 0, 0, -1] right
//  and another that's like [0, 1, 0, -1, 0, -1, 0]
//  and another that's like [0, 2, -1, -1, 0, -1, -1] which is just the sum of those two...
//  but how would you do that?
//  I guess before you add a pun to the list, ... hmm no I can't figure this one out. kinda hard.
//  This one is not specific to EDOs

// TODO: TOGGLE BETWEEN ALL PUNS AND ONLY PUNS FOR SELECTED
//  when it’s just suggesting all possible starting points it’s different
//  It’s not snap scrolling with one frozen heading
//  Every one is different
//  And if you select it
//  It’s got to add to two rows
//  As much as I like this idea of finding all the possibilities
//  I wonder if it’s really the right way to do it
//      or maybe you still just add one at a time and that’s all you need to do to fix the problem
//  Also maybe there’s just a place aside from any of the voices that you can click
//  and it’s basically “all puns” and it’s what’ll give you these style results
//  And it stays selected when you put one of the two halves in
//  ... wait... if it’s selected; then how does it know where to insert?
//      Maybe it’s just a different control that toggles between all puns and puns for selected
//  - everything you've done so far has just been for all puns mode

//  TODO: WHICH ONLY-FOR-SELECTED PUNS
//   when in only-for-selected mode, ignore max norm
//   (oh just had a random thought: perhaps the max norm shouldn't be a thing user worries about,
//   but should be based on the durations and just calculated automatically based on what could actually possibly help
//   ... or maybe it's a different case for that when in "all" mode vs "pun for this situation" mode)

// TODO: PUNS STUFF
//  And also begin to set it up for success with if you give it for an input an arbitrary target (besides 1)
//  Meaning that it should always start out pre-populated with a list of puns you can achieve with the unit
//  Or rather, all the vector combinations of the notes in the scale, I mean (assuming the bottom one is the unit)
//  But you may also select any sequence of notes you're trying to redo or supplement and it should find puns for it
