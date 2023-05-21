import {Continent} from "@/data/dto/Continent";

export class LocalStorageService {
    static saveCountry = (name: string, data: Continent) => {
        localStorage.setItem(name, JSON.stringify(data))
    }

    static deleteCountry = (name: string) => {
        localStorage.removeItem(name)
    }

    static getItems = (): string[] => {
        let keys: string[] = []
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            if (key) {
                keys = keys.concat(key)

            }
        }
        return keys;
    }

    static getContinent = (key: string): Continent | null => {
        const countryString = localStorage.getItem(key)
        if (countryString) {
            return JSON.parse(countryString);
        }
        return null
    }

    static getContinents = (): Continent[] => {
        const keys = this.getItems()
        console.log('keys', keys)
        let userContinents: Continent[] = []

        for (const key of keys) {
            console.log(key)
            const continent = this.getContinent(key)
            console.log(continent)
            if (continent) {
                userContinents.push(continent)
            }
            console.log('userContinents', userContinents)
        }

        return userContinents;
    }
}
