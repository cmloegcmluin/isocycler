import {Vector} from "./types"

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
//  - So for this to work though, literally everything in one half must be a power of two
//  So that the entire half can be reduced
//  ...is there maybe an easier way? like just, if there are any powers of 2, just replace them if possible with
//  the higher up version? but then you know still reject it if that results in a leading zero and ET is checked...
//  - This also might be affected by whatever you do for the linear algebra redundancy elimination
//  Though probably not because that will have no idea about how every period's worth of counts are related

const vectorContainsNoPowersOfTwo = (vector: Vector): boolean => {
    for (const count of vector) {
        const absCount = Math.abs(count)
        if (absCount > 1 && Math.log2(absCount) % 1 === 0) {
            return false
        }
    }
    return true
}

export {
    vectorContainsNoPowersOfTwo,
}
