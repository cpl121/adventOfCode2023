import { readFileSync } from "fs";
import { chunkArray } from "./utils";

const numberRegex: RegExp = RegExp('[0-9]+', 'g')
const symbolRegex: RegExp = RegExp('[^a-zA-Z0-9.]', 'g')

export function challenge3() {
    const fetchData = readFileSync("src/temp/text3.txt", { encoding: 'utf8'})
    const DATA: string[] = chunkArray(fetchData)
    let totalSum = 0
    let totalSum2 = 0
    for (let index = 0; index < DATA.length; index++) {
        const line = DATA[index];
        const numbersOfTheLine = [...line.matchAll(numberRegex)];
        for (let index_2 = 0; index_2 < numbersOfTheLine.length; index_2++) {
            const lineToEvaluate = numbersOfTheLine[index_2];
            let LINES_TO_EVALUATE: string[] = []
            if (index === 0) {
                LINES_TO_EVALUATE = [
                    DATA[index],
                    DATA[index + 1],
                ]
            } else if (index === (DATA.length - 1)) {
                LINES_TO_EVALUATE = [
                    DATA[index - 1],
                    DATA[index],
                ]
            } else {
                LINES_TO_EVALUATE = [
                    DATA[index - 1],
                    DATA[index],
                    DATA[index + 1],
                ]
            }
            const _hasSymbolAdjacent = hasSymbolAdjacent(lineToEvaluate, LINES_TO_EVALUATE)
            totalSum += _hasSymbolAdjacent ? Number(lineToEvaluate[0]) : 0
        }

        const symbolOfTheLine = [...line.matchAll(/\*/g)];
        for (let index_2 = 0; index_2 < symbolOfTheLine.length; index_2++) {
            let LINES_TO_EVALUATE: string[] = []
            if (index === 0) {
                LINES_TO_EVALUATE = [
                    DATA[index],
                    DATA[index + 1],
                ]
            } else if (index === (DATA.length - 1)) {
                LINES_TO_EVALUATE = [
                    DATA[index - 1],
                    DATA[index],
                ]
            } else {
                LINES_TO_EVALUATE = [
                    DATA[index - 1],
                    DATA[index],
                    DATA[index + 1],
                ]
            }
            const lineToEvaluate = symbolOfTheLine[index_2];
            const gearRatio = getGearRatio(lineToEvaluate, LINES_TO_EVALUATE)
            totalSum2 += gearRatio
        }
    }

    console.log("totalSum", totalSum);
    console.log("totalSum2", totalSum2);
}

function getGearRatio(data: RegExpMatchArray, lines: string[]): number {
    const numberIndex = data.index
    let adjacentNumbers: number[] = []
    

    for (let index = 0; index < lines.length; index++) {
        const line_2 = lines[index];
        
        const numberOfTheLine = [...line_2.matchAll(numberRegex)];
        
        for (let index_2 = 0; index_2 < numberOfTheLine.length; index_2++) {
            const numberToEvaluate = numberOfTheLine[index_2];
            const elementIndex = numberToEvaluate.index

            if ((numberIndex >= (elementIndex - 1)) && (numberIndex <= (elementIndex + numberToEvaluate[0].length))) {           
                /* console.log("works", element); */
                adjacentNumbers.push(Number(numberToEvaluate[0]))
            }
        }
    }
    console.log("adjacentNumbers", adjacentNumbers);
    
    if (adjacentNumbers.length >= 2) {
        return adjacentNumbers[0] * adjacentNumbers[1]
    }

    return 0
}

function hasSymbolAdjacent(data: RegExpMatchArray, lines: string[]): boolean  {
    const numberLength = data[0].length
    const numberIndex = data.index
    
    for (let index = 0; index < lines.length; index++) {
        const line_2 = lines[index];
        const symbolsOfTheLine = [...line_2.matchAll(symbolRegex)];
        for (let index_2 = 0; index_2 < symbolsOfTheLine.length; index_2++) {
            const element = symbolsOfTheLine[index_2];
            const elementIndex = element.index

            if ((elementIndex >= (numberIndex - 1)) && (elementIndex <= (numberIndex + numberLength))) {                
                return true
            }
        }
    }

    return false
}
