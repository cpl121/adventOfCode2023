export const chunkArray = (data: string): string[] => {
    let index = 0;
    let arrayLength = data.length;
    let tempArray: string[] = [];
    let tempArray2: string[][] = [[]];
    let result: string[] = [];
    let count = 0;
    
    for (index = 0; index < arrayLength; index++) {
        let myChunk = data.slice(index, index + 1);
        myChunk && tempArray.push(myChunk);
    }

    for (let i = 0; i < tempArray.length; i++) {
        const element = tempArray[i];
        if (element === '\n') {
            count++;
            tempArray2.push([]);
            continue
        }
        tempArray2[count].push(element);
    }

    result = tempArray2.map((item) => {
        return item.join('');
    })

    return result;
}