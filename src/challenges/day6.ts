import { readFileSync } from "fs";
import { chunkArray } from "./utils";

const TIME_REGEX: RegExp = RegExp('Time\:((?: +[0-9]+)+)', 'g')
const DISTANCE_REGEX: RegExp = RegExp('Distance\:((?: +[0-9]+)+)', 'g')

export function challenge6() {
    const fetchData = readFileSync("src/temp/text6.txt", { encoding: 'utf8'})
    const DATA: string[] = chunkArray(fetchData)
    const TIME = [...DATA[0].matchAll(TIME_REGEX)][0][1].split(" ").filter(Boolean)
    const DISTANCE = [...DATA[1].matchAll(DISTANCE_REGEX)][0][1].split(" ").filter(Boolean)
    const RACES_LENGTH = TIME.length
    const RESULT_PER_RACE: number[] = new Array(RACES_LENGTH).fill(0)

    // Part 1
    for (let index = 0; index < RACES_LENGTH; index++) {
        const _time = Number(TIME[index]);
        const _distance = Number(DISTANCE[index]);
        let beatTheRecord = 0
        
        for (let index_2 = 0; index_2 < (_time + 1); index_2++) {
            let ownDistance = getOwnDistancia(index_2, _time)
            if (ownDistance > _distance) {
                beatTheRecord++
            }
        }
        RESULT_PER_RACE[index] = beatTheRecord
    }
    console.log("RESULT_PER_RACE", RESULT_PER_RACE);
    console.log("RESULT_PER_RACE sum", RESULT_PER_RACE.reduce((a,b) => a * b, 1));

    // Part 2
    const TIME_2 = Number(TIME.join(""))
    const DISTANCE_2 = Number(DISTANCE.join(""))
    let totalResult = 0
    for (let index = 0; index < (TIME_2 + 1); index++) {
        let ownDistance = getOwnDistancia(index, TIME_2)
        if (ownDistance > DISTANCE_2) {
            totalResult++
        }
    }
    console.log("totalResult", totalResult);
    
}

function getOwnDistancia(time: number, maxTime: number): number {
    return (maxTime - time) * time
}