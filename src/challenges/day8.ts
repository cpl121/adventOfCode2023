import { readFileSync } from "fs";
import { chunkArray } from "./utils";

enum directionEnum {
    R = 'R',
    L = 'L'
}

export function challenge8() {
    const fetchData = readFileSync("src/temp/text8.txt", { encoding: 'utf8'})
    const DATA: string[] = chunkArray(fetchData)
    const DIRECTIONS = DATA.shift() || ''
    DATA.shift() // Remove br
    let instructionMapped: Map<string, string> = new Map()
    const INSTRUCTIONS = DATA.map((line) => {
        const groups =  [...line.matchAll(/([A-Z]*) = \(([A-Z]*, [A-Z]*)\)/g)]
        instructionMapped.set(groups[0][1], groups[0][2])
        return [groups[0][1], ...groups[0][2].split(",")]
    })
    let stepsCount = 0

    // Part 1
    // let stepsMapped: Map<number, string> = new Map()
    // stepsMapped.set(0,'AAA')

    // Part 2
    const steps = INSTRUCTIONS.filter((inst) => inst[0].endsWith('A')).map((inst) => inst[0])
    let stepsMapped: Map<number, string> = new Map(steps.map((step, index) => [index, step]))
    const STEPS_LENGTH = stepsMapped.size
    console.log("init stepsCount ----> ", stepsCount, " stepsMapped --> ", stepsMapped, ' STEPS_LENGTH -- ', STEPS_LENGTH);

    // Part 1 
    // while (step !== 'ZZZ') {

    // Part 2
    let isFinishedLoop = false
    while (!isFinishedLoop) {
        let direction_index = stepsCount % DIRECTIONS.length
        let direction = DIRECTIONS[direction_index]
        isFinishedLoop = true
        for (let index = 0; index < STEPS_LENGTH; index++) {
            const step = stepsMapped.get(index) || ''           
            const instruction = instructionMapped.get(step)?.split(",") || ''
            if (direction === directionEnum.R) {
                stepsMapped.set(index, instruction[1].trim())
            } else if (direction === directionEnum.L) {
                stepsMapped.set(index, instruction[0].trim())
            }
            // Part 1 
            // isFinishedLoop = isFinishedLoop && (stepsMapped.get(index)?.endsWith('ZZZ') || false)

            // Part 2
            isFinishedLoop = isFinishedLoop && (stepsMapped.get(index)?.endsWith('Z') || false)
        }

        if (stepsCount % 10000000 === 0) {
            console.log("stepsCount ----> ", stepsCount, " stepsMapped --> ", stepsMapped);
        }
        stepsCount++
    }
    console.log("------------ stepsMapped end of loop -------------", stepsMapped, "stepsCount -- ", stepsCount);
}