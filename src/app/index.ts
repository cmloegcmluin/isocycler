import {
    buildEdoWrapper,
    buildMaxNormWrapper,
    buildMaxRpdWrapper,
    buildRepetitionRangeWrapper,
    buildResults,
} from "./components"
import {handleChange} from "./handlers"

const root: HTMLDivElement = document.createElement("div")
document.body.appendChild(root)

root.appendChild(buildEdoWrapper())
root.appendChild(buildMaxNormWrapper())
root.appendChild(buildMaxRpdWrapper())
root.appendChild(buildRepetitionRangeWrapper())
root.appendChild(buildResults())

handleChange()
