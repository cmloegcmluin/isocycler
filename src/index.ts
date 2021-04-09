// TODO: KINDA RELATED TO ALL PUNS BUT MORE ABOUT THE INTERFACE
//  Would be cool if you could also check JI pitches up to a certain odd limit or something (including e.g. 3/2)
//  Or really, it should just be able to take an arbitrary scale (.scl file) and use its pitches as the building block
//  (Or equivalently a set of durations, a duration scale, if you're thinking like that)
//  Or select from a set of obvious common choices, like 12-EDO, a harmonic mode

// TODO: HUGE: it can generate sheet music through Lilypond or something, w/ normal staff notation & squares supplement

// TODO: HUGE: it should be able to compose some generative music as some of a way of demonstrating the energy

// TODO: visual interface where you can:
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

// TODO: eventually the error should be displayed in terms of seconds

// TODO: plug in @musical-patterns/material to perform it (or however houndstoothtopia does it)
//  The default timbre should probably have a weak-ish attack to help cover up the inexact onsets

// TODO: maybe there's a better way to sort the puns than by RPD, because who really cares about that as long as
//  it's within your tolerance. instead maybe it should sort them by norm, how many notes there are I mean.
//  Or maybe ability to change what they're sorted by is a good feature to have

// TODO: you should be able to click any of the puns in the bank to demo it (hear it)
