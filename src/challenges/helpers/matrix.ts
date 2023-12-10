export enum sideEnum {
    R = 'right',
    L = 'left',
    T = 'top',
    B = 'bottom',
}

export function createMatrix(data: string[]): string[][] {
    let result: string[][] = [[]]
    for (let i = 0; i < data.length; i++) {
        result[i] = data[i].split('');
    }
    return result
}

export function initMatrix(data: string[][]): number[][] {
    let result: number[][] = [[]]
    for (let i = 0; i < data.length; i++) {
        result[i] = []
        for (let j = 0; j < data[i].length; j++) {
            result[i][j] = 0
        }
    }
    return result
}