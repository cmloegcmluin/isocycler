import {Edo, Max, Norm, Unpunniness} from "../puns"
import {Periods} from "../puns/types"

interface Components {
    edoInput: HTMLInputElement,
    maxNormInput: HTMLInputElement,
    maxUnpunninessInput: HTMLInputElement,
    periodsInput: HTMLInputElement,
    etCheckbox: HTMLInputElement,
    results: HTMLDivElement,
    loopCheckbox: HTMLInputElement,
    stopButton: HTMLButtonElement,
}

interface GuiState {
    edo: Edo,
    maxNorm: Max<Norm>,
    maxUnpunniness: Max<Unpunniness>,
    periods: Periods,
    isEt: boolean,
    loop: boolean,
}

type Color = [number, number, number]

export {
    Components,
    Color,
    GuiState,
}
