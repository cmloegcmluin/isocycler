import {setupAudio} from "./audio"
import {
    buildEdoWrapper,
    buildEtWrapper,
    buildMaxNormWrapper,
    buildMaxUnpunninessWrapper,
    buildPeriodsWrapper,
    buildResults,
    buildStop,
} from "./components"
import {handleChange} from "./handlers"

const root: HTMLDivElement = document.createElement("div")
document.body.appendChild(root)

root.appendChild(buildEdoWrapper())
root.appendChild(buildEtWrapper())
root.appendChild(buildMaxNormWrapper())
root.appendChild(buildMaxUnpunninessWrapper())
root.appendChild(buildPeriodsWrapper())
root.appendChild(buildStop())
root.appendChild(buildResults())

setupAudio().then()

handleChange()

// TODO: CODE CLEANLINESS
//  globals should be used for puns so you don't have to pass them around a lot

// TODO: UI FINESSE: CONTROLS FOR PLAYBACK OF INDIVIDUAL PUNS
//  - There should be a loop checkbox, and only if it's checked does the stop button appear
//  - might be cool to just randomize the notes, or make that a checkbox

// TODO: UI FINESSE: DON'T CRASH
//  It should compute the combinations w/ repetitions count (see precompute.ts) and abort if too big (with message)

// TODO: UI FINESSE: SORTING & FILTERING PUNS
//  Maybe there's a better way to sort the puns than by unpunniness, because who really cares about that as long as
//  it's within your tolerance. instead maybe it should sort them by norm, how many notes there are I mean.
//  Or maybe ability to change what they're sorted by is a good feature to have
//  - It would also be good if you could filter by things like "must include note A" or "must not include note B"

// TODO: UI FINESSE: DEMOING SOUND OF PUNS
//  you should be able to click any of the puns in the bank to demo it (hear it)

// TODO: UI FINESSE: TRANSPOSING PUNS
//  if equal tempered is checked, then there should be arrows up/down that appear next to each pun class
//  to cycle through its transpositions

// TODO: UI FUNDAMENTALS, ALL PUNS MODE VS SPECIFIC PUNS MODE
//  - One of the UI controls will be a toggle between all puns and specific puns
//  - when in specific puns mode, there's one frozen heading, the specific selection
//  and the scrolling part is one half of a pun at a time
//  but when in all puns mode, It’s not snap scrolling with one frozen heading
//  Every one is a different combination of two halves,
//  And either of those halves could be clicked to insert

// TODO: UI FINESSE: IMPORT SCALA FILE OR CHOOSE FROM COMMON TUNINGS
//  Would be cool if you could also check JI pitches up to a certain odd limit or something (including e.g. 3/2)
//  Or really, it should just be able to take an arbitrary scale (.scl file) and use its pitches as the building block
//  (Or equivalently a set of durations, a duration scale, if you're thinking like that)
//  Or select from a set of obvious common choices, like 12-EDO, a harmonic mode
//  - It could automatically determine if it is equal tempered, so you could eliminate that checkbox
//  Tunings to include: EDO (n), JI (p-limit & o-limit), MOS (g and cardinality), CPS (k & n), EFG
//  Meaning that you'd select type and then it would drop in whatever other controls you needed to make those tunings
//  - We assume octave equivalence for now; it has just been baked in
//  I accept dealing with it later if want to compose isocyclic Bohlen-Pierce with tritave-equivalence
//  Though this statement should probably be expressed somewhere as a test (of computeDurations method)
//  And/or you could do something smart related to how Scala files use the last pitch as its period

// TODO: UI HUGE: SCORE EXPORT:
//  it can generate sheet music through Lilypond or something, w/ normal staff notation & squares supplement
//  or I guess at least you can download the SVGs so you could drag them into your score software and supplement
//  that would be a good first step, just yank what you can from StaffCode's export

// TODO: UI FUNDAMENTALS, MISC:
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
//  - perhaps a feature to snap something exactly to a unit bar, or whatever else
//  - a checkbox for turning on/off spectral color
//  - Another checkbox for shade by proximity to pitches in the scale (in case you ever slide pitches away from it)

// TODO: UI FUNDAMENTALS: ROOT HZ VS TEMPO VS CYCLE COUNT CONTROLS
//  inputs and locking feature
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
//  and eventually the error should be displayed in terms of seconds

// TODO: UI FINESSE: SAVE STATE
//  Store GUI state in cookies & params like how StaffCode does

