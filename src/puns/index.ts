export {Edo, Unpunniness, Norm, Max, Pun} from "./types"
export {computePuns} from "./puns"
export {computeEdoBasePeriodDurations} from "./edo"

// TODO: PUNS, EXCLUDING POWERS OF 2 (OR REPETITIONS IN GENERAL) BUT ONLY SELECTIVELY
//  in other words this should actually be [-1,0,0, 0,0,0, 0,5,0]
//  (in computePuns test,             // [[-4, 5, 0], -0.03149737007950115, 0.007905467700100489] as Pun,)
//  because you have to shift the -4 down two octaves
//  (first to -2 then to -1)
//  so you have to shift the 5 over to octaves, first to that next right 3-EDO vector chunk 0,0,0 then again
//  - Though, later, I note that if you eliminate these powers of 2 like this
//  You should think about whether that'd eliminate actually useful results
//  Like for example these two results are eliminated
//  until you increase the periods to accommodate them
//  But is that really right? Shouldn't we have kept them? (Later: yes, yes we should have)
//  I feel like there might be a slightly more complex condition we need to meet
//  Which says to only throw away powers of 2 if it's provable that you could reduce the power of 2
//  And shift everything to the right by that much while staying within the count of periods
//  But then it's a question of whether you want to go ahead and do that right away, or let the process
//  Run its course and get there on its own, i.e. which way is more efficient computationally. Dunno.
//  For now I say: yeah, just let it get there. Just add an extra condition on the exclusion of those powers of 2.
//  - We assume octave equivalence for now; it has just been baked in
//  I accept dealing with it later if want to compose isocyclic Bohlen-Pierce with tritave-equivalence
//  Though this statement should probably be expressed somewhere as a test (of computeDurations method)
//  And/or you could do something smart related to how Scala files use the last pitch as its period

// TODO: PUNS, EXCLUDING PUNS THAT HAVE A NOTE IN ONE HALF WITH A POWER-OF-TWO OF THE SAME NOTE IN THE OTHER HALF
//  Consider the following 12-EDO pun: [-1,0,0,0, 0,1,0,0, 0,0,0,-1,
//                                       1,0,0,0, 0,0,0,0, 0,0,1     ]
//  You can see how it has both a low D (the first -1) and a high D (the first 1 on the 2nd row)
//  This pun should be rejected because you know the exact relationship between low D and high D
//  So you could subtract the same amount from both halves, a high D, to eliminate the high D on one side
//  And turn the low D into a high D
//  At which point you'd have [ 0,0,0,0, 0,1,0,0, 0,0,0,-1,
//                             -1,0,0,0, 0,0,0,0, 0,0,1     ]
//  But then you need to shift (because it's equal tempered, so only the class w/ no leading zeroes matters)
//  So you get [ 1,0,0, 0,0,0,-1, -1,0,0,0, 0,0,0,0, 0,0,1]

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

// TODO: PUNS, EFFICIENCY OF CALCULATION
//  Also probably some stuff we could do for efficiency not checking ones
//  that are just like ones that didn’t work but could only be worse
//  Like save the result from the error calculation
//  And if keeping going could bring it to the sweet spot keep going but if you passed it then don’t keep going
//  Well except you might still want to keep going
//  because keeping going on that index might be necessary positioning for a later index
//  It’s just that you wouldn’t have to bother expending resources on checking the intermediate
