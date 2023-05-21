import {Continent} from "@/data/dto/Continent";

interface Props {
    country: string,
    continent: string,
    languages: string[]
}

export const mapFormToContinent = ({country, continent, languages}: Props): Continent => {
    return {
        name: continent,
        countries: [{
            name: country,
            languages:
                languages.map(language => {
                    return {name: language}
                })


        }
        ],
    }
}