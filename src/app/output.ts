import {Pun} from "../puns"

const formatPuns = (puns: Pun[]): string => {
    return puns.reduce(
        (punOutput: string, [vector, error, rpd]: Pun): string => {
            return punOutput + vector.toString() + "; error: " + error.toPrecision(3) + "; RPD: " + (rpd * 100).toPrecision(3) + "%\n"
        },
        "",
    )
}

const sortPunsByRpd = (puns: Pun[]): void => {
    puns.sort((a: Pun, b: Pun) => a[2] - b[2])
}

export {
    formatPuns,
    sortPunsByRpd,
}
