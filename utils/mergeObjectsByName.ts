import {Continent} from "@/data/dto/Continent";

export function mergeObjectsByName(arr: Continent[]): Continent[] {
    return arr.reduce((acc: Continent[], obj) => {
        // Проверяем, есть ли уже объект с таким именем в аккумуляторе
        const existingObj = acc.find(item => item.name === obj.name);
        if (existingObj) {
            // Если есть, объединяем страны
            obj.countries!.forEach(country => {
                const existingCountry = existingObj.countries!.find(item => item.name === country.name);
                if (existingCountry) {
                    // Если страна уже существует, объединяем языки
                    // @ts-ignore
                    existingCountry.languages = [...new Set([...existingCountry!.languages!, ...country!.languages!])];
                } else {
                    // Если страны нет, добавляем ее
                    existingObj.countries!.push(country);
                }
            });
        } else {
            // Если объекта с таким именем нет, добавляем его в аккумулятор
            acc.push(obj);
        }
        return acc;
    }, []);
}