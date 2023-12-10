import { readFileSync } from "fs";
import { chunkArray } from "./utils";

export function challenge9() {
    const fetchData = readFileSync("src/temp/text9.txt", { encoding: 'utf8'})
    const DATA: string[] = chunkArray(fetchData)

    let totalSumSteps = 0
    let totalSumSteps_2 = 0
    for (let index = 0; index < DATA.length; index++) {
        const step = DATA[index];
        let stepsMapped: Map<number, number[]> = new Map(step.split(" ").map((step, index) => [index, [Number(step)]]))
        const STEPS_LENGTH = stepsMapped.size
        let isFinishedLoop = false
        let tree_index = -1
        while(!isFinishedLoop) {
            tree_index++
            isFinishedLoop = true
            for (let step_index = 0; step_index < STEPS_LENGTH - (tree_index + 1); step_index++) {
                const actualStep = stepsMapped.get(step_index) || []
                const nextStep = stepsMapped.get(step_index + 1) ?? []
                stepsMapped.set(step_index, [...actualStep, nextStep[tree_index] - actualStep[tree_index]])

                isFinishedLoop = isFinishedLoop && (stepsMapped.get(step_index)?.[(tree_index + 1)] === 0)
            }
        }

        const part1StepsMapped = structuredClone(stepsMapped)
        const part2StepsMapped = structuredClone(stepsMapped)
        for (let finishStep = 0; finishStep < (STEPS_LENGTH + 1); finishStep++) {
            const actualStep = part1StepsMapped.get(finishStep) || []
            const prevStep = part1StepsMapped.get(finishStep - 1) ?? []
            part1StepsMapped.set(finishStep, [...actualStep, (prevStep[prevStep.length - 1] || 0) + (prevStep[prevStep.length - 2] || 0)])
        }        
        const result = part1StepsMapped.get((part1StepsMapped.size - 1)) || []
        totalSumSteps += result[result.length - 1]

        // Part 2
        const firstRow = part2StepsMapped.get(0) ?? []
        const length_2 = firstRow.length
        for (let finishStep = 0; finishStep < (length_2 + 1); finishStep++) {
            const actualStep = part2StepsMapped.get(-1) || []
            part2StepsMapped.set(-1, [((firstRow[firstRow.length - finishStep] || 0) - (actualStep[0] || 0)), ...actualStep])
        }

        const result_2 = part2StepsMapped.get(-1) || []
        totalSumSteps_2 += result_2[0]
    }
    console.log("totalSumSteps", totalSumSteps);
    console.log("totalSumSteps_2", totalSumSteps_2);
}
