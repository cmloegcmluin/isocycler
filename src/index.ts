import { doThing } from "./isocycler"

const root: HTMLDivElement = document.createElement("div")
const output = doThing()
root.innerText = `Hello World ${output}`
document.body.appendChild(root)
