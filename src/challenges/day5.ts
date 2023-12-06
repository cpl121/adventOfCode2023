import { readFileSync } from "fs";

const SEED_REGEX: RegExp = RegExp('seeds\:((?: [0-9]+)+)', 'g')
const SOIL_REGEX: RegExp = RegExp('seed-to-soil map\:\n((?:[0-9]+( |\n|$))+)', 'g')
const FERTILIZER_REGEX: RegExp = RegExp('soil-to-fertilizer map\:\n((?:[0-9]+( |\n|$))+)', 'g')
const WATER_REGEX: RegExp = RegExp('fertilizer-to-water map\:\n((?:[0-9]+( |\n|$))+)', 'g')
const LIGHT_REGEX: RegExp = RegExp('water-to-light map\:\n((?:[0-9]+( |\n|$))+)', 'g')
const TEMPERATURE_REGEX: RegExp = RegExp('light-to-temperature map\:\n((?:[0-9]+( |\n|$))+)', 'g')
const HUMIDITY_REGEX: RegExp = RegExp('temperature-to-humidity map\:\n((?:[0-9]+( |\n|$))+)', 'g')
const LOCATION_REGEX: RegExp = RegExp('humidity-to-location map\:\n((?:[0-9]+( |\n|$))+)', 'g')

enum steps {
    soil,
    fertilizer,
    water,
    light,
    temperature,
    humidity,
    location,
}

export function challenge5() {
    const DATA = readFileSync("src/temp/text5.txt", { encoding: 'utf8'})
    const seeds = [...DATA.matchAll(SEED_REGEX)][0][1].split(" ").filter(Boolean)
    const soil = [...DATA.matchAll(SOIL_REGEX)][0][1].split("\n").filter(Boolean)
    const fertilizer = [...DATA.matchAll(FERTILIZER_REGEX)][0][1].split("\n").filter(Boolean)
    const water = [...DATA.matchAll(WATER_REGEX)][0][1].split("\n").filter(Boolean)
    const light = [...DATA.matchAll(LIGHT_REGEX)][0][1].split("\n").filter(Boolean)
    const temperature = [...DATA.matchAll(TEMPERATURE_REGEX)][0][1].split("\n").filter(Boolean)
    const humidity = [...DATA.matchAll(HUMIDITY_REGEX)][0][1].split("\n").filter(Boolean)
    const location = [...DATA.matchAll(LOCATION_REGEX)][0][1].split("\n").filter(Boolean)
    const stepsLength = Object.values(steps).length / 2

    let minNumber: number = 0;
    // Part 1
    for (let index = 0; index < seeds.length; index++) {
        let seed = Number(seeds[index])
        for (let step = 0; step < stepsLength; step++) {
            switch (step) {
                case steps.soil:
                    seed = getNextSeedByStep(seed, soil)
                    break;
                case steps.fertilizer:
                    seed = getNextSeedByStep(seed, fertilizer)
                    break;
                case steps.water:
                    seed = getNextSeedByStep(seed, water)
                    break;
                case steps.light:
                    seed = getNextSeedByStep(seed, light)
                    break;
                case steps.temperature:
                    seed = getNextSeedByStep(seed, temperature)
                    break;
                case steps.humidity:
                    seed = getNextSeedByStep(seed, humidity)
                    break;
                case steps.location:
                    seed = getNextSeedByStep(seed, location)
                    break;
            
                default:
                    break;
            }
        }

        if (index === 0) {
            minNumber = seed
        } else if (minNumber > seed) {
            minNumber = seed
        }
    }
    console.log("minNumber", minNumber);

    // Part 2
    const [seedsLine, ...lines] = DATA.trim().split("\n\n");
    const seedsInput: number[] = seedsLine
        .trim()
        .split("seeds:")[1]
        .trim()
        .split(" ")
        .map(Number);
     

    const maps: [ number, number, number ][][] = lines.map(
    (part: string) =>
        part
        .trim()
        .split("\n")
        .map((line) => line.trim().split(" ").map(Number)) as [
        number,
        number,
        number,
        ][],
    );    
    
    const seeds_2: [number, number][] = seedsInput
        .map((seed, i) => (i % 2 === 0 ? [seed, seed + seedsInput[i + 1] - 1] : null))
        .filter(Boolean) as [number, number][];
    
    let parts: number[][] = seeds_2.map(([from, to]) => [from, to]);
    console.log("init parts", parts);

    for (const ranges of maps) {
        const newParts = [];
        for (const part of parts) {
            let [start, end] = part;

            while (start <= end) {
            const range = ranges.find(
                (range) => start >= range[1] && start <= range[1] + range[2] - 1,
            );
            if (range) {
                const rangeEnd = Math.min(end, range[1] + range[2] - 1);
                newParts.push([
                start + range[0] - range[1],
                rangeEnd + range[0] - range[1],
                ]);
                start = rangeEnd + 1;
            } else {
                start++;
            }
            }
        }

        parts = newParts;
    }

    const minNumber_2: number = Math.min(...parts.map((part) => part[0]));
    console.log("minNumber_2", minNumber_2);
}

function getNextSeedByStep(seed: number, stepInfo: string[]): number {
    let result = seed
    for (let index = 0; index < stepInfo.length; index++) {
        const info = stepInfo[index].split(" ").filter(Boolean)
        const DESTINATION_RANGE = Number(info[0])
        const SOURCE_RANGE = Number(info[1])
        const LENGTH_RANGE = Number(info[2])
        
        const isInRange = seed >= SOURCE_RANGE && seed <= SOURCE_RANGE + LENGTH_RANGE
       
        if (isInRange) {
            result = DESTINATION_RANGE - SOURCE_RANGE + seed
            break
        }
    }    
    return result
}