import { readFileSync } from "fs";
import { chunkArray } from "./utils";

const MAX_RED_CUBES = 12;
const MAX_GREEN_CUBES = 13;
const MAX_BLUE_CUBES = 14;

enum colourCube {
    red = "red",
    green = "green",
    blue = "blue"
}

export function challenge2() {
    const fetchData = readFileSync("src/temp/text2.txt", { encoding: 'utf8'})
    const DATA: string[] = chunkArray(fetchData)
    let totalIds = 0
    for (let index = 0; index < DATA.length; index++) {
        const game = DATA[index];
        const resultGame = evaluateGame(game)
        console.log("resultGame ------", resultGame);
        
        totalIds += resultGame
    }    
    console.log("totalIds", totalIds);

}

function evaluateGame(game: string): number {
    /*  const canRedCubes = canColourSetGoBag(game, colourCube.red)
     const canGreenCubes = canColourSetGoBag(game, colourCube.green)
     const canBlueCubes = canColourSetGoBag(game, colourCube.blue) */
     /* if (canRedCubes && canGreenCubes && canBlueCubes) {
         const gameId =  [...game.matchAll(/Game (.*?):/g)][0][1]
         console.log("gameId", gameId);
         
         return Number(gameId)
     } */
    const fewerRedCubes = fewerNumberByColour(game, colourCube.red)
    const fewerGreenCubes = fewerNumberByColour(game, colourCube.green)
    const fewerBlueCubes = fewerNumberByColour(game, colourCube.blue)

    console.log("fewerRedCubes", fewerRedCubes);
    console.log("fewerGreenCubes", fewerGreenCubes);
    console.log("fewerBlueCubes", fewerBlueCubes);

    return fewerRedCubes * fewerGreenCubes * fewerBlueCubes
}

function fewerNumberByColour(game:string, colour: colourCube): number {
    const regex = RegExp(`(:|,|;) ([0-9]*?) ${colour}`, 'g')
    const coloutSet = [...game.matchAll(regex)];
    let result = 0
    for (let index = 0; index < coloutSet.length; index++) {
        const colourQuantity = Number(coloutSet[index][2]);
        console.log("colourQuantity", colourQuantity);
        
        if (colourQuantity > result) {
            result = colourQuantity
        }
    }

    return result
}

function canColourSetGoBag(game: string, colour: colourCube): boolean {
    const regex = RegExp(`(:|,|;) ([0-9]*?) ${colour}`, 'g')
    const coloutSet = [...game.matchAll(regex)];
    for (let index = 0; index < coloutSet.length; index++) {
        const set = coloutSet[index];
        switch (colour) {
            case colourCube.red:
                if (Number(set[2]) > MAX_RED_CUBES) return false
                break;
            case colourCube.green:
                if (Number(set[2]) > MAX_GREEN_CUBES) return false
                break;
            case colourCube.blue:
                if (Number(set[2]) > MAX_BLUE_CUBES) return false
                break;
        
            default:
                break;
        }
    }
    
    return true
}

/* function getTotalCubesByColour(game: string, colour: colourCube): number {
    const regex = RegExp(`(:|,|;) ([0-9]*?) ${colour}`, 'g')
    const coloutSet = [...game.matchAll(regex)];
    let totalCubes = 0
    for (let index = 0; index < coloutSet.length; index++) {
        const set = coloutSet[index];        
        totalCubes += Number(set[2])
    }
    
    return totalCubes
} */