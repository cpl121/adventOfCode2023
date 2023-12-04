import { readFileSync } from "fs";
import { chunkArray } from "./utils";

export function challenge4() {
    const fetchData = readFileSync("src/temp/text4.txt", { encoding: 'utf8'})
    const DATA: string[] = chunkArray(fetchData)

    // Part 1
    let totalSum = 0
    for (let index = 0; index < DATA.length; index++) {
        const line = DATA[index];
        const coincidences = getTotalCoincidences(line)
        if (coincidences === 0) {
            totalSum += 0
        } else if (coincidences === 1) {
            totalSum += 1
        } else {
            totalSum += Math.pow(2, coincidences - 1)
        }
    }
    console.log("totalSum", totalSum);
    
    // Part 2
    let bonusCard = new Array(DATA.length).fill(1)
    for (let index = 0; index < DATA.length; index++) {
        const line = DATA[index];
        const coincidences = getTotalCoincidences(line)
        console.log("coincidences", coincidences);
        for (let index_2 = 0; index_2 < coincidences; index_2++) {
            console.log("bonusCard[(index + 1) + index_2]", bonusCard[(index + 1) + index_2], "bonusCard[index + 1]", bonusCard[index + 1], "index", (index + 1) + index_2);
            
            bonusCard[(index + 1) + index_2] = bonusCard[(index + 1) + index_2] + bonusCard[index]
        }
        
    }
    console.log("bonusCard", bonusCard.reduce((a, b) => a + b, 0));
}

function getTotalCoincidences(line: string): number {    
    const numbers = [...line.matchAll(/\: (.*?) \| (.*?)$/g)]
    const winnersNumber = getArrayOfNumber(numbers[0]?.[1])
    const ownNumber = getArrayOfNumber(numbers[0]?.[2])
    const coincidences = getNumberOfCoincidences(winnersNumber, ownNumber)
    return  coincidences
}

function getNumberOfCoincidences(first: string[], second: string[]): number {
    const coincidences = first.filter(number => second.includes(number))    
    return coincidences.length
}

function getArrayOfNumber(line: string): string[] {
    return line.split(" ").filter((item) => item !== "")
}