export {Edo, Unpunniness, Norm, Max, Pun, Vector} from "./types"
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
//  - Alright, so I just tried it for that above example: https://www.wolframalpha.com/input/?i=kernel+calculator&assumption=%7B%22F%22%2C+%22NullSpace%22%2C+%22theMatrix%22%7D+-%3E%22%7B%7B0%2C1%2C-1%2C0%2C0%2C0%2C-1%7D%2C%7B0%2C1%2C0%2C-1%2C0%2C-1%2C0%7D%2C%7B0%2C2%2C-1%2C-1%2C0%2C-1%2C-1%7D%7D%22
//  And what it gives me back is
//  (0 | 1 | 0 | -1 | 0 | -1 | 0
//   0 | 0 | 1 | -1 | 0 | -1 | 1
//   0 | 0 | 0 | 0  | 0 | 0  | 0)
//  Which reveals to me a problem: when reducing rows of commas in RTT, it's fine, because each row = 0
//  i.e. they're all tempered out
//  But in isocycler's case, they all have some tiny error, that's different for each one
//  So while this basically did what I hoped: return a row of all 0's indicating that it figured out one was redundant
//  The two remaining results if you compare them with the originals are clearly not as close of puns as they should be
//  So what I really need for isocycler is something else... or you just accept the problem as what you get with higher
//  max norm...
