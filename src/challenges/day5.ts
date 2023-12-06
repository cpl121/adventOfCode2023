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