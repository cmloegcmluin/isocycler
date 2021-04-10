export {Edo, Unpunniness, Norm, Max, Pun} from "./types"
export {computePuns} from "./puns"
export {computeEdoBasePeriodDurations} from "./edo"

// TODO: PUNS, EXCLUDING COMPOUND-PUNS WITH FANCY LINEAR ALGEBRA
//  somehow you've got to prevent vectors that are just combinations of simpler vectors
//  like i saw one that was like [0, 1, -1, 0, 0, 0, -1] right
//  and another that's like [0, 1, 0, -1, 0, -1, 0]
//  and another that's like [0, 2, -1, -1, 0, -1, -1] which is just the sum of those two...
//  but how would you do that?
//  I guess before you add a pun to the list, ... hmm no I can't figure this one out. kinda hard.
//  This one is not specific to EDOs
//  - Wait if you disallow powers of 2, does that somehow already solve the problem of compound vectors in the results?
//  What if you had [5,-6]
//  And [-4, 5]
//  Sum is [1, -1]
//  so... no
//  - But maybe this is just one of those things you can do as a pass if you’re precomputing these things
//  - But what about when you aren’t precomputing
//  On the fly for a random special Scala file ?
//  Might need to do a Hermite Normal Form, or Lenstra–Lenstra–Lovász, or Row Echelon Form, or Minimal Generating Set
//  Or normal, or kernel, or minimal spanning set, something like that
//  - Or, just my own dumb probably incomplete or horribly inefficient solution I came up with while unable to sleep:
//  Find every combination of 2 vectors, then see if any of those are equal to any of the original vectors
//  If so, eliminate them, and if any were eliminated this round, then repeat the process

// TODO: PUNS, ALL PUNS MODE PRECOMPUTING
//  I might have to do asynchronous population of them now, so it doesn’t block or crash and you can see it progress
//  Or precompute any anyone would ever want, and use controls to filter it; data might be big, but filtering is fast
//  What range, then? Let’s say 8 octaves b/c piano >7. The norm range then be 1 to 2^7, which is 128. That’s crazy huge

// TODO: PUNS, EXCLUDING POWERS OF 2 (OR REPETITIONS IN GENERAL) BUT ONLY SELECTIVELY
//  - We assume octave equivalence for now; it has just been baked in
//  I accept dealing with it later if want to compose isocyclic Bohlen-Pierce with tritave-equivalence
//  Though this statement should probably be expressed somewhere as a test (of computeDurations method)
//  And/or you could do something smart related to how Scala files use the last pitch as its period
