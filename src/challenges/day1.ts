import { readFileSync } from "fs";
import { chunkArray } from "./utils";

export function challenge1() {
    const fetchData = readFileSync("src/temp/text1.txt", { encoding: 'utf8'})
    const DATA: string[] = chunkArray(fetchData)
    let totalSum = 0
    for (let index = 0; index < DATA.length; index++) {
        const line = DATA[index];
        const resultLine = getCalibrationValue(line)
        console.log("resultLine", resultLine, "index", index + 1);
        
        totalSum += resultLine
    }    
    console.log("totalSum", totalSum);

}

function getCalibrationValue(line: string): number {
    // const array = [...line.matchAll(/[0-9]/g)];
    const array = [...line.matchAll(/[0-9]|one|two|three|four|five|six|seven|eight|nine/g)];
    
    const firstNumber = getNumber(array[0]?.[0])
    const lastNumber = getNumber(array[array.length - 1]?.[0])
    
    return Number(firstNumber + lastNumber)
}

function getNumber(number: string): string { 
    let result = ""
    if (!isNaN(Number(number))) {
        result = number
    } else {
        switch (number) {
            case "one":
                result = "1"
                break
            case "two":
                result = "2"
                break
            case "three":
                result = "3"
                break
            case "four":
                result = "4"
                break
            case "five":
                result = "5"
                break
            case "six":
                result = "6"
                break
            case "seven":
                result = "7"
                break
            case "eight":
                result = "8"
                break
            case "nine":
                result = "9"
                break
        
            default:
                break;
        }
    }
    return result
}