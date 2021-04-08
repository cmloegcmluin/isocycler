import {buildEdoWrapper, buildMaxNormWrapper, buildMaxRpdWrapper, buildResults} from "./components"
import {handleChange} from "./handlers"

const root: HTMLDivElement = document.createElement("div")
document.body.appendChild(root)

root.appendChild(buildEdoWrapper())
root.appendChild(buildMaxNormWrapper())
root.appendChild(buildMaxRpdWrapper())
root.appendChild(buildResults())

handleChange()
