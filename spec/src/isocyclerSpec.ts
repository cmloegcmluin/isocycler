import { doThing } from "../../src/isocycler"

describe("doThing", (): void => {
    it("runs a test", (): void => {
        const actual = doThing()

        expect(actual.length).toBeGreaterThan(0)
    })
})
