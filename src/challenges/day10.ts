import { readFileSync } from "fs";
import { createMatrix, initMatrix, sideEnum } from './helpers/matrix'
import { chunkArray } from "./utils";

const fetchData = readFileSync("src/temp/text10.txt", { encoding: 'utf8'})
const DATA: string[] = chunkArray(fetchData)
const matrix = createMatrix(DATA)
const matrixSolution = initMatrix(matrix)

export function challenge10() {
    console.log("matrix", matrix);
    console.log("matrixSolution", matrixSolution);
    const initCoords = searchInitPostion(fetchData, DATA[0].length)
    console.log("initCoords", initCoords);
    updatePosition(initCoords)
    console.log("matrixSolution FINAL", matrixSolution);
}


function searchInitPostion(fetchData: string, lineLength: number): number[] {
    const indexPosition = fetchData.match(/S/)?.index || 0
    console.log(" fetchData.match(/S/)",  fetchData.match(/S/));
    console.log(" indexPosition",  indexPosition);
    console.log(" (indexPosition % lineLength)",  (indexPosition % lineLength));
    
    return [Math.floor(indexPosition/lineLength), (indexPosition % (lineLength + 1)) - 1]
}

function canMove(position: number[], side: sideEnum): boolean {
    let canMovePosition = false
    const rowLength = matrix[0].length
    const colLength = matrix[1].length
    switch (side) {
        case sideEnum.R:
            canMovePosition = (position[1] + 1 <= rowLength - 1) && ((matrix[position[0]][position[1] + 1] === '-') || (matrix[position[0]][position[1] + 1] === '7') || (matrix[position[0]][position[1] + 1] === 'J'))
            /* console.log("sideEnum.R", (matrix[position[0]][position[1] + 1]), "canMovePosition", canMovePosition) */
            /* if (canMovePosition) {
                matrixSolution[position[0]][position[1] + 1] = matrixSolution[position[0]][position[1]] + 1
            } */
            break;
        case sideEnum.L:
            canMovePosition = (position[1] - 1 >= 0) && ((matrix[position[0]][position[1] - 1] === '-') || (matrix[position[0]][position[1] - 1] === 'F') || (matrix[position[0]][position[1] - 1] === 'L'))
            /* console.log("sideEnum.L", (matrix[position[0]][position[1] - 1]), "canMovePosition", canMovePosition) */
            /* if (canMovePosition) {
                matrixSolution[position[0]][position[1] - 1] = matrixSolution[position[0]][position[1]] + 1
            } */
            break;
        case sideEnum.T:
            canMovePosition = (position[0] - 1 >= 0) && ((matrix[position[0] - 1][position[1]] === '|') || (matrix[position[0] - 1][position[1]] === '7') || (matrix[position[0] - 1][position[1]] === 'F'))
            /* console.log("sideEnum.T", (matrix[position[0] - 1][position[1]]), "canMovePosition", canMovePosition) */
            /* if (canMovePosition) {
                matrixSolution[position[0] - 1][position[1]] = matrixSolution[position[0]][position[1]] + 1
            } */
            break;
        case sideEnum.B:
            canMovePosition = (position[0] + 1 <= colLength) && ((matrix[position[0] + 1][position[1]] === '|') || (matrix[position[0] + 1][position[1]] === 'J') || (matrix[position[0] + 1][position[1]] === 'L'))
            /* console.log("sideEnum.B", (matrix[position[0] + 1][position[1]]), "canMovePosition", canMovePosition) */
            /* if (canMovePosition) {
                matrixSolution[position[0] + 1][position[1]] = matrixSolution[position[0]][position[1]] + 1
            } */
            break;
    
        default:
            break;
    }
    return canMovePosition
}

function updatePosition(position: number[]) {
    console.log("matrixSolution", matrixSolution, "position", position, "matrixSolution[position[0]][position[1]]", matrixSolution[position[0]][position[1]]);
    if (canMove(position, sideEnum.R) && matrixSolution[position[0]][position[1] + 1] === 0) {
        matrixSolution[position[0]][position[1] + 1] = matrixSolution[position[0]][position[1]] + 1
        updatePosition([position[0], position[1] + 1])
    }
    if (canMove(position, sideEnum.L)  && matrixSolution[position[0]][position[1] - 1] === 0) {
        matrixSolution[position[0]][position[1] - 1] = matrixSolution[position[0]][position[1]] + 1
        updatePosition([position[0], position[1] - 1])
    }
    if (canMove(position, sideEnum.T)  && matrixSolution[position[0] - 1][position[1]] === 0) {
        matrixSolution[position[0] - 1][position[1]] = matrixSolution[position[0]][position[1]] + 1
        updatePosition([position[0] - 1, position[1]])
    }
    if (canMove(position, sideEnum.B)  && matrixSolution[position[0] + 1][position[1]] === 0) {
        matrixSolution[position[0] + 1][position[1]] = matrixSolution[position[0]][position[1]] + 1
        updatePosition([position[0] + 1, position[1]])
    }
}