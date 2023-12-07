import { readFileSync } from "fs";
import { chunkArray } from "./utils";

enum handType {
    fiveOfAKind,
    fourOfAKind,
    fullHouse,
    threeOfAKind,
    twoPair,
    onePair,
    highCard,
}

enum broadwayCard {
    A= "A",
    K= "K",
    Q= "Q",
    J= "J",
    T= "T"
}

export function challenge7() {
    const fetchData = readFileSync("src/temp/text7.txt", { encoding: 'utf8'})
    const DATA: string[] = chunkArray(fetchData)
    const ORDERED_HANDS = bubbleSort(DATA)
    // console.log("ORDERED_HANDS", ORDERED_HANDS.reverse().toString());
    console.log("calculateTotalWinnings", calculateTotalWinnings(ORDERED_HANDS));
}

function bubbleSort(data: string[]): string[] {
    const DATA_LENGTH = data.length;
  
    for (let index = 0; index < DATA_LENGTH - 1; index++) {
      for (let index_2 = 0; index_2 < DATA_LENGTH - index - 1; index_2++) {
        const isStronger = checkStrongHand(data[index_2], data[index_2 + 1])
        if (isStronger) {
          const temp = data[index_2];
          data[index_2] = data[index_2 + 1];
          data[index_2 + 1] = temp;
        }
      }
    }
  
    return data;
}

function checkStrongHand(hand1: string, hand2: string): boolean {
    const onlyHand1 = hand1.match(/^.{5}/)?.[0] ?? ''
    const onlyHand2 = hand2.match(/^.{5}/)?.[0] ?? ''

    const strengthHand1 = checkTypeOfHand(onlyHand1)
    const strengthHand2 = checkTypeOfHand(onlyHand2)

    if (strengthHand1 === strengthHand2) {
        return ishHighCard(onlyHand1, onlyHand2)
    } else {
        return strengthHand1 < strengthHand2
    }
}

function checkTypeOfHand(hand: string): handType {
    const destructedHand = hand.split("")
    const duplicatedRecord = countDuplicated(destructedHand)
    let coincidences = Math.max(...Object.values(duplicatedRecord))
    
    // Part 2
    const hasJoker = Object.keys(duplicatedRecord).includes(broadwayCard.J)
    if (hasJoker) {
        const duplicatedWithoutJ = Object.entries(duplicatedRecord).filter((asd) => asd[0] !== broadwayCard.J).map((num) => num[1])        
        coincidences = duplicatedWithoutJ.length === 0 ? 0 : Math.max(...duplicatedWithoutJ)
        coincidences += duplicatedRecord[broadwayCard.J]
    }
    
    if (coincidences === 5) {
        return handType.fiveOfAKind
    } else if (coincidences === 4) {
        return handType.fourOfAKind
    } else if((coincidences === 3 && Object.values(duplicatedRecord).length === 2) || (coincidences === 3 && hasJoker && Object.values(duplicatedRecord).length === 3)) {
        return handType.fullHouse
    } else if(coincidences === 3) {
        return handType.threeOfAKind
    } else if((coincidences === 2 && Object.values(duplicatedRecord).length === 3) || (coincidences === 2 && hasJoker && Object.values(duplicatedRecord).length === 4)) {
        return handType.twoPair
    } else if(coincidences === 2) {
        return handType.onePair
    } else {
        return handType.highCard
    }
}

function countDuplicated(array: string[]): Record<string, number> {
    const duplicated: Record<string, number> = {};
  
    array.forEach(card => {
      duplicated[card] = (duplicated[card] || 0) + 1;
    });
  
    return duplicated;
}

function ishHighCard(hand1: string, hand2: string): boolean {
    for (let index = 0; index < hand1.length; index++) {
        const card1 = getStrengthCard(hand1[index]);
        const card2 = getStrengthCard(hand2[index]);
        if (card1 !== card2) {
            return card1 > card2
        }
    }
    return false
}

function getStrengthCard(card: string): number {
    const isBroadway = isNaN(Number(card))
    if (!isBroadway) {
        return Number(card)
    }
    let broadwayValue = 10
    switch (card) {
        case broadwayCard.A:
            broadwayValue = 14
            break;
        case broadwayCard.K:
            broadwayValue = 13
            break;
        case broadwayCard.Q:
            broadwayValue = 12
            break;
        case broadwayCard.J:
            // Part 1
            // broadwayValue = 11
            // Part 2
            broadwayValue = 0
            break;
        case broadwayCard.T:
            broadwayValue = 10
            break;
    
        default:
            console.log("ERRRROR")
            break;
    }
    return broadwayValue
}

function calculateTotalWinnings(orderedHands: string[]): number {
    let totalAmount = 0
    for (let index = 0; index < orderedHands.length; index++) {
        const hand = orderedHands[index];
        const bid = hand.match(/^.{5} ([0-9]*)/)?.[1] ?? 0
        totalAmount += (Number(bid) * (index + 1))
    }
    return totalAmount
}