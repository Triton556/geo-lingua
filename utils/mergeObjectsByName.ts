import {Continent} from "@/data/dto/Continent";
import {Language} from "@/data/dto/Language";

export function mergeObjectsByName(arr: Continent[]): Continent[] {
    return arr.reduce((acc: Continent[], obj) => {
        const existingObj = acc.find(item => item.name === obj.name);
        if (existingObj) {
            obj.countries!.forEach(country => {
                const existingCountry = existingObj.countries!.find(item => item.name === country.name);
                if (existingCountry) {
                    existingCountry.languages = mergeLanguages([...existingCountry.languages!, ...country.languages!]);
                } else {
                    existingObj.countries!.push(country);
                }
            });
        } else {
            acc.push(obj);
        }
        return acc;
    }, []);
}

function mergeLanguages(languages: Language[]): Language[] {
    const unique = {};
    languages.forEach(language => {
        //@ts-ignore
        unique[language.name] = language;
    });
    return Object.values(unique);
}